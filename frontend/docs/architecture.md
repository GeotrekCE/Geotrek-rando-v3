## Frontend Architecture

After creating an app, it should look something like:

```
.
├── README.md
├── components
│   ├── head.js
│   └── nav.js
├── next.config.mjs
├── node_modules
│   ├── [...]
├── package.json
├── pages
│   └── index.js
├── static
│   └── favicon.ico
└── package-lock.json
```

The project is structured as follows:

- `src/components`: In the components directory, you will find React components. Some of them are reusable pieces of the application (such as a button), but others are directly main pages.

- `src/pages`: The pages directory contains your Application Views and Routes. Next reads all the files inside this directory and creates the application router. So for example, a `login.tsx` file in this folder will result in a `/login` route serving this component.

If you want to know more about the next architecture, visit this [website](https://nextjs.org/docs).
