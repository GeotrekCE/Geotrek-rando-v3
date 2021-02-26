# Installation

Install Geotrek-rando on your own computer or server.

## Install Docker

You need to have Docker installed on your own computer or server. Docker allows to easily install and update Geotrek-rando on several plateforms (Linux, Windows, macOS).

- Docker installation documentation is [right here](https://docs.docker.com/engine/install/).
- You will also need to follow the [post install process](https://docs.docker.com/engine/install/linux-postinstall/) as well to be able to download the Geotrek-rando container with your non-root Linux user.

## Install Geotrek-rando

You will have to download the prebuilt Docker image of Geotrek-rando and its customization folder template and build a customized image on your own computer or server.

- Create a folder to install your Geotrek-rando (``/home/myuser/geotrekrando`` for instance) and go in this folder
- On your server pull the [Geotrek-rando-docker repository](https://github.com/GeotrekCE/Geotrek-rando-v3-docker): ``git pull https://github.com/GeotrekCE/Geotrek-rando-v3-docker.git`` or download and unzip it (``wget https://github.com/GeotrekCE/Geotrek-rando-v3-docker/archive/main.zip``)
- Update the files in the ``/customization`` folder according to your structure (See customization documentation)
- Build the Docker image with its latest prebuilt version: ``docker build -t geotrek-rando .``
- You can also build a [specific version](https://github.com/orgs/GeotrekCE/packages/container/package/geotrek-rando-v3%2Fgeotrek-rando-prebuild) with ``docker build -t geotrek-rando --build-arg VERSION={THE VERSION YOU WANT} .``
- Run the docker image on the port you want: ``docker run -d -p {YOUR_PORT}:80 geotrek-rando``
- Your website is now available to the adress of your server

You can then serve what comes out of your local {YOUR PORT} port. To configure NGINX, see below.

## Update Geotrek-rando version or configuration

After updating configuration or to install a new version of Geotrek-rando, you have to rebuild a new image of Geotrek-rando, stop the old one and run the new one.

- Build a new Geotrek-rando image: ``docker build -t geotrek-rando .``
- Check running images: ``docker ps``
- Stop the old container: ``docker stop <CONTAINER_ID>``
- Run the new image: ``docker run -d -p {YOUR_PORT}:80 geotrek-rando``

The old images will stay on your system and use disk storage. To remove images without container associated, you can run ``docker image prune -a``.

## An example with NGINX

- Create a new site configuration in your ``sites-available`` folder (in ``/etc/nginx``), ``geotrekrando.conf`` in this example
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
    server_name {mydomain.fr};
}
```

Update ``{YOUR PORT}`` and ``{mydomain.fr}`` depending on your context.

Make sure to enable it by creating a symbolic link from ``sites-enabled`` to it with:

```bash
ln -s /etc/nginx/sites-available/geotrekrando.conf /etc/nginx/sites-enabled/
sudo service nginx reload
```

Feel free to add https configuration at will.

You can also open up your web ports thanks to ufw for instance

```bash
sudo ufw allow https comment 'Open all to access Nginx port 443'
sudo ufw allow http comment 'Open access Nginx port 80'
sudo ufw allow ssh comment 'Open access OpenSSH port 22'
sudo ufw enable
```

Now you should be able to reach your Geotrek-rando through the default web port of your virtual machine.
