# Changelog

## 3.23.1 (2024-10-14)

**🔧 Maintenance**

- Remove typesafe-actions package (#1278)

**🐛 Fixes**

- Fix annotations viewpoint with no features (#1275)
- Display figcaption for flatpage single image (#1276)
- Fix childrenTrek navigation if there are only 2 items (#1277)

## 3.23.0 (2024-10-08)

**✨ Improvements**

- Style the new image gallery feature for Flatpage content (Available since Geotrek admin 2.109.2) (#1265)
- Improve tooltip content style for annotation HDViewpoints (#1260)
- Add className on annotation HDViewpoints pathes to CSS customization purpose (#1260)

**🔧 Maintenance**

- Bump react and react-dom from 18.2.0 to 18.3.1 (#1269)
- Bump next from 13.1.6 to 13.2.4 (#1268)
- Bump @sentry/nextjs from 7.12.1 to 8.32.0 (#1268)
- Install sharp package (#1262)
- Update caniuse-lite (#1261)
- Bump react-leaflet from 3.1.0 to 4.2.1 (#1258)
- Replace react-leaflet-markercluster by next-leaflet-cluster package (#1258)
- Bump @types/leaflet from 1.7.5 to 1.9.12 (#1258)
- Bump @raruto/leaflet-elevation from 1.7.0 to 1.9.0 (#1258)
- Bump leaflet.offline from 3.0.1 to 3.1.0 (#1258)
- Bump @20tab/react-leaflet-resetview from 1.0.1 to 1.1.0 (#1258)

**🐛 Fixes**

- Fix the itinerancyStep display on the map - regression since 3.20.0 (#1259)

## 3.22.1 (2024-09-17)

**🐛 Fixes**

- Install semver package

## 3.22.0 (2024-09-17)

### :warning: **WARNING!** :warning:

**Do not use - docker installation will not work. Please install version 3.22.1 (or higher) instead**

**✨ Improvements**

- Add annotation category (label and picto) to HD viewpoint map tooltip (#1229)
- Add "Display in HD pictures" button at the map bottom if the details page contains at least one HD viewpoint (#1229)
- Refacto to use the leaflet locate.control in a more “react” way (#1227 #1219)
- Refacto Leaflet CustomControl wrapper (#1237 #1219)
- Refacto sheet component (#1238 #1219)
- Prevent map zooming when scrolling on the elevation profile (#1228)
- Remove styled-component and handle styling only with tailwindCSS (#1147)

**🔧 Maintenance**

- Bump node from 18 to 20 (#1021)
- Bump @types/node from 16.9.4 to 22.5.4 in /frontend (#1244)
- Bump @next/eslint-plugin-next and eslint-config-next packages to 14.2.10 (#1217)
- Bump @testing-libray packages(#1218)
- Bump leaflet.locatecontrol from 0.74.0 to 0.81.1 (#1227)
- Install @radix-ui/react-dialog package
- Install class-variance-authority package
- Install tailwindcss-animate package
- Bump tailwind-merge from 2.2.2 to 2.5.2
- Bump docker/build-push-action from 5 to 6
- Remove react-burger-menu package

**🐛 Fixes**

- Fix display of mobile menu sub-filters (#1006 #1235)

## 3.21.1 (2024-07-29)

**🐛 Fixes**

- Prevent app to crash in touristic event detail page - Regression since 3.21.0 (#1208 #1209)

## 3.21.0 (2024-07-18)

**🚀 New features**

- Create trek `networks` filter (#1043 #1193)

**✨ Improvements**

- Cleanup overhead of useless immutable pattern in loop for various adapters (#1197 #1198)

**🔧 Maintenance**

- Refacto of full screen management (#901 #1173)
- Bump @tanstack/react-query from 4.10.3 to 5.51.1 (#1192)

**🐛 Fixes**

- Prevent homepage video from displaying full-screen on IOS devices (#1178 #1179)
- Manage null value for some fields (#1170)
- Fix hydration issue with ResultCardCarousel (#1186)
- Fix aria-hidden position for detailsCard button (#1187)
- Fix headermenu spacing when there is no language selector (#1200)

## 3.20.3 (2024-06-10)

**🐛 Fixes**

- Fix sitemap.xml for connected GTAs >= 2.104 (#1163)

**📝 Documentation**

- Add link to JSON feed example (#1162)

## 3.20.2 (2024-06-06)

**✨ Improvements**

- Expose "categories" colors to CSS custom properties and tailwind (#1137)
- Improve flatpage button (#1148)
- Move "source" section to the flatpage last item (#1150)
- Close the mobile menu when a link inside is clicked (#1151)
- Improve contrast and margin for flatPage title (#1156)
- Style all Hn tags differently for the flatpage WYSIWYG (#1161)

**🐛 Fixes**

- Fix user activation zone for main menu dropdown (#1146 and #1149)
- Fix touristic suggestions for flatpage (#1152)
- Homogenize id type from suggestions adapter (#1152)
- Reduce images gray haze on menuItems and flatpage children cards (#1159) 

## 3.20.1 (2024-05-28)

**🐛 Fixes**

- Fix Search page pre-render - Regression since 3.20.0 (#1139)

**📝 Documentation**

- Add details about portalIds setting (#1144)

## 3.20.0 (2024-05-21)

**🚀 New features**

- Add a `displaySecondaryLayersByDefault` settings (default to `true`) to display or not secondary layers on maps by default (#997 and #1130)
- Display Files from attachments to download in details pages (#1118)

**✨ Improvements**

- Clean search params in search page (#1100)
- Use Image component for TrekMarker map Popup and DetailsPreview logo images (#1102)
- Improve detailsCard UI interaction (#1112)
- Rename attachments props to images props (#1113)
- Update homepage BannerCarousel autoplaySpeed to 5sec for images (#863 and #1120)
- Improve mobile filters menu (#1006 and #1131)
- Break words for large links from description details (#1114 and #1133)

**🔧 Maintenance**

- Bump @types/react-burger-menu from 2.8.1 to 2.8.7 in /frontend by @dependabot (#1041)
- Use urlSearchParams feature instead of qs package (#1104)

**🐛 Fixes**

- Fix some types (#1096 for #1057)
- Remove useless outdoorPractice call (#1097)
- Avoid to call an unexistant network in the networkDictionary in suggestion (#1099)
- Add (or remove) hooks dependencies (#1098 for #1057)
- Fix mobile menutem coloration - Regression since 3.19.0 (#1103)
- Fix presence of child menu items to divide desktop menu (#1105)
- Fix flatpage suggestions display if some IDs are missing (#1106)
- Avoid to stringify potentially nullable props (#1111)
- Fix details section "contact" anchor/translation (#1117)
- Fix img display from carousel POIs card on mobile viewport (#1127)
- Fix Trek association to new typology entry causes an error (#1123 and #1128)
- Fix map popup for outdoor_course items (#896 and #1119)
- Fix leaflet CSS override for links - regression since v3.16.1 (#1132)

## 3.19.3 (2024-04-08)

**🐛 Fixes**

- Improve flatPage styling (#1092)
- Revert Use Image component for the main logo - Regression since 3.19.0 (#1093)

**📝 Documentation**

- Documenting the settings for `map.json` (#1088)

## 3.19.2 (2024-04-04)

**🐛 Fixes**

- Fix conversion to large submenu items if a child contains an image (#1087)
- Fix some flatpage styles (#1089)

## 3.19.1 (2024-04-03)

**🐛 Fixes**

- Fix the display of MenuItem label (#1085)

## 3.19.0 (2024-04-03)

**🚀 New features**

- New menu system and style (#1049, #1079) - Require Geotrek-admin version 2.104.0 minimum
- Improve flat pages style and content with children pages and suggestions (#1075, #1078)

**🔧 Maintenance**

- Upgrade typescript to 5.3.3 (#1057)
- Improve ESLint config (#1057)
- Upgrade tailwind packages to 3.4.1 (#1069)
- Improve breadcrumb semantics (#1074)
- Make HomeSection component more generic (#1073)

**🐛 Fixes**

- Fix HD viewpoints layer selector (#943)
- Fix flat pages not linked in menu (#607)
- Fix menu external link target (#590)

## 3.18.0 (2024-02-08)

**🚀 New features**

- Add HD viewpoints on treks, outdoor sites and POIs (#943)

**🔧 Maintenance**

- Bump @types/node from 16.9.4 to 20.11.10 #1042
- Bump actions/upload-artifact from 3 to 4 #1036
- Bump docker/metadata-action from 4 to 5 #1035
- Bump actions/checkout from 3 to 4 #1034
- Bump docker/build-push-action from 3 to 5 #1033
- Bump docker/login-action from 2 to 3 #1032

## 3.17.1 (2024-01-25)

**🚀 New features**

- Customization of result card (#987)

**✨ Improvements**

- Remove the limitation of result card max height (#1012)

**🔧 Maintenance**

- Upgrade Cypress package to 13.6.3 (#1028)
- Run Cypress tests on CI (#948 and #1028)

**🐛 Fixes**

- Fix regression customization header - regression since v3.17.0 (#1019 and #1020)
- Fix scriptsHeader/Footer containing only one node - regression since v3.15.4 (#1029 and #1030)

## 3.17.0 (2024-01-12)

Require Geotrek-admin 2.98.0 (March 2023) minimum.

**💥 Breaking changes**

- This version of Geotrek-rando may not work correctly if connected to a Geotrek-admin API lower than version [2.98.0](https://github.com/GeotrekCE/Geotrek-admin/releases/tag/2.98.0), due to the modification of parameters to obtain treks near POIs and sensitive areas. (#890)
- If you've defined the `home.json` file with `activityBar` property in your customization files, make sure your override contains the `links` property.

**🚀 New features**

- Define customization for activity bar (#560 and #568)

**✨ Improvements**

- Use more efficient filters to get treks near POIs and sensitive areas (#890)
- Move the mobile menu in the <header> tag and improve accessibility (#1010)
- Remove "diary" entry from touristic events filters (#1012)

**🔧 Maintenance**

- Upgrade react-accessible-accordion package to 5.0.0 (#1010)
- Upgrade react-burger-menu package to 3.0.9 (#1010)

**🐛 Fixes**

- Remove language selector from mobile menu if there is only one language (#1010)

## 3.16.1 (2023-12-13)

**✨ Improvements**

- Update IGN links to match with latest changes of IGN (#999)
- Add loading lazy attributes to iframes (#1003)
- Improve map popup component (#1002)
- Improve ControlSection component (#1001)
- Display only filled information desk website/email/phone (#995)

**🐛 Fixes**

- Fix activities order in search page (#998)
- Fix practical information anchor from details page (#1000)
- Avoid app crashes if /customization/html/details folder is missing (#996)
- Display zoom+fullscreen map control at first position (#1008)

## 3.16.0 (2023-10-25)

**💥 Breaking changes**

- The `enableMeteoWidget` in `global.json` is no longer supported. By default the widget is activated on all instances. [Read the doc](https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/docs/customization.md#html--scripts) to see how to deactivate this widget on the details page

**🚀 New features**

- Define custom template sections for details pages #988

## 3.15.5 (2023-10-23)

**🐛 Fixes**

- Fix the condition for displaying outdoorSite course: it checked the number of children (i.e. the children site of the current outdoorSite) instead of the outdoor courses related (#985)
- Fix dynamic acceptance/refusal of GA cookies (#990)

**✨ Improvements**

- Avoid saving tiles from data.geopf.fr to cache storage (#984)
- Add semantics to Footer components (#989)
- Rewrite buttons components to use tailwind (#974)

## 3.15.4 (2023-10-10)

**🚀 New features**

- Ask the user's consent to deposit cookies (#982)

**💥 Breaking changes**

- To keep Google Analytics running (if defined by `googleAnalyticsId` in `global.json`), you need to define the new `privacyPolicyLink` key in `global.json` with the url of your privacy policy page (See #459).

**✨ Improvements**

- Add the `privacyPolicyLink` key in `global.json` to define the link of privacy policy page (#982)

**🔧 Maintenance**

- Upgrade html-react-parser package to 2.0.0 (#982)

## 3.15.3 (2023-10-02)

**🚀 New features**

- Allow to select an organizer event in filter search (#968)
- Add map fullscreen control (#952)

**✨ Improvements**

- Display search filters for all categories on first page load (#971)
- Call one map instance instead of two on search pages (#971)
- Rewrite Header component to use semantics and tailwind (#976)
- Rewrite 404 component to use tailwind (#975)
- Set height of featured image area on details pages (#973)

**🔧 Maintenance**

- Upgrade leaflet.offline package to 3.0.1 (#969)
- Upgrade react-inlinesvg package to 4.0.4 (#972)

## 3.15.2 (2023-09-07)

**🐛 Fixes**

- Fix colorization of the map filter button (#963)
- Fix no wrapping chips (#962)
- Don't load reservation widget if `reservation_id` is an empty string (#961)

**📝 Documentation**

- Improve the installation in development procedure (#964)
- Mention cache refreshing when adding new contents (#958)

## 3.15.1 (2023-08-09)

**🐛 Fixes**

- Fix z-index issue with search bar (version 3.15.0 regression) (#954)
- Fix colors on activity bar (#955)

## 3.15.0 (2023-08-08)

**🚀 New features**

- Allow to hide and reorder sections in detail pages with the new `details.json` configuration file (#510)

**✨ Improvements**

- Clean and factorize detail pages (#510)
- Call one map instance instead of two on detail pages (#939)
- Improve server cache of common dictionaries (themes, cities, sources, informationDesk, labels) (#940)
- Improve SVG icons display (#942 / #944)

**🐛 Fixes**

- Do not try to display the informationDesk thumbnail if there isn't one (#947)
- Fix card display bug in some Chrome environments (#951)

**🔧 Maintenance**

- Upgrade NodeJS version 17 to 18 in Dockerfile (#938)

## 3.14.2 (2023-07-01)

**🐛 Fixes**

- Synchronously load scripts for the Reservation widget (#936)
- Define default placeholder to SelectableDropdown (#935)
- Fix the version of node in dockerfile (#938)

## 3.14.1 (2023-06-19)

**✨ Improvements**

- Rework and improve cards in details pages (#928 / #932)

**🐛 Fixes**

- Fix links to images without legend in search results (#919)
- Fix the render of the altimetric profile rendering (version 3.14.0 regression) (#930)

## 3.14.0 (2023-06-19)

**✨ Improvements**

- Refactoring of children cards in treks and outdoor sites detail pages (#921)
- Set anchors to navigate between sections of detail pages (#922)

**🐛 Fixes**

- Fix related sites and courses in outdoor site detail pages (#846)
- Fix carousel on Events, Outdoor sites and courses detail pages (#909)
- Handle sub-filters values as string like others filters values (#911)
- Fix display of information desks with null fields (#918)

**💥 Breaking changes**

- The migration from tailwind version 2 to 3 includes some minor breaking change of utility classes. It will be necessary to be careful that the classes used in your customization are still ok. See the upgrade guide from the official documentation https://tailwindcss.com/docs/upgrade-guide
- Translations keys related to `sensitiveAreas` [changed](https://github.com/GeotrekCE/Geotrek-rando-v3/pull/922/files#diff-5b2422febb084ac7226b93c9cbb7e0406aeac5fcd0bcbee9a21515fdcc0eac6c), check if you have replaced them in your customization
- The identifier of the information desk section in the details page has changed from `details_informationDesks` to `details_practicalInformations`.

## 3.13.6 (2023-04-18)

**✨ Improvements**

- Improve forms: semantics, displays error and accessibility (#902)
- Structure styles around forecast widget in details page (#897)

**🐛 Fixes**

- Bugfixes for trek marker (#900 and #905)
- Handle cities and districts values as string like others filters values (#907)

## 3.13.5 (2023-03-24)

**✨ Improvements**

- Set config to display or not objects related to itinerant treks (#893)
- Add alt and loading attributes to TrekMarker image (#892)

## 3.13.4 (2023-03-21)

**✨ Improvements**

- Add UpcomingEvents feature to homepage suggestions (#886)
- Encode ID params send to the API (#888)

**🐛 Fixes**

- Avoid unnecessary fetch for obtaining map items (regression since v3.13.3) (#887)

3.13.3 (2023-03-16)
-------------------

**✨ Improvements**

* Define lazy loading for all Thumbnails images (#883)
* Avoid unnecessary fetch for obtaining dictionaries (#880)

**🐛 Fixes**

* Thumbnails image format are defined for all thumbnails (regression since v3.13.0) (#883)
* BadgeIcons are back for trek contents (regression since v3.13.0) (#883)

3.13.2 (2023-03-15)
-------------------

**✨ Improvements**

* Improve search page SEO with paginating results for search engines (#833)
* Don't display expired events in homepage suggestions (#878)
* Improve and simplify customization example (#842)
* Improve Layout component wrapping (#874)
* Refactor and homogenize objects cards (#875)
* For touristic content in homepage suggestions, the categories are fetched only once instead of the same number of items. (#875)

3.13.1 (2023-02-28)
-------------------

**✨ Improvements**

* Display home activities directly by SSR (links reachable by search engines)

**🐛 Fixes**

* Fix remoteIconInformation with no icons (regression since 3.13.0)
* Fix error when the scale property is not defined for trek or outdoor detail page

3.13.0 (2023-02-23)
-------------------

**✨ Improvements**

* Add captcha to the report form if an API key from HCAPTCHA is defined in `global.json` settings (#815)
* Rewrite a component dedicated to image and their captions (= legend + author) (#858)
* Add some accessibility to display image related to their captions (#858)
* Page in fullscreen are not cropped anymore (#858)
* Improve headlines and titles of pages (#861)

**🐛 Fixes**

* Fix the display of input error message (#815)
* Remove all scripts tags from HTML/script templates when rewriting builded pages (#860)

3.12.1 (2023-02-08)
-------------------

**🐛 Fixes**

* Fix sync SSR display with none-fullscreen support (for iOS) (#855)
* Fix sync SSR display with meteo in Touristic contents and events pages (#855)

3.12.0 (2023-02-04)
-------------------

**✨ Improvements**

* Always keep the layout (header/footer) when transitionning from page to another
* Add the loading spinner when reservation widget is loading (#732)
* Remove offline page from SEO indexation (#819)
* Make sure API endpoints have a final slash to avoid an API redirection (#822)
* Improve SSR display for all details pages + suggestions from homepage (#848)
* Improve rules of cache strategy (#849)
* Save cache page on dynamic navigation (#849)
* In search page and in offline mode serve offline content instead of search content (#849)
* Better handle when the geometry of a trek is a point instead of a linestring (#850)
* Handle outdoor without practice

**🔧 Maintenance**

* Upgrade Node.js version 17 to 18
* Upgrade NextJS version 12 to 13 and its dependencies, to prepare upgrade from React 17 to 18 (#634)
* Upgrade next-pwa package from version 5.4.4 to 5.6.0 (#804)
* Upgrade react-query from version 3.24.3 to 4.10.3 (#807)
* Rewrite usage of loading spinner by removing react-loader package (#817)
* Synchronize pre-rending SSR with browser hydration (#802)

**🐛 Fixes**

* Fix accessibility images display (#832)
* Fix customisation of 404 and offline pages (#816)
* Remove duplicated gear block on trek detail pages (#844)
* Fix loading spinner location when loading more objects on search page (#414)
* Define explicitly a range zoom for group layers (#811)

3.11.0 (2023-01-24)
-------------------

**🔧 Maintenance**

* Add Github action workflow with 2 stages: builder, final (#816)

3.10.9 (2022-10-06)
-------------------

**🐛 Fixes**

* Fix default easyOK color (#801)

3.10.8 (2022-10-05)
-------------------

**✨ Improvements**

* Search page map: Display object main geometry on marker hover also on Outdoor sites and Touristic events and manage geometry collections (#497)
* Search page map: Use the object category color when displaying the object main geometry on marker hover (#497)
* Improve and update Italian translations (#795)

**🐛 Fixes**

* Fix hoverable marker refreshing (#774)
* Display Catalan flag for Catalan version (#601)

**🔧 Maintenance**

* Improve and refactor geometry management, including geometry collections (#791)
* Clean document and remove unused Roboto font (#787)

3.10.7 (2022-09-22)
-------------------

**🐛 Fixes**

* Fix map position on Search page (#776)
* Fix display of truncated cards (#693)
* Fix location filter loading in mobile version (#779)
* Do not try to display themes without name (#781)

**🔧 Maintenance**

* Update, improve and document Sentry configuration (#777)
* Clean packages with removing useless dependencies (#771)

3.10.6 (2022-09-06)
-------------------

**🐛 Fixes**

* Fix Search by map, broken since version 3.10.4

3.10.5 (2022-09-05)
-------------------

**🚀 New features**

* Allow to display additional GeoJSON layers on the maps (#385)

3.10.4 (2022-09-01)
-------------------

**🐛 Fixes**

* Paginate API pages of the information desks (#765)
* Set explicit timezone to GMT+0 (#751)

**🔧 Maintenance**

* Decrease warnings of the linter (#748)
* Clean suggestion connector (#710)
* Update rando3d package, remove jQuery and enable only examine mode (#760)
* Remove lodash package from the project (#758)

3.10.3 (2022-08-18)
-------------------

**🚀 New features**

* Allow to provide translations for filters labels in ``config/filter.json`` (#749)

**🐛 Fixes**

* Enable emails and URL links in touristic events detail pages (#742)
* Translate dates without trying to determine the current timezone (#751)

3.10.2 (2022-07-18)
-------------------

**🐛 Fixes**

* Fix events date filter on map results of Search page (#741)
* Link to detail page on images of objects cards rather than images fullscreen (#670)

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
