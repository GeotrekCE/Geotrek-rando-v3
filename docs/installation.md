# Installation

Install Geotrek-rando on your own computer or server.

## Install Docker

You need to have Docker installed on your own computer or server. Docker allows to easily install and update Geotrek-rando on several plateforms (Linux, Windows, macOS).

- Docker installation documentation is [right here](https://docs.docker.com/engine/install/).
- You will also need to follow the [post install process](https://docs.docker.com/engine/install/linux-postinstall/) as well to be able to download the Geotrek-rando container with your non-root Linux user.

## Install Geotrek-rando latest version

- Create a folder to install your Geotrek (``/home/myuser/geotrekrando`` for instance) and go in this folder
- On your server pull the Geotrek-rando-docker repository : ``git pull https://github.com/Weegle99/geotrek-customization.git`` or download and unzip it (``wget https://github.com/GeotrekCE/Geotrek-rando-v3/archive/main.zip``)
- Update the files in the customization folder according to your structure (See customization documentation section)
- Build the docker image : ``docker build -t geotrek-rando .``
- Run the docker image on the port you want : ``run -d -p {YOUR_PORT}:80 geotrek-rando``
- Your website is now available to the adress of your server

To configure NGINX, see below.

## Update Geotrek-rando version or configuration

After updating configuration or to install a new version of Geotrek-rando, you have to rebuild a new image of Geotrek-rando, stop the old one and run the one.

- Build a new Geotrek-rando image : ``docker build -t geotrek-rando .``
- Check running images : ``docker ps``
- Stop the old container : ``docker stop <CONTAINER_ID>``
- Run the new image : ``run -d -p {YOUR_PORT}:80 geotrek-rando``

The old images will stay on your system and use disk storage. To remove images without container associated, you can run ``docker image prune -a``.

## Pull the container

To install a specific version:

Reach the [Geotrek-rando container registry](https://github.com/orgs/GeotrekCE/packages/container/package/geotrek-rando-v3%2Fgeotrek-rando).

Select your version and run:

```bash
docker pull ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION}
```

## Run the container

Then you can run the container on your machine by running:

```bash
docker run -d -p {YOUR PORT}:80 ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION}
```

You can then serve what comes out of your local {YOUR PORT} port

## An example with NGINX

- Create a new site in your ``sites-available`` folder (in ``/etc/nginx``)
- Here is its minimal configuration:

```bash
server {
   location / {
        proxy_pass http://localhost:{YOUR PORT};
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
}
```

Feel free to add server_name and https configuration at will.

Make sure to enable it by creating a symbolic link from ``sites-enabled`` to it

Open up your web ports thanks to ufw for instance

```bash
sudo ufw allow https comment 'Open all to access Nginx port 443'
sudo ufw allow http comment 'Open access Nginx port 80'
sudo ufw allow ssh comment 'Open access OpenSSH port 22'
sudo ufw enable
```

Now you should be able to reach your Geotrek-rando through the default web port of your virtual machine.
