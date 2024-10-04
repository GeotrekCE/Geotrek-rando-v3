# Translation Customization

You can override every texts in [translations files](https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/frontend/src/translations), based on default ones.

You should at least override `home.title`, `home.description` and `home.welcome-text`.

Here is an example of overriding the `/customization/translations/en.json` file:

```json
{
  "header": {
    "home": "Welcome"
  },
  "home": {
    "title": "Hiking in nature",
    "description": "Discover the walks in the region",
    "welcome-text": "The eco-friendly digital guide to explore and share my local discoveries!"
  },
  "footer": {
    "geotrek": "Geotrek Application"
  },
  "report": {
    "title": "Report a problem or an error along the hike"
  },
}
```