# Media and manifest.json management

## Images, favicon, mobile phone icons and splashscreens

These files need to be in the correct folder during the build process and therefore, we created a specific `medias` folder in the customization repository.

It provides 6 default images that can be customized:

- `android-icon.png`: It has to be 144x144px and controls the icon appearing on Android phones
- `maskable-icon.png`: It hass to be 144x144px and will be used only on android phones enabling round icons (it will hence be cropped to fit a circle by the android phones)
- `apple-icon.png`: It has to be 144x144px and controls the icon appearing on iOS phones
- `android-splashscreen.png`: It has to be 512x512px and controls the splashscreen appearing on Android phones
- `ios-splashscreen.png`: It has to be 512x512px and controls the splashscreen appearing on iOS phones
- `favicon.png`: It will be used as the favicon in web browsers

You can also add images and other files in the `medias` folder to be used as logo, images in HTML parts and static pages. They will be available on `url-geotrek-rando/medias/image-name.jpg` and can be linked as `/medias/image-name.jpg`.

## Media size and weight recommendations

### Images

Photos used in Geotrek-rando, especially in carousels, should follow a few best practices to ensure good display quality and optimized loading times:

- **Resizing**: prefer landscape images with a standard aspect ratio between **4:3 and 16:9** (ideally **16:9** for carousels to avoid cropping or distortion).

- **File format**: it is recommended to convert **PNG** images to **JPG** to reduce file size, except when transparency is required.

- **Maximum file size**: each image should not exceed **500 KB**, while maintaining good visual quality (find the right balance depending on usage context).

### Videos

For the header video on the homepage:

- **Dimensions**: recommended width of approximately **1500 px**, with a **16:9** aspect ratio.

- **Maximum file size**: the video should not exceed **6 MB** to prevent slow loading times.

- **Optimization**: use video compression tools with minimal visible quality loss, such as:

    - [Handbrake](https://handbrake.fr/)
    - [FFmpeg](https://ffmpeg.org/)

## Manifest.json

There is a default `manifest.json` generated using the `applicationName` parameters of `global.json` and icons/images detailed in the next section below (See [example](https://github.com/GeotrekCE/Geotrek-rando-v3/blob/main/frontend/src/pages/manifest.json.tsx#L20)).

You can complete it by creating `manifest.json` file in the `customization/config/` folder and filling it with the props to add and/or override.