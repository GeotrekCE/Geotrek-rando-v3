# Customization

You can override default settings, colors, CSS, HTML and translations in your own `customization` folder.

See the [general presentation](presentation-fr.md) for an overview of the application.

## Settings

Default configuration are defined in files from https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/config folder.
You can override all settings default values in files from your own `customization/config/` folder.

Examples of customizations are available in https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/customization/config folder.

In json files, you can just override the primary keys you need. You have to override primary keys globally.

- `global.json` (example in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/global.json) to define :

  - `searchResultsPageSize`, `mapResultsPageSize`: used to limit the sizes of results per page when fetching API
  - `maxPoiPerPage`: max number of point of interest (POI) displayed on a single trek page
  - `maxTouristicContentPerPage`: max number of touristic contents displayed on a single trek page
  - `portalIds`: eventual portal filters (list of ids).
  - `enableSensitiveAreas`: boolean, default to false. Set it to true if sensitive areas are defined in your Geotrek Admin.
  - `apiUrl` : Geotrek Admin API URL.
  - `googleAnalyticsId`: eventual Google Analytics Id.
  - `baseUrl`: base URL of your portal (for dynamic sitemap.xml).
  - `fallbackImageUri`: this uri is used to generate a default image for a trek or a touristic content if none is defined.
  - `touristicContentLabelImageUri` : this uri is used to define the logo of the labeled touristic contents:
    ![Activity Icon on filter list](assets/labeledTouristicContentExample.png)
  - `applicationName`: application name appearing on PWA

- `header.json` to define logo URL, default and available languages, number items to flatpages to display in navbar (see example in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/header.json)

- `home.json` to define homepage settings. You can define blocks to display and trek suggestion block with trek ID to highlight on homepage (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/home.json).

  - In `welcomeBanner`, you can personnalize the cover on the homepage. You can add an asset on the top of the page: it can either be a video, a single picture or a carousel of images:

    - `videoUrl`: to add a video
    - `carouselUrls`: to add a carousel of images. You have to add an array of urls
    - `pictureUrl`: to add a single image

    Only one type of asset can be displayed. If you add several fields (`videoUrl` and `pictureUrl` for example), we will pick one, following this order of priority: video over carousel over picture.

    You can also enable a text to be displayed on the top of this asset:

    - `shouldDisplayText`: `true` to display the text on above the asset, `false` to hide it.

- `footer.json` to define social networks and links (based on translation labels) in footer (see example in hhttps://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/footer.json)
- `filter.json` to define filters to display, their order and values (see example in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/filter.json). If you remove some of the filters ?
- `map.json` to define basemaps URL and attributions, center (y, x) and default zoom (see example in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/map.json).

  - You can also update the map layers. There are two map layers available:

    - `mapClassicLayerUrl` for the map version
    - `mapSatelliteLayerUrl` for the satellite version. It is optional, so if you want to have only one available map background, you can add `mapSatelliteLayerUrl: undefined`. This will remove the button which allows the user to switch between two map backgrounds.

_Warning:_
- When setting up Google Analytics, you have to setup a flow. When setting up the flow, be careful to enter the corresponding url (the url of your website), otherwise the data will not be received.
- By default Google analytics is disabled (`googleAnalyticsId` set to `null`), you will have to override it in the `global.json` file of your customization folder.

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

You can also override CSS in `customization/theme/style.css` file. To help overriding CSS, some ID have been added on main DIV components (header, logo, footer, cover, cards, results, maps, details...).

## Translations

You can override every texts in translations files, based on default ones (https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/src/translations).

You should at least override `home.title`, `home.description` and `home.welcome-text`.

## HTML

You can include some HTML parts in the first and last sections of the homepage, with files:

- `customization/html/homeTop.html`
- `customization/html/homeBottom.html`

See HTML examples in https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/customization/html.

Icons are provided by Geotrek-admin API. See [icons documentation](icons.md) to know how they have to be designed.

## Images, favicon, mobile phone icons and splashscreens

These files need to be in the correct folder during the build process and therefore, we created a specific `medias` folder in the customization repository.

It provides 6 default images that can be customized:

- android-icon.png: It has to be 144x144px and controls the icon appearing on Android phones
- maskable-icon.png: It hass to be 144x144px and will be used only on android phones enabling round icons (it will hence be cropped to fit a circle by the android phones)
- ios-icon.png: It has to be 144x144px and controls the icon appearing on iOS phones
- android-splashscreen.png: It has to be 512x512px and controls the splashscreen appearing on Android phones
- ios-splashscreen.png: It has to be 512x512px and controls the splashscreen appearing on iOS phones
- favicon.png: It will be used as the favicon in web browsers

You can also add images and other files in the `medias` folder to be used as logo, images in HTML parts and static pages. They will be available on "url-geotrek-rando/medias/image-name.jpg" and can be linked as "/medias/image-name.jpg".

## Apply changes

After each customization changes, you'll have to rebuild the customized Docker image by running:

```bash
docker build -t geotrek-rando --build-arg VERSION={YOUR_VERSION} .
docker ps ## To find previous container ID to stop
docker stop {CONTAINER_ID}
docker run --restart unless-stopped -d -p {YOUR_PORT}:80 geotrek-rando
```

Make sure to remove older images after building new ones, otherwise your server will keep all build and enlarge your machine storage fast.
