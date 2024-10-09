# Introduction

Geotrek-rando is a PWA (Progressive Web App) that allows publishing a web portal adapted to different screen sizes, including mobile devices (responsive design). A PWA can also be installed on a mobile device directly from the browser (without using the Android, Apple, or other app stores), providing an enhanced mobile experience, including offline content availability.

Click [this link](https://en.wikipedia.org/wiki/Progressive_web_app) to learn more about PWAs.

## Homepage

The homepage is composed of:

- A horizontal banner (header) with:
   - A customizable logo and portal name
   - Links to static pages in the order defined in Geotrek-admin, with a setting to display 0 to 3 at the top level, and the remaining links listed under "Learn more"
   - A language selector to switch between available languages
   - A permanent link to the search page
- A large image, a series of images, or a customizable video, with an optional introduction text that can be hidden
- A list of trek practices, Outdoor practices, tourist content categories, and event categories (depending on the published content) shown as clickable icons in the order defined in Geotrek-admin

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-01-homepage.jpg)

- A fully customizable HTML area with desired text, images, and links
- A section highlighting one or more blocks of treks, outdoor sites, services, or events linking to their detail pages
- A second fully customizable HTML area with desired text, images, and links

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-02-homepage.jpg)

- A customizable footer with:
   - A block of links to the organization’s social media
   - The organization's contact information
   - Additional links

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-03-homepage.jpg)

## Search page

The search page allows users to search among treks, outdoor sites, services (tourist content), and tourist events.

![Search](https://geotrek.ecrins-parcnational.fr/images/gtr3-04-search.jpg)

**Filters:**

- You can select one or more trek practices, one or more Outdoor practices, one or more service categories, and one or more tourist event categories.
- If no practices or categories are selected, all objects are displayed.
- You can also use filters common to all objects (themes, cities, districts, and organizations).
- If you select trek practices, specific filters (difficulty, duration, length, elevation gain, route type, and accessibility) will appear.
- If you select a service category, the filters specific to that category will appear (type 1 and possible type 2).
- The map area is also used to filter results (this feature can be disabled).
- Filters can be customized, hidden, or reordered.

**Results:**

- All search results are displayed on the map.
- In the list, results are displayed 10 at a time to optimize loading time.
- Close points on the map are grouped into clusters based on zoom level.
- Clicking on an object on the map shows its name and image in a tooltip.
- If it’s a trek, its exact route is displayed on the map when clicked.
- Hovering over a result in the list highlights its location on the map.
- The results on the list and map provide access to each object's detailed page.

## Detail page

Each object has a detail page with its detailed information and map.

Detail pages consist of a scrollable information block on the right, a fixed map on the left, and a vertical fixed block for navigation between sections.

### Treks

The trek detail pages start with the associated photo(s) and buttons to download it in PDF, KML, or GPX format.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-05-detail.jpg)

Next, the technical information about the trek (themes, difficulty, duration, elevation gain, etc.) is displayed, followed by a summary and general ambiance text.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-06-detail.jpg)

If the trek is part of an itinerary, the list of its stages is shown, which are also displayed on the map. Hovering over a stage highlights it on the map. Clicking on a stage opens its detail page.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-07-detail.jpg)

Then the list of heritage sites is displayed, along with their locations on the map.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-08-detail.jpg)

Next comes the technical description, with any corresponding red location markers on the map, followed by a widget from Météo France (which can be disabled) based on the trek’s starting town. An interactive elevation profile with the map, followed by recommendations, is also included.

If the "Sensitive Zones" module is activated and the trek intersects one or more sensitive zones, they will be displayed before the recommendations.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-09-detail.jpg)

Information on associated information points, road access, public transport, accessibility for people with reduced mobility, additional links, and the source of the page is displayed next.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-10-detail.jpg)

A report form (optional) and a booking widget for itineraries with an associated booking ID appear at the end of the page. The trek detail page concludes with a list of nearby services (tourist content).

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-11-detail.jpg)

It is also possible to add customizable HTML or JavaScript content blocks on all site pages.

If amenities, published signs, or services are present near the trek, they can be displayed on the trek’s map.

### Outdoor sites

- The main site is displayed at the first level.
- If the site has one or more sub-sites, they are listed on the page.
- The site's or sub-sites' routes are also listed.
- Nearby treks are also listed to identify site access.

### Tourist contents

Tourist content detail pages are built similarly, but with simpler content.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-12-detail.jpg)

### Tourist events

Similar to tourist content, but with more fields and dates.

## Static pages

Information static pages are accessible from the main menu in the header.

Up to 3 static page links can be displayed, with the rest accessible under the "Learn more" menu.

Static pages consist of a title, an optional main image, and HTML content with text, images, links, and other media (videos, etc.).

![Information](https://geotrek.ecrins-parcnational.fr/images/gtr3-13-information.jpg)

## Mobile version

The portal's layout is optimized for mobile devices, making it suitable for small screens and touch interactions.

Each page has been adapted for different screen sizes.

![Mobile](https://geotrek.ecrins-parcnational.fr/images/gtr3-14-mobile.png)

As the web portal is a PWA, when viewed on a smartphone, a message appears at the bottom of the screen, inviting the user to add it to their home screen. A shortcut will then be created, and the content will be accessible like a mobile app.

Some features allow partial offline access to the content, making it possible to view it later without an internet connection. Users can download content details (text, photos, maps) from their detail pages for offline access.

It is also possible to display your GPS location on the map.

## Data

The application interacts directly with the data from a Geotrek-admin instance, querying its API dynamically. See the [demo server API](https://geotrekdemo.ecrins-parcnational.fr/api/v2/).

It queries API routes, which return objects from the Geotrek-admin database based on the requested parameters and information.
[Here is an example](https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?language=fr&page_size=10&page=1&practices=4&fields=id%2Cdeparture%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cattachments%2Cpractice%2Cdeparture_city) of a route returning the first 10 treks in French for practice 4 (trekking) for the search page.

This optimizes data loading to only what is necessary, improving performance. Data modifications made in Geotrek-admin are also instantly reflected on the Geotrek-rando portal.

A single Geotrek-admin instance can feed multiple Geotrek-rando portals with partially or completely different content, depending on the target portals assigned to different objects (treks, tourist content, events, and static pages).
To do this, one or more portal IDs can be defined in the global configuration of a Geotrek-rando instance, along with the URL of the Geotrek-admin to query.

## Customization

Various aspects of the portal and its content can be customized:

- Colors, logo, images, portal name
- Different texts
- Displayed filters and their values
- Available languages
- Translations
- Footer content
- The map, its center, and the used basemaps.

See the [customization section](./customization/customization-introduction.md) for more details.

## SEO

Work has been done to optimize the SEO of the portal's content. 
A server-side rendering (SSR) of the pages is implemented to optimize and pre-generate the pages returned to search engines (using NextJS).

A list of all the portal pages is automatically generated to facilitate their indexing by search engines. It is available at the address "URL-OF-THE-PORTAL/sitemap.xml".

It is also possible to define redirection rules, particularly to optimize the transition from Geotrek-rando v2 to Geotrek-rando v3.
