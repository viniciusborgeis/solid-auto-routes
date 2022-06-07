<p>
  <img width="100%" src="https://raw.githubusercontent.com/viniciusborgeis/solid-auto-routes/main/assets/banner.png" alt="Solid Vite Templates">
</p>

# Solid Auto Routes using (using [vite](https://vitejs.dev/))

> This plugin is an abstraction of the official library [solid-app-router](https://github.com/solidjs/solid-app-router), and all dependencies of the official plugin are required for this plugin to work.

This plugin was designed for the convenience of working with the definition of automatic routes, in the same way as frameworks like Next.js Nuxt.js, just define a provider around your application and call a hook

- [Get Started](#get-started)
  - [Set Up the Router](#set-up-the-router)

## Get started

### Set Up the Router

```sh
> npm i solid-app-router
```

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

In your `App` component import the Route hook from `app-auto-routes` and put inside your `App` element

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

> After setup the plugin, all other configuration use the oficial [solid-app-router](https://github.com/solidjs/solid-app-router) library

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

These templates are meant to be used as is via the [degit](https://github.com/Rich-Harris/degit) utility.

```bash
# Javascript template
$ npx degit solidjs/templates/js my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript template
$ npx degit solidjs/templates/ts my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript minimal template
$ npx degit solidjs/templates/ts-minimal my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript unocss template
$ npx degit solidjs/templates/ts-unocss my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript windicss template
$ npx degit solidjs/templates/ts-windicss my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript windicss template + basic file base routing
$ npx degit solidjs/templates/ts-router my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript bootstrap (5) template
$ npx degit solidjs/templates/ts-bootstrap my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript + tailwindcss template
$ npx degit solidjs/templates/ts-tailwindcss my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript + sass template
$ npx degit solidjs/templates/ts-sass my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Javascript template
$ npx degit solidjs/templates/js-vitest my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript + vitest template
$ npx degit solidjs/templates/ts-vitest my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

```bash
# Typescript + uvu template
$ npx degit solidjs/templates/ts-uvu my-solid-project
$ cd my-solid-project
$ npm install # or pnpm install or yarn install
```

## I don't see a template that matches my need?

You wish there was a template with your favorite library?

Feel free to make a pull request. Copy one of the template already available, tweak it, name it properly and make a PR. See [contributing](#contributing) below.

## Contributing

This project is managed with [pnpm](https://pnpm.io). You should [install it](https://pnpm.io/installation) first to test out your template or contribute to an existing one.

You can create your own template and prefix it with `ts-` or `js-` and giving it a name that describe the purpose.

To update all dependencies you can run:

`pnpm up -Lri`

## Troubleshooting

It appears that Webstorm generate some weird triggers when saving a file. In order to prevent that you can follow [this thread](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360000154544-I-m-having-a-huge-problem-with-Webstorm-and-react-hot-loader-) and disable the **"Safe Write"** option in **"Settings | Appearance & Behavior | System Settings"**.
