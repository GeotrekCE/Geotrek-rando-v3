# Présentation

Geotrek-rando est une PWA (`Progressive Web App`) permettant de mettre en ligne un portail web adapté aux différentes tailles d'écran, dont ceux des appareils mobiles (responsive design).
Une PWA est aussi installable sur un appareil mobile directement depuis le navigateur (sans passer par les magasins d'applications Android, Apple et autres) et permet alors une expérience mobile enrichie, avec notamment du contenu disponible hors-ligne.

Cliquer sur [ce lien](https://fr.wikipedia.org/wiki/Progressive_web_app) pour en savoir plus sur les PWA.

## Page d'accueil

La page d'accueil est composée : 

- d'un bandeau horizontal (header) avec :
   - un logo et un nom de portail paramétrables
   - les liens vers les pages statiques dans l'ordre défini dans Geotrek-admin et un paramètre pour en afficher de 0 à 3 au premier niveau, les suivantes étant sous forme de liste dans "En savoir plus"
   - un selecteur de langue pour basculer entre celles disponibles
   - un lien permanent vers la page de recherche
- d'une grande image, d'une série d'images ou d'une vidéo paramétrables, avec un texte d'introduction paramétrable et masquable
- de la liste des pratiques de randonnées, des pratiques Outdoor, des catégories de contenus touristiques et des catégories d'événements (selon les contenus publiés) sous forme de pictogramme cliquables dans l'ordre défini dans Geotrek-admin

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-01-homepage.jpg)

- d'une zone HTML entièrement paramétrables avec textes, images et liens souhaités
- d'une zone permettant de mettre en avant un ou plusieurs blocs de randonnées, de sites outdoor, de services ou d'événements renvoyant vers leurs pages de détail
- d'une seconde zone HTML entièrement paramétrables avec textes, images et liens souhaités

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-02-homepage.jpg)

- d'un pied de page (footer) paramétrable avec 
   - un bloc de liens vers les réseaux sociaux de la structure
   - des informations de contact de la structure
   - des liens complémentaires

![Homepage](https://geotrek.ecrins-parcnational.fr/images/gtr3-03-homepage.jpg)

## Page recherche

La page de recherche permet de rechercher des objets parmis les randonnées, les sites Outdoor, les services (contenus touristiques) et les événements touristiques.

![Search](https://geotrek.ecrins-parcnational.fr/images/gtr3-04-search.jpg)

**Filtres :**

- il est possible de sélectionner une ou plusieurs pratiques de randonnée, une ou plusieurs pratiques Outdoor, une ou plusieurs catégories de service et une ou plusieurs catégories d'événements touristiques.
- si je ne sélectionne aucune pratique de randonnée, aucune pratique Outdoor, aucune catégorie de service et aucune catégorie d'événement, alors cela affiche tous les objets
- il est aussi possible d'utiliser les filtres communs à tous les objets (thèmes, communes, secteurs et structures)
- si je sélectionne des pratiques de randonnée, alors les filtres spécifiques aux randonnées sont affichés (difficulté, durée, longueur, dénivelé, type de parcours et accessibilité)
- si je sélectionne une catégories de service, alors les filtres spécifiques à cette catégorie sont affichés (type 1 et éventuel type 2)
- la zone de la carte affichée est aussi utilisée pour filtrer les résultats (fonctionnalités désactivable)
- il est possible de customiser, masquer ou réordonner les filtres

**Résultats :**

- tous les résultats d'une recherche sont affichés sur la carte
- dans la liste, les résultats sont affichés 10 par 10 pour optimiser le temps de chargement des résultats
- les points proches sur la carte sont regroupés dans des clusters selon le niveau de zoom
- quand on clique sur un objet sur la carte, on en affiche le nom et l'image dans une tooltip
- s'il s'agit d'une randonnée, on affiche aussi son tracé précis sur la carte quand on clique dessus
- au survol d'un résultat dans la liste, sa localisation est mise en avant sur la carte
- les résultats dans la liste et sur la carte permettent d'accéder à la fiche détail de chaque objet

## Page détail

Chaque objet dispose d'une page de détail avec ses informations détaillées et sa carte.

Les pages de détail sont composées d'un bloc d'information défilant à droite et d'une carte fixe à gauche, ainsi que d'un bloc fixe vertical permettant de naviguer entre les sections de la page.

### Fichiers attachés

Depuis la version **[3.20.0](https://github.com/GeotrekCE/Geotrek-rando-v3/releases/tag/v3.20.0)** de Geotrek-rando, il est désormais possible d'afficher des **documents associés** (aux POIs, itiénraires, contenus outdoor, contenus et évènements touristiques) dans les pages de détail des objets suivants :

- Itinéraires
- Contenus outdoor
- Contenus touristiques
- Événements touristiques

Cette fonctionnalité permet d’exposer **tous les fichiers attachés** qui ne sont **ni des images, ni des vidéos**, tels que des fichiers PDF, Word, Excel, etc.

[Exemple sur Rando Loire-Anjou-Touraine](https://rando-loireanjoutouraine.fr/trek/750-Au-coeur-du-Ridellois) :

![image](../img/attachmentfile.jpg)

#### Types de fichiers

| Type renvoyé par l’API | Comportement actuel dans Geotrek-rando |Format |
|------------------------|----------------------------------------|------|
| `image`                | Géré – affiché sous forme d’image      | `.png`, `.jpg`, `.jpeg`, etc.|
| `file`                 | Géré – affiché sous forme de lien      |`.pdf`, `.doc`, `.odt`, etc.|
| `video`                | Ignoré (pas de player intégré)         | |
| `audio`                | Ignoré (téléchargement uniquement)     ||

#### Limitations actuelles

- **Vidéos** : l’API renvoie un type `video`, mais aucun player n’est encore intégré côté frontend. Ces fichiers ne sont donc pas affichés.
- **Audios** : les fichiers audio ne sont pas différenciés du type générique `file`. Ils sont téléchargeables, mais **aucun player n’est proposé**. 

### Images HD 

Depuis la version **[3.18](https://github.com/GeotrekCE/Geotrek-rando-v3/releases/tag/v3.18.0)** de Geotrek-rando, il est possible d’afficher des **photos haute définition** (HD Views) dans les fiches détaillées des objets suivants :

- Itinéraires
- Sites et parcours outdoor

Cette fonctionnalité vise à **valoriser les points de vue remarquables** ou tout autre contenu visuel de haute qualité lié à un itinéraire ou un contenu outdoor. 

[Exemple sur Grand Tour des Écrins](https://www.grand-tour-ecrins.fr/trek/995327-Meije-Orientale-(3891-m)) :

![image](../img/hdview_detail.jpg)

<table><tr>
<td> <img src="../img/hdview1.jpg" alt="Carte avec bouton Image HD" style="width: 800px;"/> </td>
<td> <img src="../img/hdview2.jpg" alt="Image HD" style="width: 800px;"/> </td>
</tr></table>

#### Fonctionnement

- Si un objet contient au moins une image HD, un bouton **« Voir en image HD »** est proposé en bas de la carte de la fiche détaillée.
- Lorsqu’on clique sur ce bouton :
    - La carte est **remplacée par l’image HD** sélectionnée.
    - L’utilisateur peut **naviguer dans l’image** avec des fonctionnalités similaires à celles de la carte (zoom, déplacement).
  - Un bouton permet de **revenir à la carte** à tout moment.

#### Détails techniques

- Une **catégorie d’annotation** (libellé et pictogramme) peut être ajoutée aux images HD dans Geotre-admin.
- Les **annotations** peuvent être consultées via une infobulle (tooltip) lors du survol.

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
Puis un widget fourni par Météo France (désactivable) basé sur la commune de départ de la randonnée.
Ainsi que le profil altimétrique interactif avec la carte, puis les recommandations.

Si le module "Zones de sensibilité" est activé et si la randonnée intersecte une ou plusieurs zones zones de sensibilité, alors celles-ci sont affichées avant les recommandations.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-09-detail.jpg)

Sont ensuite affichés les lieux de renseignement associés à la randonnée, les accès routiers et en transport en commun, les éventuelles informations sur l'accessibilité aux personnes à mobilité réduite, les liens complémentaires et la source de la fiche.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-10-detail.jpg)

Vient ensuite le formulaire de signalement (désactivable) ainsi que l'éventuel widget de réservation pour les itinérances sur lesquels un identifiant de réservation est associé.
La page détail d'une randonnée se termine par la liste des services (contenus touristiques) à proximité.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-11-detail.jpg)

Il est aussi possible d'ajouter un bloc de contenu HTML ou javascript customisable sur toutes les pages du site.

Si des aménagements, signalétiques publiés ou "services" sont présents à proximité de la randonnées, alors ils sont affichables sur la carte de celle-ci.

### Sites outdoor

- on entre par le site principal de premier niveau
- si le site dispose d'un ou plusieurs sous-sites, alors ils sont listés dans la page
- les parcours du site ou de ses sous-sites sont aussi listés dans la page
- les randonnées à proximité du site sont aussi listés, pour identifier les accès au site

### Contenus touristiques

Les pages de détail des contenus touristiques sont construits de la même manière, mais avec un contenu plus simple.

![Detail](https://geotrek.ecrins-parcnational.fr/images/gtr3-12-detail.jpg)

### Evénements touristiques

Assez similaires aux contenus touristiques, mais avec plus de champs et des dates.

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
Il est ainsi possible d'embarquer le détail des contenus souhaités depuis leur fiche détail, pour y accéder sans connexion (textes, photos, cartes).

Il est aussi possible d'afficher sa localisation GPS sur la carte.

## Données

L'application interagit directement avec les données présentes dans une instance de Geotrek-admin, en interrogeant dynamiquement son API. 
Exemple de l'[API du serveur de démonstration](https://geotrekdemo.ecrins-parcnational.fr/api/v2/).

Pour cela, elle interroge des routes de l'API qui renvoient les objets de la base de données de Geotrek-admin en fonction des paramètres et informations demandées.
[Exemple de la route](https://geotrekdemo.ecrins-parcnational.fr/api/v2/trek/?language=fr&page_size=10&page=1&practices=4&fields=id%2Cdeparture%2Cname%2Cthemes%2Cduration%2Clength_2d%2Cascent%2Cdifficulty%2Creservation_system%2Cattachments%2Cpractice%2Cdeparture_city) renvoyant les 10 premières randonnées publiées en français de la pratique 4 (pédestre) pour la page de recherche.

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

Voir la [rubrique sur la customisation](./customization/customization-introduction.md) pour en savoir plus.

## Référencement

Un travail a été réalisé pour optimiser le référencement des contenus du portail. 
Un rendu côté serveur (Server Side Rendering / SSR) des pages est réalisé pour optimiser et prégénérer les pages renvoyées aux moteurs de recherche (avec NextJS).

Une liste de toutes les pages du portail est générée automatiquement pour faciliter leur indexation dans les moteurs de recherche. Elle est disponible à l'adresse `URL-DU-PORTAIL/sitemap.xml`.

Il est aussi possible de définir des règles de redirection, notamment pour optimiser le passage de Geotrek-rando v2 à Geotrek-rando v3.
