## Quick start

Useful commands:

- `npm install` to install dependencies

- `npm run start` to start a local dev-server

- `npm run build` to build a minified version of the code, for production use!

- `npm run dev` to use a development server which will take care of live-reloading and browser sync.

- `npm run test` to launch tests in watch mode

- `npm run e2e` to launch cypress end-to-end tests (after ```npm run dev```)

- * `npm run generate` to generate a new component or a new page. You will be prompted the following questions:

  * Do you want a page or a component?
  * What is the name of the component?
  * What is the type of the component? _Choose between [PureComponents](https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81), Components and stateless functions for your React component._
  * Do you want to connect your component to the Redux store? _Use Redux to handle your global state._
  * Do you want to use react-intl? _Use [react-intl](https://github.com/yahoo/react-intl/wiki/Components) to handle the translations within your application._
  * Do you want to use styled-components? _Use [styled-components](https://github.com/styled-components/styled-components) to easily style your components using a CSS syntax._
  * Do you want snapshot tests? _Snapshot tests allow you to easily lock the comportment of a component.


Other useful commands:

- `npm run lint:fix` to automatically fix linting errors

- `npm run test:coverage` to generate the coverage

For more see [create-react-app documentation](https://github.com/facebookincubator/create-react-app)
