# Customization

You can override default settings, colors, CSS, HTML and translations in your own `customization` folder.

See the [general presentation](../presentation-fr.md) (french) for an overview of the application.

After each customization changes, you'll have to restart the Docker container by running `docker-compose restart`.


## Main sections

<div class="grid cards" markdown>

-   :material-brush-outline:{ .lg .middle } __Introduction__

    ---

    General introduction with instructions to restart the Docker container after each customization change.

    [:octicons-arrow-right-24: Getting started](./customization-introduction.md)

-   :material-palette-swatch:{ .lg .middle } __Customization of settings__

    ---

    Detailed explanations for configuration files (`global.json`, `header.json`, `home.json`, etc.) with examples of overriding default values.

    [:octicons-arrow-right-24: Customization of settings](./customization-settings.md)

-   :material-palette-outline:{ .lg .middle } __Themes and styles__

    ---

    Detailed instructions on modifying colors, CSS, and menu structure, including specific classes (`custo-*`).

    [:octicons-arrow-right-24: Themes and styles](./customization-themestyles.md)

-   :material-walk:{ .lg .middle } __Icons__

    ---

    Detailed instructions on modifying icons.

    [:octicons-arrow-right-24: Icons](./customization-icons.md)

-   :material-web:{ .lg .middle } __Translation__

    ---

    Explanation of translation files, overriding texts, and managing languages.

    [:octicons-arrow-right-24: Translation](./customization-translation.md)

-   :material-file-code-outline:{ .lg .middle } __HTML pages and scripts__

    ---

    Detailed instructions on using HTML templates and custom scripts.

    [:octicons-arrow-right-24: HTML pages and scripts](./customization-htmlscripts.md)

-   :material-google-analytics:{ .lg .middle } __GDPR__

    ---

    Specific documentation on setting up Google Analytics, including alerts and data privacy management.

    [:octicons-arrow-right-24: GDPR](./customization-gdpr.md)

-   :material-image:{ .lg .middle } __Media and manifest management__

    ---

    Explanation on managing images, favicons, splash screens, and configuring the `manifest.json` file.

    [:octicons-arrow-right-24: Media and manifest management](./customization-mediamanagement.md)

</div>

## Apply changes

After each customization changes, you'll have to restart the Docker container by running `docker-compose restart`.

## Production

To set environnement variables such as Sentry configuration, build and run the application see the [Installation documentation](../installation.md).
