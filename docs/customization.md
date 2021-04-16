# Customization

You can override default settings, colors, CSS, HTML and translations in `customization` folder.

## Settings

Default configuration are defined in files from https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/config folder.
You can override all settings default values in files from `customization/config/` folder.

- `global.json` to define :

  - `searchResultsPageSize`, `mapResultsPageSize`: used to limit the sizes of results per page when fetching API
  - `maxPoiPerPage`: max number of point of interest (POI) displayed on a single trek page
  - `maxTouristicContentPerPage`: max number of touristic contents displayed on a single trek page
  - `portalIds`: eventual portal filters (list of ids).
  - `enableSensitiveAreas`: boolean, default to false. Set it to true if sensitive areas are defined in your Geotrek Admin.
  - `apiUrl` : Geotrek Admin API URL.
  - `googleAnalyticsId`: eventual Google Analytics Id.
  - `baseUrl`: base URL of your portal (for dynamic sitemap.xml).
  - `fallbackImageUri`: this uri is used to generate a default image for a trek or a touristic content if none is defined.
  - `touristicContentLabelImageUri` : this uri is used to define the logo on the labeled toursitic contents :
    ![Activity Icon on filter list](assets/labeledTouristicContentExample.png)
  - `applicationName`: application name appearing on PWA

- `header.json` to define logo URL, default and available languages, number items to flatpages to display in navbar (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/header.json)

- `home.json` to define homepage settings. You can define blocks to display and trek suggestion block wih trek ID to highlight on homepage (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/home.json).

  - In WelcomeBanner, you can personnalize the header on the homepage. You can add an asset on the top of the page: it can either be a video, a picture or a carousel of images:

    - videoUrl: to add a video
    - carouselUrls: to add a carousel of images. You have to add an array of urls
    - pictureUrl: to add a single image

    Only one type of asset can be displayed. If you add several field (videoUrl and picture Url for example), we will pick one, following this order of priority: video over carousel over picture.

    You can also enable a text to be displayed on the top of this asset:

    - shouldDisplayText: true to display the text on above the asset, false to hide it.

- `footer.json` to define social networks and links (based on translation labels) in footer (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/footer.json)
- `filter.json` to define filters to display, their order and values (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/filter.json)
- `map.json` to define basemap URL and attribution, center and default zoom (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/map.json).

  - You can also update the map background. There are two map backgrounds available:

    - `mapClassicLayerUrl` for the map version ;
    - `mapSatelliteLayerUrl` for the satellite version. It is optional, so if you want to have only one available map background, you can add `mapSatelliteLayerUrl: undefined`. This will remove the button which allows the user to switch between two map backgrounds.

_Warning:_
When setting up Google Analytics, you have to setup a flow. When setting up the flow, be careful to enter the corresponding url (the url of your website), otherwise the data will not be received.
By default Google analytics is disabled (googleAnalyticsId set to null) you will have to override it in the global.json file of your customization folder.

## Colors

You can override colors in `customization/theme/colors.json` file to change the main colors, based on https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/tailwind.config.js default theme.

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

You can also override CSS in `customization/theme/style.css` file. To help overriding CSS, some ID have been added on main components:

HOME

- header
- header_logo
- footer
- cover_image
- activities_bar
- home_card

SEARCH

- filter_bar
- result_card
- search_map

FLATPAGE

- flatpage_cover
- flatpage_content

## Translations

You can override every texts in translations files, based on default ones (https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/src/translations).

You should at least override `home.title`, `home.description` and `home.welcome-text`.

## HTML

You can include some HTML parts in the first and last sections of the homepage, with files:

- `customization/homeTop.html`
- `customization/homeBottom.html`

See HTML examples at https://github.com/GeotrekCE/Geotrek-rando-v3-docker/tree/main/examples.

## Apply changes

After each customization changes, you'll have to rebuild the Docker image by running:

```bash
docker build -t geotrek-rando --build-arg VERSION={YOUR_VERSION} .
docker ps ## To find previous container ID to stop
docker stop {CONTAINER_ID}
docker run --restart unless-stopped -d -p {YOUR_PORT}:80 geotrek-rando
```

Make sure to remove older images, otherwise your server will keep all build and enlarge fast.
