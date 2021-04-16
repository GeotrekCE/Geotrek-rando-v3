# Présentation

Geotrek-rando v3 est une PWA (Progressive Web App) permettant de mettre en ligne un portail web adapté aux différentes tailles d'écran, dont ceux des appareils mobiles (responsive design).
Une PWA est aussi installable sur un appareil mobile directement depuis le navigateur (sans passer par les magasins d'applications Android, Apple et autres) et permet alors une expérience mobile enrichie, avec notamment du contenu disponible hors-ligne.

Voir https://fr.wikipedia.org/wiki/Progressive_web_app pour en savoir plus sur les PWA.

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

La page de recherche permet de rechercher des objets parmis les randonnées et les services (contenus touristiques).

![Search](https://geotrek.ecrins-parcnational.fr/images/gtr3-04-search.jpg)

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

Les pages de détail sont composées d'un bloc d'information scrollable à droite et d'une carte fixe à gauche, ainsi que d'un bloc fixe vertical permettant de naviguer entre les sections de la page.

### Randonnées

Les pages de détail des randonnées commencent par la (ou les) photo(s) associées à la randonnée, ainsi que les boutons permettant de la télécharger au format PDF, KML ou GPX.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-05-detail.jpg)

Ensuite sont affichées les informations techniques de la randonnée (thèmes, difficulté, durée, dénivelé,...), suivis du résumé (chapeau) et du texte général d'ambiance.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-06-detail.jpg)

Si la randonnée est une itinérance, sont alors affichées la liste de ses étapes. Elles sont alors aussi affichés sur la carte.
Au survol d'une étape dans la liste, celle-ci est mise en avant sur la carte. 
Au clic sur une étape, on accède alors à sa fiche.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-07-detail.jpg)

C'est ensuite la liste des patrimoines qui est affichée, avec leurs localisations sur la carte.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-08-detail.jpg)

Vient ensuite la description technique avec les éventuelles puces rouges de localisation correspondantes sur la carte. 
Ainsi que le profil altimétrique interactif avec la carte, puis les recommandations.

Si le module "Zones de sensibilité" est activé et si la randonnée intersecte une ou plusieurs zones zones de sensibilité, alors celles-ci sont affichées après les recommandations.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-09-detail.jpg)

Sont ensuite affichés les lieux de renseignement associés à la randonnée (pas encore localisés sur la carte).

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-10-detail.jpg)

La page détail d'une randonnée se termine par la liste des services (contenus touristiques) à proximité.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-11-detail.jpg)

### Contenus touristiques

Les pages de détail des contenus touristiques sont construits de la même manière, mais avec un contenu plus simple.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-12-detail.jpg)

### A venir

- Ajout d'informations sur la carte (services, lieux de renseignement, signalétique et aménagements)
- Ajout des pages détail des évènements touristiques
- Ajout des pages détail des sites outdoor
- Amélioration des informations affichées sur les cartes en version mobile

## Pages statiques

Les pages statiques d'informations sont accessibles depuis le menu principal du header.

Il est possible d'afficher jusqu'à 3 liens vers les 3 premières pages statiques, les suivantes étant accessibles dans le menu "En savoir plus".

Les pages statiques sont composées d'un titre, d'une image principale optionnelle, puis d'un contenu HTML composé de texte, images, liens et éventuels autres médias (vidéos...).

![Information](https://geotrek.ecrins-parcnational.fr/images/gtr3-13-information.jpg)

## Version mobile

La consultation du portail sur un appareil mobile a été optimisée pour être adaptée aux petits écrans et aux interactions tactiles.

Chaque page a ainsi été adaptée pour proposer un affichage adapté aux différentes tailles d'écran.

![Mobile](https://geotrek.ecrins-parcnational.fr/images/gtr3-14-mobile.png)

Le portail web étant une PWA, quand il est consulté avec un smartphone, un message s'affiche en bas de l'écran, invitant l'utilisateur à l'ajouter à son écran d'accueil.
Un raccourci sera alors créé sur le bureau du smartphone, et il sera alors possible de consulter le contenu comme dans une application mobile.

Des premières fonctionnalités ont été développées pour embarquer une partie du contenu en offline, et ainsi pouvoir le consulter ultérieurement sans connexion internet.
Les dernières randonnées consultées et leurs fonds de carte peuvent ainsi être consultées offline.
Voir la [documentation sur la gestion du cache](./knowledge/caching.md) pour en savoir plus.

## Données

L'application interagit directement avec les données présentes dans une instance de Geotrek-admin, en interrogeant dynamiquement son API. 
Exemple de l'API du serveur de démonstration : https://geotrekdemo.ecrins-parcnational.fr/api/v2/.

Pour cela, elle interroge des routes de l'API qui renvoient les objets de la base de données de Geotrek-admin en fonction des paramètres et informations demandées.
Exemple de la route renvoyant les 10 premières randonnées publiées en français de la pratique 4 (pédestre) pour la page de recherche : https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?language=fr&page_size=10&page=1&practices=4&fields=id%2Cdeparture%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cattachments%2Cpractice%2Cdeparture_city

Cela permet d'optimiser les chargements de données au strict nécessaire et ainsi d'améliorer les performances.
Les modifications de données réalisées sur Geotrek-admin sont aussi repercutées instantanément sur le portail Geotrek-rando.

Un Geotrek-admin peut alimenter plusieurs portails Geotrek-rando avec des contenus partiellement ou complètement différents, en fonction des portails cibles attribués aux différents objets (randonnées, contenus et évènements touristiques, et pages statiques).
Pour cela, un ou plusieurs identifiants de portail peuvent être définis dans la configuration globale d'une instance de Geotrek-rando, en plus de l'URL du Geotrek-admin qu'elle doit interroger.

## Customisation

Différents éléments de l'aspect du portail et de son contenu peuvent être customisés :

- Les couleurs, le logo, les images, le nom du portail
- Les différents textes
- Les filtres affichés et leurs valeurs
- Les langues disponibles
- Les traductions
- Le contenu du pied de page (footer)
- La carte, son centrage, les fonds utilisés.

Voir la [documentation sur la customisation](customization.md) pour en savoir plus.

## Référencement

Un travail a été réalisé pour optimiser le référencement des contenus du portail. 
Un rendu côté serveur (Server Side Rendering / SSR) des pages est réalisé pour optimiser et prégénérer les pages renvoyées aux moteurs de recherche (avec NextJS).

Une liste de toutes les pages du portail est générée automatiquement pour faciliter leur indexation dans les moteurs de recherche. Elle est disponible à l'adresse "URL-DU-PORTAIL/sitemap.xml".
