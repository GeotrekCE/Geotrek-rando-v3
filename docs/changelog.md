# Changelog

3.5.1 (2021-11-24)
------------------

**🐛 Fixes**

* Fix filter masking (#518)

**🚀 New features**

* Allow to add dynamic links to information pages in footer (#516)

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
