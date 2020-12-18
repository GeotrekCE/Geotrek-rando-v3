# Deployment

## Prerequisite

You need to have docker installed
You need to have access to the GeotrekCE organization

## Build the container

In order to build the container, use docker

```bash
cd frontend
docker build -t ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION} .
```

## Deploy to the geotrek registry

First you'll need to have a github personal access token with access permission to create packages.
Then push your container

```bash
docker push ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION}
```
