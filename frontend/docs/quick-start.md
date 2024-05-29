## Quick start

Useful commands:

- `yarn` to install dependencies

- `yarn start` to start a local dev-server

- `yarn build` to build a minified version of the code, for production use!

- `yarn dev` to use a development server which will take care of live-reloading and browser sync.

- `yarn lint` to analyse source code to flag programming errors

- `yarn tsc` to compile the project defined by `tsconfig.json`

- `yarn test` to launch tests in watch mode

- `yarn e2e` to launch cypress end-to-end tests (after `yarn dev`)

- - `yarn generate` to generate a new component or a new page. You will be prompted the following questions:

  - Do you want a page or a component?
  - What is the name of the component?
  - What is the type of the component? _Choose between [PureComponents](https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81), Components and stateless functions for your React component._
  - Do you want to connect your component to the Redux store? _Use Redux to handle your global state._
  - Do you want to use react-intl? _Use [react-intl](https://github.com/yahoo/react-intl/wiki/Components) to handle the translations within your application._
  - Do you want snapshot tests? \_Snapshot tests allow you to easily lock the comportment of a component.

Other useful commands:

- `yarn lint:fix` to automatically fix linting errors

- `yarn test:coverage` to generate the coverage

- `yarn prepush` is a shortcut of `yarn lint && yarn tsc && yarn test`
