# Installation

Install Geotrek-rando on your own computer or server.

## Environnements variables

Whichever installation you choose below, you can set some environment variables related to your project.  
If you follow the [Install with Docker (recommended)](#install-with-docker-recommended) section you can create the optional `.env` file based on the example (`cp .env.example .env`),
If you follow the [Install without Docker (not recommended)](#install-without-docker-not-recommended) section you can modify `.env.production` file.

### Sentry

To report application crashes and any errors encountered by users, you can use [Sentry](https://sentry.io/).
In the Sentry backoffice, create your project and copy the DSN key which you can paste into the `SENTRY_DSN` environment variable.

## Install with Docker (recommended)

### Global process

Before starting the technical installation, here is an overview of the global process:

- Developers are working on code source of this repository where you will also find the documentation, issues and releases
- Once they have a new version of the application ready, they will release it, build a Docker image of this new version and push it in the [packages repository](https://github.com/orgs/GeotrekCE/packages/container/package/geotrek-rando-v3%2Fgeotrek-rando)
- If required, they will also make changes to the docker-compose file and customization template in the [installer dedicated repository](https://github.com/GeotrekCE/Geotrek-rando-v3-installer) and release a new version of it
- Administrators will log in on their host with SSH and install Docker and Docker Compose on it
- They will download an archive of the latest version of the Installer repository and extract it on their host
- They will edit the customization files
- They will download the Docker image, run the Docker container with Docker Compose and make it available with a web browser through NGINX

### Install Docker

You need to have Docker and Docker Compose installed on your own computer or server. Docker allows to easily install and update Geotrek-rando on several plateforms (Linux, Windows, macOS).

- Docker installation documentation is [right here](https://docs.docker.com/engine/install/).
- You will also need to follow the [post install process](https://docs.docker.com/engine/install/linux-postinstall/) as well to be able to download the Geotrek-rando container with your non-root Linux user.

### Install Geotrek-rando

You will have to download the Installer of Geotrek-rando and its customization folder template to run the Docker container of Geotrek-rando on your own computer or server.

- Create a folder to install your Geotrek-rando (`/home/myuser/geotrekrando` for instance) and go in this folder
- On your server, download the [Geotrek-rando-installer repository](https://github.com/GeotrekCE/Geotrek-rando-v3-installer) version you want: `wget https://github.com/GeotrekCE/Geotrek-rando-v3-installer/archive/vX.Y.Z.zip` (replace `X.Y.Z` with the version of Geotrek-rando-v3-installer that is compatible with the Geotrek-rando-v3 version you want to use) and unzip it. You can also git clone it (`git pull https://github.com/GeotrekCE/Geotrek-rando-v3-installer.git`)
- Update the files in the `/customization` folder according to your structure (See [customization documentation](./customization/customization-settings.md))
- Go in the root folder of your Geotrek-rando-v3-installer and run the Docker container with launching `docker-compose up -d`
- Your Geotrek-rando is now available at the address of your server on 8080 port (e.g. http://myserver:8080)

You can now serve what comes out of the default 8080 port. To configure NGINX, see below.

If you want to have logs directly in terminal you can just run `docker-compose up`. `ctrl`+`c` will exit the command and stop the container. That's why `docker-compose up -d` is used in production to run the service in the background.

You can also access Node.js server logs with `docker-compose logs -t`.

After updating customization, you just have to run `docker-compose restart` to apply changes.

You can also create the optional `.env` file based on the example (`cp .env.example .env`), if you want to change the Docker image URL (or run a specific version different from the latest one), the running port, or the `customization` and `medias` folders path. Run `docker-compose down && docker-compose up -d` to apply changes to `.env` file.

If you want to run several Geotrek-rando on the same server, just download one Geotrek-rando-v3-installer for each portal with their own customization and set a different port for each. You should name each Geotrek-rando project with a different container name with adding `COMPOSE_PROJECT_NAME=name_of_geotrek_rando_project` variable in `.env` file. Otherwise the command `docker-compose down && docker-compose up -d` will overwrite the previous container.

### An example with NGINX

- Create a new site configuration in your `sites-available` folder (in `/etc/nginx`), `geotrekrando.conf` in this example
- Here is its minimal configuration:

```bash
server {
   location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
   }
    listen 80;
    listen [::]:80;
    server_name {mydomain.fr};
}
```

Update `{mydomain.fr}` depending on your context. Update the 8080 port if you changed it in the `.env` file.

Make sure to enable it by creating a symbolic link from `sites-enabled` to it with:

```bash
ln -s /etc/nginx/sites-available/geotrekrando.conf /etc/nginx/sites-enabled/
sudo service nginx reload
```

Feel free to add https configuration at will. It is required for the PWA mobile version.

Example with Certbot:

```bash
## Install Certbot for NGINX
sudo apt install certbot
sudo apt install python3-certbot-nginx

## Launch Cerbot command to install the certificate and follow instructions
sudo certbot --nginx
```

### Upgrade Geotrek-rando version

To find out the current Geotrek-rando version of your running container, you can execute (by renaming `rando-nodeserver-1` with the name of your container):

```
docker exec -t -i rando-nodeserver-1 node -p "require('./package.json').version"
```

To install a new version of Geotrek-rando, you have to pull the new image of Geotrek-rando, stop and remove the old container and run a new one with the new image:

```sh
docker-compose pull && docker-compose down && docker-compose up -d
```

It will download and install the latest version of Geotrek-rando. If you want to install a specific version of Geotrek-rando, you can specify it in your `.env` file, instead of `latest`.

#### Manage Docker images storage on disk

The old images will stay on your system and use disk storage.

To remove images without container associated, you can run `docker image prune -a`.
You can also run `docker container prune` to remove all stopped containers. Run `docker ps -a` to list all containers on your system.

Use case: after several images built on my server to update and customize my Geotrek-rando, my `/var/lib/docker/vfs` folder had a size of 81 Go! Identified with `sudo du -sh /var/lib/docker/vfs` command. After running `docker container prune` its size was reduced to 14 Go. And after running `docker image prune -a` its size was 7 Go.

See https://docs.docker.com/config/pruning/ for more details about cleaning unused Dockers objects.

Another method: If you notice a unexpectedly large amount of images remaining on your system when asking Docker for images with the command `docker images -a` (showing all the otherwise hidden intermediate images), you can start from a clean slate and delete all the existing docker images on your system by running:
`docker rmi $(docker images -a -q) -f`.
Docker supports subqueries like this one, let's understand it step by step:

- `docker rmi` is the command to delete an image
- `$()` defines the subquery
  - `docker images` list images
  - `-a` (all) specifies that you want to see all of them even the intermediate ones
  - `-q` (quiet) specifies that you only need to get the images IDs
- `-f` (force) means you want to bypass docker security preventing you to delete used images

## Install without Docker (not recommended)

If you can't install Docker for some reason, there is also a way to directly deploy the node server to your machines.

Install nodejs:

```sh
sudo apt update
sudo apt -y upgrade
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt -y install nodejs
```

Then, you will have to pull the source code from the Geotrek-rando repository by running

```sh
git clone https://github.com/GeotrekCE/Geotrek-rando-v3.git
```

Then you can head to the frontend folder

```sh
cd Geotrek-rando-v3/frontend/
```

Install dependencies

```sh
yarn
```

Build the server

```sh
yarn build
```

And start it

```sh
yarn start
```

By default, the server will be served on the port 80, you should set the port you want to serve your server to by specifying the "PORT" environment variable before running the starting command

```sh
PORT=82 && yarn start
```

### Process manager

If you installed Geotrek-rando without Docker and in order to have a more robust solution to serve your node server, our advice is to use [pm2](https://pm2.keymetrics.io/).

Here is a quick guide on how to use pm2 with an Ubuntu distribution (Make sure you've installed nodejs and built the project following the previous step)

```sh
sudo npm install -g pm2
```

```sh
PORT=3000 pm2 start yarn --name geotrek-rando -- start
```

Here we specify that the port we want to run our server on is the 3000, that the starting command is `yarn start` and the name of our process should be `geotrek-rando`.

You can see all your processes and their status by running:

```sh
pm2 status
```

To stop your process:

```sh
pm2 stop geotrek-rando
```

To start your process:

```sh
pm2 start geotrek-rando
```

You will also be able to see the application logs by running:

```sh
pm2 logs geotrek-rando
```
