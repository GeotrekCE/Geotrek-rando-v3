# Caching

There are 2 caching strategies at work on this project.

## Service worker cache

The first one is the responsibility of the service worker. It handles the caching from the web browser of routes and urls that are called from the end user's machine. This is the mechanism allowing the site to be reached offline.

The configuration of this cache is handled in the `frontend/cache.js` file.
We use three different strategies here:

### Network First

This is the main strategy involved with offline support. We use it for the regular pages and API calls. The pages are always queried from the network unless it is unavailable.

When constantly unable to reach the network, these resources will appear as "stale" after a week.

![Network First Strategy](../assets/NetworkFirstStrategy.png)

### Stale While Revalidate

We use this strategy for static assets offered by our website that can eventually change but don't need to be always fresh.

They will appear as "stale" after a day.

![Stale While Revalidate Strategy](../assets/StaleWhileRevalidateStrategy.png)

### Cache First

We use this strategy for fonts provided by third parties like google that are extremely unlikely to change.

They will appear as "stale" after a year.

![Cache First Strategy](../assets/CacheFirstStrategy.png)

## Nodejs Application cache

The second one consist in storing the configuration data (activities list, theme list etc..) we get from geotrek admin into ephemeral variable to avoid a lot of API calls to get the same data.

This configuration will appear as "stale" after one day.

If you need to make it available immediately, you can restart your container which will clear the memory and force the refreshment of this configuration data.

![Server Memory Caching Strategy](../assets/ServerMemoryCachingStrategy.png)
