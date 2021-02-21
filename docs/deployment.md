# Deployment

We will be using two remote development environments.

## Staging environment

On this environment, we don't use Docker and deploy directly to Vercel in order to ease the development experience during the development phase.

### Prerequisite

You need to add a remote to your git repository:

```bash
git remote add vercel git@github.com:Weegle99/Geotrek-rando-v3.git
```

We performed a fork of Geotrek-rando on a personal account to benefit from Vercel free tier.

### Deploy

The staging deployment is automated upon pushing on the Vercel remote. Therefore you can deploy the current available version on the main branch by:

- Pulling the latest ``main`` branch from ``origin``:

```bash
git checkout main && git pull origin main
```

- Pushing it to the Vercel remote:

```bash
git push vercel main
```

## Preproduction environment

On this environment, we deploy the PWA as a regular Geotrek-rando administrator would.

### Prerequisite

You need to have Docker installed.

You need to have access to the ``GeotrekCE`` organization

You need to have permissions on the packages -> go to [this url](https://github.com/orgs/GeotrekCE/packages/container/geotrek-rando-v3%2Fgeotrek-rando/settings)

### Build the container

In order to build the container, use Docker:

```bash
cd frontend
docker build -t ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION} .
```

### Deploy to the Geotrek registry

First you'll need to have a Github personal access token with access permission to create packages.

Then push your container:

```bash
docker push ghcr.io/geotrekce/geotrek-rando-v3/geotrek-rando:{YOUR VERSION}
```

### Pull the container from the preproduction machine an run it

Follow the steps described in [the install on your own machine documentation](./installation.md)
