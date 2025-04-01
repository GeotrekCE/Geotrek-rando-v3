# Customization

You can override default settings, colors, CSS, HTML and translations in your own `customization` folder.

See the [general presentation](../presentation-fr.md) (french) for an overview of the application.

## Main sections

<div class="grid cards" markdown>

-   :material-brush-outline:{ .lg .middle } __Introduction__

    ---

    Server files overview and instructions to restart the Docker container after each customization change.

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

## Server files overview

The customization of the Rando application is done through the `customization` folder located on the server. This folder includes four main subdirectories:

- `config`  
- `html`  
- `theme`  
- `translations`  

### `config`

The `config` folder allows you to **override the default configuration files** of the Rando application.

Each `.json` file targets a specific part of the application:

- `global.json` : defines global settings such as:
    - the application name
    - portals to display (to filter content by portal)
    - activation of specific modules (e.g. sensitive areas, outdoor module, etc.)
    - default images to display when no image is defined for an object

    🔍 **Tip**: images, pictograms, and videos used should be stored in the `media` folder.

- `header.json` : configures the header of the Geotrek-rando interface, including the logo, available languages and default language.
- `home.json` : configures the homepage content, including highlighted or suggested items.
- `details.json` : controls the display of sections on detail pages (like trek, touristic content, or outdoor sites), allowing you to define their name, visibility, anchor link presence, and display order.
- `footer.json` : defines the content of the website footer, including social media links, organizational contact details, and custom links or flatpages.
- `filter.json` : configures which filters are displayed in the search interface, their order, and labels.
- `map.json` : configures the basemaps, map center, zoom levels, and available map layers (classic, satellite, offline) for the Geotrek-rando interface.
- `resultCard.json` : customizes the content displayed on trek result cards, allowing you to show or hide elements like location, themes, and selected informational keywords such as difficulty, duration, or distance.
- `redirect.json` : defines URL redirection rules, allowing you to forward old or outdated URLs to new ones, with support for wildcards, variables, and permanent or temporary redirects.

👉 Find details about files and settings to update on the [Settings section](./customization-settings.md)

### `html`

This folder contains **custom HTML templates** that can be used to add specific elements not handled by the default configuration.

Examples:

- add a custom activity bar
- integrate personalized blocks (clickable maps, interactive content, etc.)

Useful details:

- `scriptHeader.html`: contains the tracking code if Matomo analytics is enabled.
- `details/`: contains HTML templates for widgets displayed in the detail pages (e.g. air quality via Atmos, weather block, etc.)

👉 Find details about HTML templates and scripts on the [HTML and scripts section](./customization-htmlscripts.md)

### `theme`

This folder contains the site's **visual customization** files:

- `colors.json`: defines or overrides **default color variables** used in the interface.
- `custom.css`: allows you to override or adjust the **site’s CSS styles** (e.g. title size/color, logo placement, etc.)

👉 Find details about colors and CSS on the [Theme and styles section](./customization-themestyles.md)

### `translations`

This folder allows you to **override the default translations** used in the interface.

You can:

- rename interface elements (e.g. filter names, section titles, etc.)
- provide custom translations for other languages (e.g. `en.json`, `es.json`, `it.json`, etc.)

👉 Find details about customizing translations on the [Translation section](./customization-translation.md)

## Apply changes

After each customization changes, you'll have to restart the Docker container by running : `docker compose restart`.

## Production

To set environnement variables such as Sentry configuration, build and run the application see the [Installation documentation](../installation.md).
