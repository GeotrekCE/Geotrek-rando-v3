# Customization

You can override default settings, colors, CSS, HTML and translations in ``customization`` folder.

## Settings

- header.json (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/header.json)
- home.json (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/homePage.json for an example)
- footer.json (https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/footer.json)
- filter.json (https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/filterConfig.json)
- map.json (https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/map.json)

## Colors

See ``theme/colors.json`` to change the main colors.

## Translations

You can override every texts in translations files, based on default ones (https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/src/translations).

You should at least override ``home.title``, ``home.description`` and ``home.welcome-text``.

## HTML

You can include some HTML parts in the first and last sections of the home page, with files:

- customization/homeTop.html
- customization/homeBottom.html

## Apply changes

After each customization changes, you'll have to rebuild the Docker image by running:

```bash
add-right-command..
```
