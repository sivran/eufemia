---
title: 'Deployment'
order: 4
icon: 'getting_started'
status: 'wip'
---

# Deployment

Publishing new versions to the NPM Package (`@dnb/eufemia`) is handled by a Deploy Server.

## How to create a local package

Run `yarn build:pack` inside `/dnb-eufemia` and you get this file: `/build/dnb-eufemia-v0.0.0-development`.

## CI Structure

Actually, both the Portal (`dnb-design-system-portal`) and the NPM Package (`@dnb/eufemia`) are deployed and build by a Continuous Integration (CI) Server.

Once you push your branch `feat/your-feature` (or what ever) to remote **origin**, all tests will be run against your latest pushes.

Merges from a Pull Request and other pushes to the development branch `origin/main`, will trigger a **test build** of the Portal. This way me make sure that a new Portal version can be build, before we actually publish a new build.

### The Release Branch

Make sure you only make Pull Request from `origin/main` into `origin/release`.
The Release Branch is more kind of a **secondary branch**. It reflects the latest version, but is actually only used to publish new versions and to make builds for the Portal.

**TODO:** GitFlow and CI structure graphics

### Steps to follow

The steps, from code changes to production builds are:

1. Make your changes and write tests and test the codebase
1. Update eventually snapshots (`yarn test:update`)
1. Commit your changes with the correct **[message decoration](/contribute/commit)**
1. Push or make a Pull Request to the `origin/main` branch
1. Wait until the CI Server has validated the commits
1. Make a [Pull Request](https://github.com/dnbexperience/eufemia/compare/release...main?expand=1)
1. Once the Pull Request will be approved by one of the authored [repo contributors](https://github.com/dnbexperience/eufemia/graphs/contributors),
1. The CI Server will deploy the Portal and NPM builds

### NPM Library

These folders/files will be a part of the NPM [package](https://unpkg.com/@dnb/eufemia@latest/):

- /assets
- /components
- /elements
- /extensions
- /fragments
- /icons
- /style
- /cjs
- /es
- /esm
- /umd
- /shared
- web-components.js
- lib.js
- index.js
- package.json

#### Important aspects

- PropTypes are getting wrapped with [this babel plugin](babel-plugin-transform-react-remove-prop-types)) `process.env.NODE_ENV !== "production"`. This way applications in production, will not include `propTypes`. If a component depends to check `propTypes` during runtime, consider to export them, so they not getting removed – or simply use `defaultProps` for the operation.
- As for now, we use React Class Components, because there may happen the case, where two React instances are used, and that does not work with Hooks. Also performance is a key factor. But we may consider a rewrite at some point of time.

## Portal Changes

## Update Content only

In case you make changes **not** related to [/uilib](/uilib) pages, you don't have to run the build process for sure. Simply commit your changes. But make sure the Markdown is formatted correctly by using Prettier.

You can either do changes directly on GitHub with a fork of the Repository, or you can clone the repository locally on your computer and make changes there.

### Local build

In case you have to create a local static build of the portal website (for various reasons), you can do so by:

```bash
# In the `dnb-design-system-portal` directory, run:
$ yarn build
```

The build will be exported to the `/public` directory. You can now also run a local static server to view it at the given port [localhost:8000](http://localhost:8000/):

```bash
# In the `dnb-design-system-portal` directory, run:
$ yarn serve
```

### Run Algolia search queries locally

In order to commit Algolia search queries to the `dev_eufemia_docs` index, you have to:

Create a `.env` file inside `dnb-design-system-portal` with valid:

- `ALGOLIA_INDEX_NAME=dev_eufemia_docs`
- `ALGOLIA_APP_ID=SLD6KEYMQ9`
- `ALGOLIA_API_KEY=secret`

In order to make faster local builds, you can:

- Inside `gatsby-config.js` rename all sourcing from `/docs` to `/docs_dummy`

Run `yarn workspace dnb-design-system-portal build`
