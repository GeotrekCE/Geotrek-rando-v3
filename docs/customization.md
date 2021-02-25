# Customization

You can override default settings, colors, CSS, HTML and translations in ``customization`` folder.

## Settings

Default configuration are defined in files from https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/config folder.
You can override all settings default values in files from ``customization/config/`` folder.

- ``apiCalls.json`` to define API URL, and eventual portal filter (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/apiCalls.json)
- ``header.json`` to define logo URL, default and available languages, number items to flatpages to display in navbar (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/header.json)
- ``home.json`` to define homepage settings such as main image URL, blocks to display and trek suggestion block wih trek ID to highlight on homepage (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/homePage.json)
- ``footer.json`` to define social networks and links (based on translation labels) in footer (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/footer.json)
- ``filter.json`` to define filters to display, their order and values (https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/filterConfig.json)
- ``map.json`` to define basemap URL and attribution, center and default zoom (https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/map.json)

## Colors

You can override colors in ``customization/theme/colors.json`` file to change the main colors, based on https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/tailwind.config.js default theme.

Example for Cevennes national park orange colors:

```json
{
  "primary1": {
    "DEFAULT": "#ff9100",
    "light": "#ffa032"
  },
  "primary3": "#d57b04"
}
```

## Translations

You can override every texts in translations files, based on default ones (https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/src/translations).

You should at least override ``home.title``, ``home.description`` and ``home.welcome-text``.

## HTML

You can include some HTML parts in the first and last sections of the homepage, with files:

- ``customization/homeTop.html``
- ``customization/homeBottom.html``

## Apply changes

After each customization changes, you'll have to rebuild the Docker image by running:

```bash
docker build -t geotrek-rando --build-args VERSION={THE VERSION YOU WANT} .
docker ps ## To find previous container ID to stop
docker stop {CONTAINER_ID}
docker run -d -p {YOUR_PORT}:80 geotrek-rando
```
