# Media and manifest.json management

## Images, favicon, mobile phone icons and splashscreens

These files need to be in the correct folder during the build process and therefore, we created a specific `medias` folder in the customization repository.

It provides 6 default images that can be customized:

- android-icon.png: It has to be 144x144px and controls the icon appearing on Android phones
- maskable-icon.png: It hass to be 144x144px and will be used only on android phones enabling round icons (it will hence be cropped to fit a circle by the android phones)
- apple-icon.png: It has to be 144x144px and controls the icon appearing on iOS phones
- android-splashscreen.png: It has to be 512x512px and controls the splashscreen appearing on Android phones
- ios-splashscreen.png: It has to be 512x512px and controls the splashscreen appearing on iOS phones
- favicon.png: It will be used as the favicon in web browsers

You can also add images and other files in the `medias` folder to be used as logo, images in HTML parts and static pages. They will be available on "url-geotrek-rando/medias/image-name.jpg" and can be linked as "/medias/image-name.jpg".

## Manifest.json

There is a default `manifest.json` generated using the `applicationName` parameters of `global.json` and icons/images detailed in the next section below (See [example](https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/src/pages/manifest.json.tsx#L20)).
You can complete it by creating `manifest.json` file in the `customization/config/` folder and filling it with the props to add and/or override.

