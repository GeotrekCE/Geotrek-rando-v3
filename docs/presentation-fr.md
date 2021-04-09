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

La page de recherche permet de rechercher des objets parmis les randonnées et les services (contenus touristiques).

**Filtres :**

- Il est possible de sélectionner une ou plusieurs activités de randonnée et une ou plusieurs catégories de service.
- Si je ne sélectionne aucune activité de randonnée et aucune catégorie de service, alors j'affiche tous les objets
- La première ligne de filtre est fixe et comprend les filtres communs à tous les objets (thèmes, communes, secteurs et structures)
- Si je sélectionne uniquement des activités de randonnée, alors les filtres spécifiques aux randonnées sont aussi affichés (difficulté, durée, longueur, dénivelé, type de parcours et accessibilité)
- Si je sélectionne uniquement une seule catégories de service, alors les filtres spécifiques à cette catégorie sont affichés (type 1 et éventuel type 2)
- Il est possible de customiser, masquer ou réordonner les filtres

**Résultats :**

- Tous les résultats d'une recherche sont affichés sur la carte
- Dans la liste, les résultats sont affichés 10 par 10 pour optimiser le temps de chargement des résultats
- Les points proches sur la carte sont regroupés dans des clusters selon le niveau de zoom
- Quand on clique sur un objet sur la carte, on en affiche le nom et l'image dans une tooltip
- Si il s'agit d'une randonnée, on affiche aussi son tracé précis sur la carte quand on clique dessus
- Au survol d'un résultat dans la liste, sa localisation est mise en avant sur la carte
- Les résultats dans la liste et sur la carte permettent d'accéder à la fiche détail de chaque objet

**A venir :**

- Ajout des évènements touristiques
- Ajout des sites outdoor
- Amélioration de l'ergonomie des filtres

## Page détail

Chaque objet dispose d'une page de détail avec ses informations détaillées et sa carte.

### Randonnées

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-05-detail.jpg)

Photo, infos techniques, description, patrimoines

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-06-detail.jpg)

Etapes

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-07-detail.jpg)

Patrimoines

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-08-detail.jpg)

Description

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-09-detail.jpg)

Lieux de renseignement

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-10-detail.jpg)

Services à proximité

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-11-detail.jpg)

### Itinérances

Idem mais avec fiche séjour et ses étapes, puis la navigation entre les fiches des différentes étapes.

Ne pas publier une étape pour qu'elle n'apparaisse pas dans la recherche mais seulement dans les étapes d'une itinérance.

IMG

### Contenus touristiques

Fiche simplifiée

### A venir

- Ajout d'informations sur la carte (services, lieux de renseignement, signalétique et aménagements)
- Ajout des pages détail des évènements touristiques
- Ajout des pages détail des sites outdoor
- Amélioration des informations affichées sur les cartes en version mobile

## Pages statiques

## Version mobile

IMG

La consultation du portail sur un appareil mobile a été optimisée pour être adaptée aux petits écrans et aux interactions tactiles.

## Customisation

- Classes des filtres
- Textes
- Couleurs, logo, titre

## Autres

Valeurs filtres et listes en cache

SSR

- Rendu côté serveur (Server Side Rendering / SSR) pour optimiser et prégénérer les pages renvoyées aux moteurs de recherche, avec NextJS

SEO

- Title et description dans les meta
- Optimisation des pages et analyse avec Google Search Console

Sitemaps
Robots.txt

HTTPS
