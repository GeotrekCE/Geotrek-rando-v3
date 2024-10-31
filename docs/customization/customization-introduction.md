# Customization

You can override default settings, colors, CSS, HTML and translations in your own `customization` folder.

See the [general presentation](../presentation-fr.md) (french) for an overview of the application.

After each customization changes, you'll have to restart the Docker container by running `docker-compose restart`.


## Main sections

[**Introduction to customization**](./customization-introduction.md)

General introduction with instructions to restart the Docker container after each customization change.

[**Customization of settings**](./customization-settings.md)

Detailed explanations for configuration files (`global.json`, `header.json`, `home.json`, etc.) with examples of overriding default values.

[**Themes and styles**](./customization-themestyles.md)

Detailed instructions on modifying colors, CSS, and menu structure, including specific classes (`custo-*`).

[**Icons customization**](./customization-icons.md)

Detailed instructions on modifying icons.

[**Translation customization**](./customization-translation.md)

Explanation of translation files, overriding texts, and managing languages.

[**HTML pages and scripts customization**](./customization-htmlscripts.md)

Detailed instructions on using HTML templates and custom scripts.

[**GDPR**](./customization-gdpr.md)

Specific documentation on setting up Google Analytics, including alerts and data privacy management.

[**Media and manifest.json management**](./customization-mediamanagement.md)

Explanation on managing images, favicons, splash screens, and configuring the `manifest.json` file.

## Apply changes

After each customization changes, you'll have to restart the Docker container by running `docker-compose restart`.

## Production

To set environnement variables such as Sentry configuration, build and run the application see the [Installation documentation](../installation.md).
