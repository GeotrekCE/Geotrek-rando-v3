# Development

Installation in development:

## Prerequisite

- You need to use a node version equal or above 20
- Use nvm and then:

```bash
nvm use
```

Install yarn

```bash
npm install -g yarn
```

## Install dependencies

Head to the `frontend` folder and run:

```bash
yarn
```

## Start the app

Once your dependencies are installed, start your server in development mode by running:

```bash
yarn dev
```

## Contributing documentation

To launch the readthedocs documentation in your local environment, run the following commands in the project root directory:

- `pip3 install mkdocs`
- `python3 -m mkdocs serve`

You can also edit documentation files directly in Github.

## Customization

To get the proper settings of the Geotrek-rando site in your local environnement :

- Copy/cut the `customization` folder from a Geotrek-rando repository in Geotrek-rando-v3/frontend/customization
- Copy/cut the `medias` folder from a rando Geotrek-repository in Geotrek-rando-v3/frontend/src/public/medias
