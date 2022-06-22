# Customization

You can override default settings, colors, CSS, HTML and translations in your own `customization` folder.

See the [general presentation](presentation-fr.md) for an overview of the application.

After each customization changes, you'll have to restart the Docker container by running `docker-compose restart`.

## Settings

Default configuration are defined in files from https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/config folder.
You can override all settings default values in files from your own `customization/config/` folder.

Examples of customizations are available in https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/customization/config folder.

In json files, you can just override the primary keys you need. You have to override primary keys globally.

- `global.json` (default value in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/global.json) to define :

  - `searchResultsPageSize`, `mapResultsPageSize`: used to limit the sizes of results per page when fetching API
  - `maxPoiPerPage`: max number of point of interest (POI) displayed on a single trek page
  - `maxTouristicContentPerPage`: max number of touristic contents displayed on a single trek page
  - `portalIds`: eventual portal filters (list of ids).
  - `enableSensitiveAreas`: boolean, default to false. Set it to true if sensitive areas are defined in your Geotrek-admin
  - `enableOutdoor`: boolean, default to false. Set it to true to enable Outdoor sites and courses
  - `groupTreksAndOutdoorFilters`: boolean, default to false. Groups treks and outdoor filters into a single tab. For this setting to work, `enableOutdoor` must be set to `true`.
  - `apiUrl` : Geotrek-admin API URL
  - `googleAnalyticsId`: eventual Google Analytics Id
  - `googleSiteVerificationToken`: eventual code to enable Google Search Console and Google developer tools
  - `enableIndexation` to disable search engine indexation
  - `baseUrl`: base URL of your portal (for dynamic sitemap.xml)
  - `fallbackImageUri`: this uri is used to generate a default image for a trek or a touristic content if none is defined
  - `touristicContentLabelImageUri` : this uri is used to define the logo of the labeled touristic contents:
    ![Activity Icon on filter list](assets/labeledTouristicContentExample.png)
  - `applicationName`: application name appearing on PWA
  - `enableReport`: to enable report form in trek detail pages
  - `enableSearchByMap`: to enable searching by map displayed area (bbox)
  - `maxLengthTrekAllowedFor3DRando`: Maximum length of meters allowed to enable 3D mode in the current trek. Adjust this setting carefully as too long a trek could freeze your browser. If this setting is defined to `0` (or `mapSatelliteLayerUrl` from `map.json` is not set) the 3D mode feature is disabled for the whole application
  - `minAltitudeDifferenceToDisplayElevationProfile`: Minimum altitude difference in meters required to display the elevation profile in the current trek

- `header.json` to define logo URL, default and available languages, number items to flatpages to display in navbar (see default values in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/header.json)

- `home.json` to define homepage settings. You can define blocks to display and trek suggestion block with treks ID, outdoor sites ID, services ID or events ID to highlight on homepage (see https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/home.json).

  - In `welcomeBanner`, you can personnalize the cover on the homepage. You can add an asset on the top of the page: it can either be a video, a single picture or a carousel of images:

    - `videoUrl`: to add a video
    - `carouselUrls`: to add a carousel of images. You have to add an array of urls
    - `pictureUrl`: to add a single image

    Only one type of asset can be displayed. If you add several fields (`videoUrl` and `pictureUrl` for example), we will pick one, following this order of priority: video over carousel over picture.

    You can also enable a text to be displayed on the top of this asset:

    - `shouldDisplayText`: `true` to display the text on above the asset, `false` to hide it.

- In the `footer.json` file, you can define social networks, informations about your organization, and some links (see example in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/footer.json).

  - Social networks: `facebook`, `twitter`, `youtube`, `instagram` or `fallback`.
  - Contact information such as your name, address, phone number and email.
  - Links based on the key pair `label`/`url` (can be based on translation labels for multilingual) and/or the key `informationID` whose value is equal to a flatpage identifier.

- `filter.json` to define filters to hide, their order and values (see example in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/config/filter.json). If you want to hide some of the filter, you have to override their properties with `"display": false`.
  The `labels` filter contains an additional `withExclude` parameter. Its default value is `true`. By setting it to `true`, the user can filter the search by excluding a label (`withExclude` only works if your version of Geotrek Admin is equal to or higher than [2.77.0](https://github.com/GeotrekCE/Geotrek-admin/releases/tag/2.77.0); please set it to `false` if this is not the case)
- `map.json` to define basemaps URL and attributions, center (y, x), default and max zoom level (see example in https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/customization/config/map.json).

  - You can also update the map layers. There are two map layers available:

    - `mapClassicLayerUrl` for the map version
    - `mapSatelliteLayerUrl` for the satellite version. It is optional, so if you want to have only one available map background, you can add `mapSatelliteLayerUrl: undefined`. This will remove the button which allows the user to switch between two map backgrounds.

  - `zoomAvailableOffline` allows you to define the zoom modes allowed in offline mode. This allows you to control the amount of disk space required when caching. Default `[13,14,15]`

- `redirects.json` to define URL rewriting for your instance. For example, you can use this customization to redirect old URL style (Geotrek-rando V2) to the new URL style (Geotrek-rando V3) or to redirect old URL to a new URL after changing the name of a hike in the backend.

  - In `rules`, you can define all the rules needed to redirect clients

    - `source`: must match to the old URL. Use the wildcard `*` to redirect a subdirectory. Use `:varname` to forward a variable to the destination
    - `destination`: must match to the new URL. Use `:varname` to inject a variable captured in the old URL
    - `permanent`: Set to `true` if the redirection is permanent. Set to `false` if the redirection is temporally. Default to `false`

    Examples :

    ```json
    {
      "rules": [
        {
          "source": "/a-cheval/col-de-font-froide",
          "destination": "/trek/582-col-de-font-froide"
        },
        {
          "source": "/a-pied/:name",
          "destination": "/search?rawText=:name"
        },
        {
          "source": "/fr/walking/:name",
          "destination": "/en/search?rawText=:name",
          "locale": false
        }
      ]
    }
    ```

    You can find more examples and more details following this link : https://nextjs.org/docs/api-reference/next.config.js/redirects

### _Warning:_

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

It's also possible to change category colors :

```json
{
  "categories": {
    "trek": "blue",
    "events": "red",
    "outdoor": "#62AB41",
    "service": "#3B89A2"
  }
}
```

NB: If global config `groupTreksAndOutdoorFilters` is set to `true`,  the `outdoor` color is ignored in favor of the `trek` color.

## CSS

You can override CSS in `customization/theme/style.css` file. To help overriding CSS, some ID have been added on main DIV components:
- `home_content`, `home_activitiesBar`, `home_topHtml`, `home_section`, `home_activitySuggestion`, `banner_carousel`, etc on Homepage
- `header_logo` in Header
- Several similar ID on search and detail pages
- `home_container` to isolate Home page
- `search_container` to isolate Search page
- `details_container` to isolate detail pages
- `flatPage_container` to isolate static flatpages

## Translations

You can override every texts in translations files, based on default ones (https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/src/translations).

You should at least override `home.title`, `home.description` and `home.welcome-text`.

## HTML / Scripts

You can include some HTML parts in different sections of the layout application, with files:

- `customization/html/headerTop.html`: before the header section
- `customization/html/headerBottom.html`: after the header section and before the content page
- `customization/html/footerTop.html`: before the footer section and after the content page
- `customization/html/footerBottom.html`: after the footer section
- `customization/html/homeTop.html`: first section of the homepage
- `customization/html/homeBottom.html`: last section of the homepage

These templates can be translated by using the language code as a suffix (e.g. `homeTop-en.html` will be rendered only for the English interface). The application tries to find the localized template first, otherwise it tries the non-localized template, otherwise it displays nothing.
NB: If you want to display a message common to all languages but not to a particular language (e.g. french), just create the template suffixed with its language code (e.g. `-fr.html`) and leave it empty, and voilà!

You can also include some scripts:
- `customization/html/scriptsHeader.html`: in the `<head>` of the document
- `customization/html/scriptsFooter.html`: just before the `</body>` end tag

The scripts templates are intended for third party scripts. Unlike the HTML parts, there is not possibility of translations.

See examples in https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/customization/html.

Icons are provided by Geotrek-admin API. See [icons documentation](icons.md) to know how they have to be designed.

## Manifest.json

There is a default `manifest.json` generated using the `applicationName` parameters of `global.json` and icons/images detailed in the next section below (See: https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/src/pages/manifest.json.tsx#L20).
You can complete it by creating `manifest.json` file in the `customization/config/` folder and filling it with the props to add and/or override.

## Images, favicon, mobile phone icons and splashscreens

These files need to be in the correct folder during the build process and therefore, we created a specific `medias` folder in the customization repository.

It provides 6 default images that can be customized:

- android-icon.png: It has to be 144x144px and controls the icon appearing on Android phones
- maskable-icon.png: It hass to be 144x144px and will be used only on android phones enabling round icons (it will hence be cropped to fit a circle by the android phones)
- apple-icon.png: It has to be 144x144px and controls the icon appearing on iOS phones
- android-splashscreen.png: It has to be 512x512px and controls the splashscreen appearing on Android phones
- ios-splashscreen.png: It has to be 512x512px and controls the splashscreen appearing on iOS phones
- favicon.png: It will be used as the favicon in web browsers

You can also add images and other files in the `medias` folder to be used as logo, images in HTML parts and static pages. They will be available on "url-geotrek-rando/medias/image-name.jpg" and can be linked as "/medias/image-name.jpg".

## Apply changes

After each customization changes, you'll have to restart the Docker container by running `docker-compose restart`.
