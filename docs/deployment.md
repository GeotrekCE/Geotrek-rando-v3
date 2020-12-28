# Deployment

We will be using two remote environments

## Staging environment

On this environment, we don't use docker and edploy directly to Vercel in order to ease the development experience during the development phase.

### Prerequisite

You need to add a remote to your git repository:

```bash
git remote add vercel git@github.com:sraikimaxime/Geotrek-rando-v3.git
```

We performed a fork of geotrek rando on a personal account to benefit from vercel free tier

### Deploy

The staging deployment is automated upon pushing on the vercel remote. Therefore you can deploy the current available version on the main branch by

- Pulling the latest main branch from origin

```bash
git checkout main && git pull origin main
```

- Pushing it to the vercel remote

```bash
git push vercel main
```

## Preproduction environment

On this environment, we deploy the pwa as a regular geotrek-rando administrator would.

### Prerequisite

You need to have docker installed
You need to have access to the GeotrekCE organization

### Build the container

In order to build the container, use docker

```bash
cd frontend
docker build -t ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION} .
```

### Deploy to the geotrek registry

First you'll need to have a github personal access token with access permission to create packages.
Then push your container

```bash
docker push ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION}
```

### Pull the container from the preproduction machine an run it

Follow the steps described in [the install on your own machine documentation](./install-on-your-own-machin.md)
