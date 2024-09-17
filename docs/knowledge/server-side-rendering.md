## Server side rendering

Using Next, we can query data during three lifecycles:

- At build time to get static files
- On the server side whenever a route is called
- On the client side to react to user actions

The client side data querying works the same way any spa would query data.

For the server side querying, we need to declare a `getServerSideProps` function at the page level, Next will automatically understand it has to execute it before sending the page to the client.

As we use Sagas, there is also a little action that needs to be remembered, in these getServerSideProps we need to tell Redux to wait for all the fired sagas to be over before considering the `getServerSideProps` can return. To do so we use the following pattern:

```ts
export const getServerSideProps = appWrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(
      getTreksList.server.request({ language: "fr", page: 1, page_size: 10 })
    );
    store.dispatch(
      getPOIList.server.request({ language: "fr", page: 1, page_size: 10 })
    );
    store.dispatch(END); // Here we dispatch the END action
    await (store as ReduxSagaStore<typeof store>).sagaTask.toPromise(); // Then we are able to await for all the registered sagas to be over.
    return;
  }
);
```

Keep in mind that everything returned by the getServerSideProps function will be available as props, but we don't need it as we use selectors from Redux.

References:

- https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
- https://github.com/kirill-konshin/next-redux-wrapper
- https://github.com/kirill-konshin/next-redux-wrapper#usage-with-redux-saga
- https://github.com/vercel/next.js/tree/canary/examples/with-redux-saga
