# GDPR

## GDPR

### Privacy policy link

To be GDPR compliant, you must have a page describing the privacy policy.  
It can be an internal or external page. And you can define its link in the `privacyPolicyLink` key in `global.json`.  
Bear in mind that if this key is not defined, the consent modal will not be displayed and **no script will be executed**.

### Third-party scripts

Some scripts require the user's consent before being executed.  
To control their execution, additional attributes must be added.

The script below will not be executed until the user has given his consent.  
The attributes `type`, `data-type`, `data-name` are mandatory to tell the app how to handle them.  
If you link to an external script you need to replace the `src` attribute by `data-src`.  
More information in the [Orejime documentation](https://github.com/empreinte-digitale/orejime/#third-party-script-tags-change)).

Other attributes are optionals:

- `data-title` is the readable name dislayed to the user. If not defined, the value of `data-name` is displayed.
- `data-purposes` informs the user to which category(ies) this script belongs. "ads", "analytics", and "security" are available, you can add more by completing the translations (search `consents.modal.purposes`). NB: you can define more than one purpose by separating them with a coma (for example `data-purposes="ads,analytics"`)
- `data-cookies` String containing a comma-delimited regexp expression (without `/` delimiters) giving the names of the cookies set by the third-party script. If the user withdraws consent for a given third-party, the app will automatically delete all corresponding cookies.

```html
<script
  type="opt-in"
  data-type="application/javascript"
  data-title="Google Tag Manager"
  data-name="google-tag-manager"
  data-purposes="analytics"
  data-cookies="^_ga,^_gat,^_gid,^__utma,^__utmb,^__utmc,^__utmt,^__utmz"
  data-src="https://www.googletagmanager.com/gtag/js?id=<GOOGLE_ANALYTICS_ID>"
></script>
```

To rely several scripts with the same consent, you need to match their `type`, `data-type`, `data-name` values, the others won't be read.

```html
<script
  type="opt-in"
  data-type="application/javascript"
  data-name="google-tag-manager"
>
  // Call the analytics Google Tag Manager tracking script
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '<GOOGLE_ANALYTICS_ID>');
</script>
```

You can now add an additional script to send each visited page to the server.

```html
<script
  type="opt-in"
  data-type="application/javascript"
  data-name="google-tag-manager"
>
  // Send visit on each dynamic page change
  window.next.router.events.on('routeChangeComplete', function(url) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    })
  });
</script>
```

As we saw earlier, this script should only be executed with the user's consent. But once the `routeChangeComplete` is attached, the script continues to be executed at every page change, even if the user suddenly withdraws consent.

To avoid this, one solution is to check the user's acceptance in the cookies.

```diff
<script
  type="opt-in"
  data-type="application/javascript"
  data-name="google-tag-manager"
>
  // Send visit on each dynamic page change
  window.next.router.events.on('routeChangeComplete', function(url) {
+   (function(allowsGTMCookies) {
+     // Tell Google if it can use the service
+     window['ga-disable-<GOOGLE_ANALYTICS_ID>'] = !allowsGTMCookies;
+      if (allowsGTMCookies) {
        window.dataLayer.push({
          event: "pageview",
          page: url,
        })
+     }
+   // Check the user's acceptance of "google-tag-manager" in the cookies
+   })(JSON.parse(new URLSearchParams(document.cookie.replaceAll('; ', '&')).get('orejime') ?? null)?.["google-tag-manager"]);
  });
</script>
```

## Simple alerts

!!! warning

    - When setting up Google Analytics, you have to setup a flow. When setting up the flow, be careful to enter the corresponding url (the url of your website), otherwise the data will not be received.
    - By default Google analytics is disabled (`googleAnalyticsId` set to `null`), you will have to override it in the `global.json` file of your customization folder.


### Modal consent

On the user's first visit, if there are at least one `type="opt-in"` script and there is no saved cookie of the user's preferance, the consent modal is displayed.  
Once the user has made his choice, it is no longer displayed.

If the user wished to modify his consent, a "Change cookie preference" button is located in the footer's app. If there is no third-party script, this button is not displayed.  
It's also possible te define a button anywhere in a [custom HTML template](./customization-htmlscripts.md). You need to define a `button` tag with `data-trigger-consent-modal` attribute.

For example:

```html
<button
  data-trigger-consent-modal
  type="button"
  class="flex py-2 px-4 border border-solid border-primary1 rounded-lg text-sm text-primary1 bg-white font-semibold transition transition-color hover:bg-primary2 focus:bg-primary2"
>
  Change cookie preference
</button>
```

And like the button in the footer, if there is no third-party script, this button is not displayed.
