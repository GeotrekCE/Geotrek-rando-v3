<h1 align="center">Geotrek-rando</h1>

<p align="center"><img alt="geotrek rando image" src="/docs/img/geotrek-rando.png"></p>

<p align="center">
<a href="https://geotrek-rando-v3.readthedocs.io/" rel="nofollow"><img alt="Documentation" src="https://img.shields.io/badge/Documentation-green.svg" style="max-width:100%;"></a>
<a href="https://gtr3demo.ecrins-parcnational.fr/" rel="nofollow"><img alt="Geotrek Rando demo by Ecrins National Park" src="https://img.shields.io/badge/Demo-PN Ecrins-orange.svg" style="max-width:100%;"></a>
<a href="https://demo-rando.geotrek.fr/" rel="nofollow"><img alt="Geotrek Rando demo" src="https://img.shields.io/badge/Demo-purple.svg" style="max-width:100%;"></a>
<a href="https://matrix.to/#/%23geotrek:matrix.org" rel="nofollow"><img alt="Chat Matrix" src="https://img.shields.io/badge/Chat-blue.svg" style="max-width:100%;"></a>
<a href="https://groups.google.com/g/geotrek-fr" rel="nofollow"><img alt="Forum Google Group" src="https://img.shields.io/badge/Forum-brightgreen.svg" style="max-width:100%;"></a>
</p>
<p align="center">
<a href="https://github.com/GeotrekCE/Geotrek-rando-v3/releases/latest" rel="nofollow"><img alt="Release" src="https://img.shields.io/github/release/GeotrekCE/Geotrek-rando-v3.svg" style="max-width:100%;"></a>
<a href="https://github.com/GeotrekCE/Geotrek-rando-v3/actions/workflows/e2e.yml" rel="nofollow"><img alt="Status Test E2E" src="https://github.com/geotrekce/Geotrek-rando-v3/actions/workflows/e2e.yml/badge.svg" style="max-width:100%;"></a>
<a href="https://github.com/GeotrekCE/Geotrek-rando-v3/actions/workflows/e2e.yml" rel="nofollow"><img alt="Status Test E2E" src="https://github.com/geotrekce/Geotrek-rando-v3/actions/workflows/action-intall-and-test.yml/badge.svg" style="max-width:100%;"></a>
<a href="https://github.com/GeotrekCE/Geotrek-rando-v3/actions/workflows/e2e.yml" rel="nofollow"><img alt="Status Test E2E" src="https://github.com/geotrekce/Geotrek-rando-v3/actions/workflows/release.yml/badge.svg" style="max-width:100%;"></a>
</p>

<p align="center">
    <a href="#website"><b>Website</b></a>  •  
    <a href="#features"><b>Features</b></a>  •  
    <a href="#admin-documentation"><b>Admin documentation</b></a>  •  
    <a href="#developer-documentation"><b>Developer documentation</b></a>  •  
</p>
<p align="center">
    <a href="#architecture-decision-record"><b>Architecture decision record </b></a>  •  
    <a href="#support"><b>Support</b></a>  •   
    <a href="#contribution"><b>Contribution</b></a>  •  
    <a href="#thanks-to-all-contributors-"><b>Contributors</b></a>  •  
    <a href="#license"><b>License</b></a>  • 
</p>

![Search](/docs/img/home_ecrins.png)

## Website

Geotrek-rando is the public web application displaying the interface you can use to value your territory treks and tourism products! 
You can find two demonstration websites at the following links:
- [https://gtr3demo.ecrins-parcnational.fr](https://gtr3demo.ecrins-parcnational.fr)
- [https://demo-rando.geotrek.fr/](https://demo-rando.geotrek.fr)

The third version is a full redesign and rewriting of Geotrek-rando with React, and NextJS for Server side rendering (SSR) and SEO.

Geotrek-rando is directly connected to Geotrek-admin v2 API.

Read more in the [general presentation (french)](https://geotrek-rando-v3.readthedocs.io/latest/presentation-fr/).

### Examples of Geotrek-rando portals

- Promoting outdoor activities: [Escapade62](https://www.escapade62.fr/)
- Exploring the Écrins National Park: [Destination Écrins](https://destination.ecrins-parcnational.fr/)
- Discover Mediterranean treks, throught land and sea: [Destination Port-Cros](https://destination.portcros-parcnational.fr/)
- Walks and hikes in the PACA region: [Chemins des Parcs](https://www.cheminsdesparcs.fr/)

![Search](/docs/img/portails.jpg)

Discover more users close to your place by going onto the [user map](https://geotrek.fr/utilisateurs.html).

For a full list of known rando-based applications, visit the [Geotrek applications list](https://github.com/GeotrekCE/Geotrek-website/wiki/Liste-des-Geotrek-connus).

## Features

Discover Geotrek-Rando's top features, designed to elevate outdoor exploration with dynamic maps, detailed treks info, and offline accessibility—all in a customizable, mobile-friendly interface : 

- **Responsive PWA** interface with offline access
- **Customizable** homepage
- **Advanced search** with filters and **interactive map**
- **Detailed information** on each trek, outdoor activities, touristic services and events
- **Download options** (PDF, GPX, KML)
- **Static pages** for general info
- **Interactive mapping** with elevation profiles
- **API integration** with Geotrek-Admin for real-time data
- **Design and content customization** (theme, colors, maps)
- **SEO optimization** with server-side rendering.

## Admin documentation

- [Production setup](https://geotrek-rando-v3.readthedocs.io/latest/installation/)
- [Customization](https://geotrek-rando-v3.readthedocs.io/latest/customization/customization-introduction/)

## Developer documentation

- [Development setup](https://geotrek-rando-v3.readthedocs.io/latest/development/installation/)
- [Deployment](https://geotrek-rando-v3.readthedocs.io/latest/development/deployment/)

## Architecture decision record 

- [Main framework](https://geotrek-rando-v3.readthedocs.io/latest/adrs/main_framework/)
- [Deployment solution](https://geotrek-rando-v3.readthedocs.io/latest/adrs/deployment_solution/)

## Support

- To report bugs or suggest features, please [submit a ticket](https://github.com/GeotrekCE/Geotrek-rando-v3/issues).
- Join our community to stay updated and share your experience! Connect on [Matrix](https://matrix.to/#/%23geotrek:matrix.org) for real-time discussions, or connect through the [Google Group](https://groups.google.com/g/geotrek-fr) to exchange ideas and insights.

## Contribution

Interested in contributing? See our [Contributing Guide](https://geotrek-rando-v3.readthedocs.io/latest/development/contributing/). You can help in many ways, the ability to code is not necessary.

## Thanks to all contributors ❤

<a href="https://github.com/GeotrekCE/Geotrek-rando-v3/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=GeotrekCE/Geotrek-rando-v3" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## License

This project is under the MIT License. See the [LICENSE](https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/LICENSE) for details.

<a href="https://territoires.makina-corpus.com/"><img src="https://geotrek.fr/assets/img/logo_makina.svg" alt="Logo MCT" width="115"></a>
[![](https://geotrek.fr/assets/img/logo_autonomens-h120m.png)](https://datatheca.com/)

