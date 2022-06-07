<p>
  <img width="100%" src="https://raw.githubusercontent.com/viniciusborgeis/solid-auto-routes/main/assets/banner.png" alt="Solid Vite Templates">
</p>

# Solid Auto Routes (using [vite](https://vitejs.dev/))

> This plugin is an abstraction of the official library [solid-app-router](https://github.com/solidjs/solid-app-router), and all dependencies of the official plugin are required for this plugin to work.

This plugin was designed for the convenience of working with the definition of automatic routes, in the same way as frameworks like Next.js Nuxt.js, just define a provider around your application and call a hook

- [Get Started](#get-started)
  - [Set Up Vite Configuration](#set-up-vite-config)
  - [Set Up the Router](#set-up-the-router)

> After setup the plugin, all other configuration use the oficial [solid-app-router](https://github.com/solidjs/solid-app-router) library, and the configuration guide its goin the same of the official repository

## Get started

```sh
> npm i solid-app-router
```

### Set Up Vite Config

In your `vite.config.ts` import a module `AutoRoutes` from `solid-auto-routes` put inside vite plugins array and passing the configuration as parameter

```jsx
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import AutoRoutes from "solid-auto-routes";

const AutoRoutesConfig = {
  pagePath: "./src/pages",
  errorPath: "./src/errors",
  homeComponentName: "home"
};

export default defineConfig({
  plugins: [solidPlugin(), AutoRoutes(AutoRoutesConfig)],
  build: {
    target: "esnext",
    polyfillDynamicImport: false
  }
});
```

**Configurations Parameters**

`pagePath`\*: is the path for your pages components </br>
`errorPath`: is the path for your pages error components, like 404.{tsx, jsx} </br>
`homeComponentName`: is the name of your home component, default is index.{tsx, jsx}

### Set Up the Router

Install `solid-app-router`, then wrap your root component with the Router component:

```jsx
import { render } from "solid-js/web";
import { Router } from "solid-app-router";
import App from "./App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("app")
);
```

This sets up a context so that we can display the routes anywhere in the app.

In your `App` component import the Route hook from `app-auto-routes` and put inside your `main` element

```tsx
import { Route } from "solid-auto-routes";

const App = () => {
  return (
    <>
      <main>
        <Route />
      </main>
    </>
  );
};

export default App;
```
