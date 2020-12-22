# Install on your own machine

## Install docker

You need to have docker installed on your own machine

[docker documentation for installation is right here](https://docs.docker.com/engine/install/)
[you will need to follow the post install process as well to be able to download the geotrek container](https://docs.docker.com/engine/install/linux-postinstall/)

## Pull the container

Reach the [geotrek container registry](https://github.com/orgs/GeotrekCE/packages/container/package/geotrek-rando-v3%2Fgeotrek-rando)

Select your version and run

```bash
docker pull ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION}
```

## Run the container

Then you can run the container on your machine by running

```bash
docker run -d -p {YOUR PORT}:80 ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION}
```

You can then serve what comes out of your local {YOUR PORT} port

## An example with nginx

Create a new site in your sites-available folder (in /etc/nginx)
Here would be its minimal configuration:

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

Feel free to add server_name and https configuration at will

Make sure to enable it by creating a symbolic link from sites-enabled to it

Open up your web ports thanks to ufw for instance

```bash
sudo ufw allow https comment 'Open all to access Nginx port 443'
sudo ufw allow http comment 'Open access Nginx port 80'
sudo ufw allow ssh comment 'Open access OpenSSH port 22'
sudo ufw enable
```

Now you should be able to reach your Geotrek Rando through the default web port of your virtual machine.
