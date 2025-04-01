# Themes and styles

## Colors

You can override colors in `customization/theme/colors.json` file to change the main colors, based on [tailwing default theme](https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/tailwind.config.js).

Example for Cevennes national park orange colors:

```json
{
  "primary1": {
    "DEFAULT": "#ff9100",
    "light": "#ffa032"
  },
  "primary3": "#d57b04"
}
```

It's also possible to change category colors :

```json
{
  "categories": {
    "trek": "blue",
    "events": "red",
    "outdoor": "#62AB41",
    "service": "#3B89A2"
  }
}
```
!!! note

    If global config `groupTreksAndOutdoorFilters` is set to `true`, the `outdoor` color is ignored in favor of the `trek` color.

## CSS

You can override CSS in `customization/theme/style.css` file. To help overriding CSS, some ID have been added on main DIV components:

- `home_content`, `home_activitiesBar`, `home_topHtml`, `home_section`, `home_activitySuggestion`, `banner_carousel`, etc on Homepage
- `header_logo` in Header
- Several similar ID on search and detail pages
- `home_container` to isolate Home page
- `search_container` to isolate Search page
- `details_container` to isolate detail pages
- `flatPage_container` to isolate static flatpages

In addition, some classes prefixed with `custo-*` are gradually being added to facilitate style overrides for components.

The font used is `Source sans 3`. If you wish to replace it, you must modify the
dedicated `--font-main` variable in the custom properties.  
For example, if you want to use the `arial` typeface, put the following code in
`customization/theme/style.css`.

```css
:root {
  --font-main: arial;
  font-size-adjust: 0.5; /* Arial is bigger than Source sans 3 */
}
```

!!! note
    
    **Explanations and differents styling for the main menu**

    - The default requirements to use this feature are :

        - [**Geotrek Rando 3.19.0**](https://github.com/GeotrekCE/Geotrek-rando-v3/releases/tag/v3.19.0)
        - connected to a [**Geotrek Admin 2.104.0**](https://github.com/GeotrekCE/Geotrek-admin/releases/tag/2.104.0)

    - Since Geotrek Admin 2.104.0, you can define complex menu items. 

    - If a submenu contains **fewer than 5 items**, or if **none of the items** in a submenu **contains an image**, the drop-down menu takes on the appearance of a **"small" menu**, if not the **"large" menu**. 

    **Small Menu**

    It looks just like the old one (i.e. before version 3.19.0) and you shouldn't have to override the style. 
    But you can always use the `.custo-menu-*` classes to do so. 

    ![image](https://github.com/GeotrekCE/Geotrek-rando-v3/assets/1926041/d1c6ae17-a09e-43f6-b146-9fa6d9bc818f)

    **Large Menu**

    To manage this complex menu, styles and elements are added to play with customization.
    Please note that links in submenus are sorted into 2 groups: links without images (`custo-menu-group--without-imgs`) and links with images (`.custo-menu-group--with-imgs`). 

    <ins>Default style<ins>

    ![image](https://github.com/GeotrekCE/Geotrek-rando-v3/assets/1926041/b1f6a4d1-eb48-4273-8ccb-27630d66b5dc)

    <ins>Example to balance photos<ins>

    If you have more photos to display and want to balance the structure, you can for example add these selectors to your `customization/theme/style.css`.

    ![image](https://github.com/GeotrekCE/Geotrek-rando-v3/assets/1926041/18ff34f3-9383-4859-9f85-576a8f3807ca)

    ```css
    .custo-menu-sub-menu {
      align-items: start;
    }
    .custo-menu-sub-menu .custo-menu-group--with-imgs {
      flex-direction: row;
      flex-wrap: wrap;
      width: 430px;
    }
    .custo-menu-sub-menu .custo-menu-group--with-imgs a {
      flex-basis: 200px;
    }

    ```

    <ins>Example for submenus taking up the entire width of the screen<ins>

    ![image](https://github.com/GeotrekCE/Geotrek-rando-v3/assets/1926041/375f1d26-bed3-4708-a992-99625ee4b291)

    ```css
    .custo-menu-item-wrapper {
      position: static;
    }
    .custo-menu-sub-menu {
      top: 100%;
      padding: 1rem 2rem;
    }
    /* Display links as row */
    .custo-menu-group {
      flex-direction: row;
    }
    ```

