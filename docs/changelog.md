# Changelog

3.10.1 (2022-07-08)
-------------------

**🚀 New features**

* Add date filters to events (#567)

**🐛 Fixes**

* Fix entities HTML escapement for styles injection (#548 / #705)
* Call language locales once on runtime (#553)
* Fix offline map downloading (#738)

**🔧 Maintenance**

* Upgrade Leaflet.offline to version 2.2.0

3.10.0 (2022-07-01)
-------------------

**🚀 New features**

* Reorganize and improve map layers settings and attributions
* Allow to display different layers depending on zoom
* Allow to define attributions for each layer
* Allow to define bounds to some layers (#689)
* Live change attributions to match with the current displayed layer
* Allow to define a specific layer for offline maps
* Allow to define different suggestions groups depending on language (#711)

**🐛 Fixes**

* Fix displaying of routes when hovering or clicking on one trek in map search page (#694)
* Fix first loading of the "Offline contents" page (#621)
* Fix card display on iOS mobile (#645)
* Optimize images in the card when there is only one
* Fix reservation widget loading on treks detail pages (#382)

**💥 Breaking changes**

* Basemap layers settings have been totally modified to allow more customization.  
* `mapCredits`, `mapClassicLayerUrl`, `mapSatelliteLayerUrl` settings have been replaced by `mapClassicLayers`, `mapSatelliteLayers`, `mapOfflineLayer` and their options.  
* You have to apply these changes in your `map.json` customization file.

**⚠️ Version notes**

* You have to edit your `map.json` customization file to apply the new layers settings organization. See `map.json` customization in [documentation](customization.md#settings)
* It is now possible to define home suggestions contents by language. See `home.json` customization in [documentation](customization.md#settings)

3.9.0 (2022-06-22)
------------------

**🚀 New features**

* Add tooltips on detail pages, on actions and information pictograms (#392)
* Add dynamic ratings and rating descriptions on treks details pages (#541)
* Add "gear" property on treks detail pages (#672)
* Add sensitive areas on outdoor sites and courses detail pages (#671)
* Add published infrastructures on treks and outdoor maps (#408)
* Add services (other info) on treks and outdoor maps (#408)
* Allow to exclude labels from treks search results (#418)
* Display all cities on outdoor sites cards and detail pages (#669)
* Display trek route on search map when hovering a trek in results list (#368)
* Add ID on each page to be able to isolate them in CSS (#543)

**🐛 Fixes**

* Fix SSR of treks details pages without signage (#674)
* Disable meteo and reservation widgets on offline detail pages (#622)
* Don't display outdoor sites and courses on map controls if the site has none

3.8.5 (2022-06-02)
------------------

**🐛 Fixes**

* Fix Localization filters

3.8.4 (2022-05-31)
------------------

**🚀 New features**

* Allow to override ``manifest.json`` properties (#661)

**🐛 Fixes**

* Fix card display on iOS mobile (#645)
* Fix truncated icon name if it is too long (#658)
* Display Sensitive Areas when their geometry is MultiPolygon (#655)
* Fix trek detail page if there are no signages endpoint in API (#660)
* Fix trek and outdoor site detail page if there are no weblinks (#660)

3.8.3 (2022-05-24)
------------------

**🚀 New features**

* Add published signages on treks and outdoor maps (#408)
* Add ``groupTreksAndOutdoorFilters`` setting to be able to group Treks and Outdoor filters on search page (#656)

**🐛 Fixes**

* Fix flickering of Outdoor, services and events maps
* Refactoring and improvements of anchor system in detail pages

3.8.2 (2022-04-25)
------------------

**🐛 Fixes**

* Fix HTML interpretation of new "Accessibility" fields (#536 / #638)
* Don't display label filter (Others) in trek filters if no label defined as filter (#418)
* Improve outdoor subobjects display on site maps with adding it in layer control (#542)

3.8.1 (2022-04-25)
------------------

**🚀 New features**

* Display information desks on detail pages map (#401)
* Add reset view and scale controls on maps (#402)
* Add "practical_info" property on touristic content detail pages
* Add some customizable HTML templates and their documentation to include HTML or javascript on all pages before and after header and footer (#588)
* Add portals parameter when fetching API for a detail page, to access to eventual customized PDF by portal (https://github.com/GeotrekCE/Geotrek-admin/issues/2691)
* Refactoring of several components and Leaflet controls

**🐛 Fixes**

* Display multiple geometries on maps
* Fix ``little-forest.png`` image path (#639)

3.8.0 (2022-04-08)
------------------

**🚀 New features**

* Filter treks by labels (#418)
* Allow to hide elevation profile on small elevation treks, with new ``minAltitudeDifferenceToDisplayElevationProfile`` setting (#552)
* Display negative elevation on trek pages (#574)
* Add new accessibility fields on trek, outdoor and services detail pages (#536)
* Improve report forms design with location on map and photos (#453)
* Improve outdoor pages detail pages with displaying subobjects on map (#542)
* Allow to translate HTML templates in Homepage (#617)
* Improve anchor system in detail pages
* Improve translations

**🐛 Fixes**

* Fix flickering of the map when loading the detail pages
* Fix reservation widget loading on trek detail pages
* Fix multiple geometries management

3.7.0 (2022-03-11)
------------------

**🚀 New features**

* Include 3D view in trek detail pages (#390)
* Add ``maxLengthTrekAllowedFor3DRando`` setting to define the maximum length of a trek to enable the 3D view on its page (or to disable 3D view) (#390)
* Add breadcrumb on detail and information pages (#506)
* Add Meteo France widget on all detail pages based on INSEE code of the content (#525)
* Add Open System reservation widget on trek detail pages with an ``id_reservation`` (#382)
* Add ``reservationPartner`` and ``reservationProject`` settings to enable Open System reservation widget (#382)
* Add a customizable color for each content category (treks, outdoor sites, services and events) to better differentiate content categories (#437)
* Add content type name display on hover of pictograms in search page (#437)
* Add the possibility to define outdoor sites, services and events suggestions on home page (#372)
* Display more information on suggestions cards on home page (#372)
* Improve layer controller on treks and outdoor sites detail pages (#449)
* Add a panel on trek mobile map to display trek title, steps and altimetric profile (#452)
* Display SVG theme pictograms in filters
* Improve modale component
* Add German, Spanish and Catalan translations (#571)

**🐛 Fixes**

* Fix categories display in mobile filters depending on contents and settings (#586)
* Fix trek filters displayed in 3 columns (#377)
* Display ``disabledInfrastructure`` and ``accessibilities`` in trek detail pages only if they have content

3.6.0 (2022-02-07)
------------------

**🐛 Fixes**

* Fix SSR (Server Side Rendering) and imprive SEO (#511)
* Fix Node.js server cache (#460)
* Fix Next.js prefetch mechanism

**🔧 Maintenance**

* Upgrade Node.js version 14 to 17 (#460)
* Remove and upgrade several dependencies (#533)
* Replace wretch by axios as http client (#460)

3.5.4 (2022-01-20)
------------------

**🐛 Fixes**

* Do not display empty filters (#518 by @dtrucs)
* Correctly display tags inside list descriptions items (#540 by @dtrucs)
* Sort activities by order defined in API (#539 by @dtrucs)
* Fix sitemap generation when Outdoor module is disabled (by @dtrucs)

3.5.3 (2021-12-17)
------------------

**🐛 Fixes**

* Fix Node.js to version 14, instead of LTR, to fix cache errors (#460)

**🚀 New features**

* Add setting ``enableServerCache`` to be able to disable server cache (#460)

**✨ Improvements**

* Mention ``COMPOSE_PROJECT_NAME`` in installation documentation with several Geotrek-rando on the same server (by @mviadere-openig)

3.5.2 (2021-11-26)
------------------

**🐛 Fixes**

* Fix redirections defined in ``redirects.json`` (#522)
* Fix wrong URL in menu mobile version (#519)
* Add protection if a filter does not have label (#518)

**✨ Improvements**

* Upgrade Next.js version 11 to 12

**💥 Beaking changes**

* ``Redirects`` from Next.js is replaced by a specific redirection system. ``locale`` property is no more used in ``redirects.json`` and it is no more necessary to add default locale key in other languages rules.

3.5.1 (2021-11-24)
------------------

**🐛 Fixes**

* Fix filter masking (#512)
* Fix crash filters with using ID instead of index (#518)

3.5.0 (2021-11-14)
------------------

* To enable Outdoor module, Geotrek-admin version 2.70.0 or higher is required
* To display images in Event module, Geotrek-admin version 2.72.0 or higher is required

**🚀 New features**

* Add outdoor sites and courses in home activity bar, seach, detail pages and offline contents, enabled with ``enableOutdoor`` setting (#376)
* Add touristic events in home activity bar, seach, detail pages and offline contents, enabled with ``enableTouristicEvents`` setting (#389)

**✨ Improvements**

* Group secondary filters by activity for outdoor and services search
* Hide images slideshows on offline content as only the first images are downloaded
* Simplify filter display setting with adding a ``display`` property to each filter (default to ``false``)

**🐛 Fixes**

* Fix offline maps tiles with removing ``mapClassicLayerUrlOffline`` setting that didn't worked

**💥 Beaking changes**

* To hide a filter, you now just have to set its ``display`` property to ``false``. If you had overriden ``filter.json`` file, you have to update it with just setting filters to hide to ``"display":false``.
Example to hide "structures" filter: 
  ```
  [
    {
      "id": "structures",
      "display": false
    }
  ]
  ```

3.4.0 (2021-10-22)
------------------

**✨ Improvements**

* Explicit and manual offline content download - Texts, images and map tiles (#287)
* Add a page listing offline contents on mobile version (#287)
* Add a redirection page when trying to access an unavailable offline page (#287)
* Move back PDF button and open it in a new tab
* Separate types values of services with commas (by @dtrucs)
* Set ``enableSensitiveAreas`` setting default value to ``false``

3.3.0 (2021-10-12)
------------------

**✨ Improvements**

* New filter system (#377)
* Move all download button in header on desktop detail pages (#378)

**🐛 Fixes**

* Avoid crash of touristic content detail pages when teaser is null (#480)
* Fix click on punctual touristic contents on search map (#456)
* Fix static pages cache system (#479)

3.2.0 (2021-09-30)
------------------

Requires [Geotrek-rando-v3-installer](https://github.com/GeotrekCE/Geotrek-rando-v3-installer) version 2.0.0 or more.

**💥 Beaking changes**

* New build system to install and customize a Geotrek-rando portal dynamically, without building it locally (#458)

**🛠️ Maintenance**

* Upgrade dependencies (NextJS 10 to 11 and others) (#469)

**✨ Improvements**

* Move download button in header on desktop trek detail pages (#378)
* Better title and URL for static pages (#468)
* Add "More information" in trek detail page (#370)
* Use ``maximumZoomLevel`` parameter for spiderfy clusters (#367)
* Better 404 error handler for multilanguage (#416)
* Themes uses portalFilters (#432)
* Switch advice and labels on trek detail pages (#445)
* Display parking detail in tooltip on trek detail pages (#400)
* Add ``<h1>`` on homepage

**🐛 Fixes**

* Don't override multi-day trekking url (#473)
* Fix crash when there is no label available in this language (#470)
* Fix tooltip on touristic content detail page (#455)
* Show line or polygon of touristic contents on search page (#456)
* Fix default language canonical URL (#476)
* Deactivate alternate links in meta to avoid 404 (#475)

**⚠️ Version notes**

If you update Geotrek-rando v3, the global Docker process has been updated to avoid the Docker image build on your server :

* Download the version 2.0.0 of [Geotrek-rando-installer](https://github.com/GeotrekCE/Geotrek-rando-v3-installer) 
(``wget https://github.com/GeotrekCE/Geotrek-rando-v3-installer/archive/v2.0.0.zip``) and unzip it in a new folder
* Rapatriate your customization in this folder, overriding the default one
* Eventually create and update the ``.env`` file to define another port from the 8080 default one
* Make sure your NGINX configuration uses the same port (8080 by default)
* Install Docker Compose. See its [official documentation](https://docs.docker.com/compose/install/)
* Launch the application with ``docker-compose up -d``
* No need anymore to build a Docker image on your server to install or update the configuration of your Geotrek-rando
* Details in [installation documentation](/docs/installation.md)
* You can also remove your previous Docker containers and images with launching ``docker container prune`` and ``docker image prune -a``

3.1.3 (2021-09-21)
------------------

**🐛 Fixes**

* Escape ``%`` in URL (#440)
* Escape accents in static pages URL with ``diacritics`` (#440)
* Fix tests
* Fix and improve SEO :
   * Clean HTML from description meta tag (#439, thanks to @dtrucs)
   * Add portal name in title meta tag (#439)
   * Don't remove special characters from title meta tag (#441)
   * Unique URL for each detail page (#442)
   * Fix multilingual URL indexation (#443)

3.1.2 (2021-07-18)
------------------

**🐛 Fixes**

* Disable fullscreen display of images on iOS because it is not supported (#444)

3.1.1 (2021-07-06)
------------------

**🐛 Fixes**

* Fix the size of Leaflet map on mobile search page (#438)

3.1.0 (2021-07-02)
------------------

**🚀 New features**

* Add ``redirects.json`` setting file to manage redirections from Geotrek-rando v2 to Geotrek-rando v3 (#59)
* Allow to filter results by displayed map area (bbox) and its setting ``enableSearchByMap`` (#383)
* Don't recenter map at each search (#413)
* Add a report form on trek details pages and its setting ``enableReport`` (#407) 
* Add Italian translation
* Add tooltips on trek detail pages maps (steps, heritages, touristic contents) (#379)
* Show tooltip on search map on hover (#399)
* Add button on map to locate the user GPS position (#365)
* Add departure, arrival and cities on trek detail pages (#369)
* Allow to display fullscreen images (#403)
* Add download buttons on trek mobile detail pages (#405)
* Display legends at the top of images in mobile detail pages
* Add ``enableIndexation`` setting to allow to disable search engine indexation, ``true`` by default (#410)
* Improve 404 page design (#391)
* Improve URL by removing accents with ``diacritics``
* Improve performances (#362) :
   * Remove some unused dependancies
   * Add ``purgecss`` to reduce CSS bundle size
   * Improve ``react-query`` configuration for a better management of cache (hydration)

**🐛 Fixes**

* Add protections to generate sitemap, even when an object has no ``name`` (#422)
* Fix browser back button, with letting NextJS manage the history (#364)
* Fix mobile display of cards descriptions in detail pages, with adapting the height of the container (#397)
* Fix anchor position detection on detail pages refresh, with waiting the end of rendering to calculate position (#419)
* Fix download buttons z-index on treks detail pages

3.0.3 (2021-05-11)
------------------

**🐛 Fixes**

* Authorize ``null`` value for ``description_teaser`` on ``DetailsCard`` (Fix #366)

3.0.2 (2021-05-06)
------------------

**✨ Improvements**

* Increase clustering maximum zoom level from 15 to 19 (#367)

3.0.1 (2021-05-01)
------------------

**🐛 Fixes**

* Enable ``spiderfy`` on ``Leaflet.markercluster``
* Social network sharing: improve ``og:image`` tag with checking if there is more than one picture instead of two

3.0.0 (2021-04-29)
------------------

* Full redesign and rewriting of Geotrek-rando with React and NextJS (for PWA, SSR and SEO)
* Directly connected to Geotrek-admin API, no more using Geotrek-admin synchronization
* Requires Geotrek-admin 2.57.0 minimun, reachable in https
* Requires Docker to be installed
* Compatible with [Geotrek-rando-v3-installer](https://github.com/GeotrekCE/Geotrek-rando-v3-installer) version 1.0.0 

**🚀 New features**

* Redesign of main pages (Home, Search, Details, Informations)
* Mobile first with a dedicated mobile responsive design
* Rewriting with modern frameworks (React and NextJS)
* Search engine optimisation (SEO) with Server side rendering (SSR)
* Dynamic sitemap generation for SEO
* Progressive web app (PWA) to be able to install the web application on a phone, including some offline contents
* Multilingual
* Optimized API calls with cache on some contents (such as filters values, cities...)
* Customizable homepage content
* Simple deployment and customization
* Search into treks or touristic contents with their common or specific filters
* Global documentation (presentation, installation, customization, development, icons, cache...)

**⚠️ Release notes**

* To upgrade to this version, you will have to do a new installation of Geotrek-rando with Docker. See [installation documentation](https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/docs/installation.md)
* The installation process of Geotrek-rando v3 is independant from your eventual version 2 of Geotrek-rando

1.x and 2.x
-----------

See the repository dedicated to versions 1 and 2 of Geotrek-rando: https://github.com/GeotrekCE/Geotrek-rando
