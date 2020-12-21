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

You can then server what comes out of your local {YOUR PORT} port
