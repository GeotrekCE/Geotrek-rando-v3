# Présentation

Geotrek-rando v3 est une PWA (Progressive Web App) permettant de mettre en ligne un portail web adapté aux différentes tailles d'écran, dont ceux des appareils mobiles (responsive design).
Une PWA est aussi installable sur un appareil mobile directement depuis le navigateur (sans passer par les magasins d'applications Android, Apple et autres) et permet alors une expérience mobile enrichie, avec notamment du contenu disponible hors-ligne.

Voir https://fr.wikipedia.org/wiki/Progressive_web_app pour en savoir plus sur les PWA.

## Données

L'application interagit directement avec les données présentes dans une instance de Geotrek-admin, en interrogeant dynamiquement son API. 
Exemple de l'API du serveur de démonstration : https://geotrekdemo.ecrins-parcnational.fr/api/v2/.

Pour cela, elle interroge des routes de l'API qui renvoient les objets de la base de données de Geotrek-admin en fonction des paramètres et informations demandées.
Exemple de la route renvoyant les 10 premières randonnées publiées en français de la pratique 4 (pédestre) pour la page de recherche : https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?language=fr&page_size=10&page=1&practices=4&fields=id%2Cdeparture%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cattachments%2Cpractice%2Cdeparture_city

Cela permet d'optimiser les chargements de données au strict nécessaire et ainsi d'améliorer les performances.
Les modifications de données réalisées sur Geotrek-admin sont aussi repercutées instantanément sur le portail Geotrek-rando.

Un Geotrek-admin peut alimenter plusieurs portails Geotrek-rando avec des contenus partiellement ou complètement différents, en fonction des portails cibles attribués aux différents objets (randonnées, contenus et évènements touristiques, et pages statiques).
Pour cela, un ou plusieurs identifiants de portail peuvent être définis dans la configuration globale d'une instance de Geotrek-rando, en plus de l'URL du Geotrek-admin qu'elle doit interroger.

## Page d'accueil

La page d'accueil est composée : 

- d'un bandeau horizontal (header) avec :
   - un logo et un nom de portail paramétrables
   - les liens vers les pages statiques dans l'ordre défini dans Geotrek-admin et un paramètre pour en afficher de 0 à 3 au premier niveau, les suivantes étant sous forme de liste dans "En savoir plus"
   - un selecteur de langue pour basculer entre celles disponibles
   - un lien permanent vers la page de recherche
- d'une grande image paramétrable, avec un texte d'introduction paramétrable et masquable
- de la liste des pratiques de randonnées puis des catégories de contenus touristiques sous forme de pictogramme cliquables dans l'ordre défini dans Geotrek-admin

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-01-homepage.jpg)

- d'une zone HTML entièrement paramétrables avec textes, images et liens souhaités
- d'une zone permettant de mettre en avant un ou plusieurs blocs de randonnées renvoyant vers leurs pages de détail
- d'une seconde zone HTML entièrement paramétrables avec textes, images et liens souhaités

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-02-homepage.jpg)

- d'un pied de page (footer) paramétrable avec 
   - un bloc de liens vers les réseaux sociaux de la structure
   - des informations de contact de la structure
   - des liens complémentaires

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-03-homepage.jpg)

## Page recherche

![Search](https://geotrek.ecrins-parcnational.fr/images/gtr3-04-search.jpg)

**A venir :**

- Ajout des évènements touristiques
- Ajout des sites outdoor
- Amélioration de l'ergonomie des filtres
- Recherche libre

## Page détail

### Randonnées

### Itinérances

### Contenus touristiques

### A venir

- Ajout d'informations sur la carte (services, lieux de renseignement, signalétique et aménagements)
- Ajout des pages détail des évènements touristiques
- Ajout des pages détail des sites outdoor
- Amélioration des informations affichées sur les cartes en version mobile

## Version mobile

Valeurs filtres et listes en cache

SSR

SEO

Sitemaps
Robots.txt

HTTPS
