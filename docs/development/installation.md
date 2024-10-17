# Installation

This section explains how to set up the project for development purposes.

## Prerequisites

Before starting the installation, ensure the following:

- **Node.js**: You need to have **Node.js** version **20** or higher installed.
- **NVM (Node Version Manager)**: It's recommended to use `nvm` to manage your Node.js versions.

To ensure you're using the correct Node version, run:

```bash
nvm use
```

If you don't have `nvm` installed, you can find the installation instructions [here](https://github.com/nvm-sh/nvm).

### Install Yarn

To manage project dependencies, install Yarn globally if you haven't already:

```bash
npm install -g yarn
```

You can verify the installation by running:

```bash
yarn --version
```

## Installing dependencies

Navigate to the `frontend` folder in your project directory:

```bash
cd frontend
```

Then, install all the required dependencies by running:

```bash
yarn
```

This will install all packages listed in the `package.json` file necessary for the frontend development.

## Starting the application

Once the dependencies are installed, you can start the development server by running:

```bash
yarn dev
```

This command will start the application in development mode, typically accessible at [http://localhost:3000](http://localhost:3000).

## Customization

To apply the custom settings and media files for your local development environment, follow these steps:

1. **Customization Settings**:
   - Copy the `customization` folder from an existing Geotrek-rando repository.
   - Paste it into the following directory in your project:  
     `Geotrek-rando-v3/frontend/customization`

2. **Media Files**:
   - Copy the `medias` folder from an existing Geotrek-rando repository.
   - Paste it into this directory in your project:  
     `Geotrek-rando-v3/frontend/src/public/medias`

These folders contain custom configurations and media assets necessary for your local environment to match the production setup.

