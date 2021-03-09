# Changelog

3.0.0 (unreleased)
------------------

* Full redesign and rewriting of Geotrek-rando with React and NextJS (for PWA, SSR and SEO)
* Directly connected to Geotrek-admin API, no more using Geotrek-admin synchronization
* Requires Geotrek-admin 2.51.1 minimun, reachable in https
* Requires Docker to be installed

**🚀 New features**

* Redesign of main pages (Home, Search, Details, Informations)
* Mobile first with a dedicated mobile responsive design
* Rewriting with modern frameworks (React and NextJS)
* Search engine optimisation (SEO) with Server side rendering (SSR)
* Dynamic sitemap generation for SEO
* Progressive web app (PWA) to be able to install the web application on a phone, including some offline contents
* Multilingual
* Optimized API calls with cache on some contents (such as filters values, cities...)
* Customizable homepage template
* Simple deployment and customization
* Search into treks or touristic contents with their common or specific filters

**⚠️ Release notes**

* To upgrade to this version, you will have to do a new installation of Geotrek-rando with Docker
* The installation process of Geotrek-rando v3 is independant from your eventual version 2 of Geotrek-rando

1.x and 2.x
-----------

See the repository dedicated to versions 1 and 2 of Geotrek-rando: https://github.com/GeotrekCE/Geotrek-rando
