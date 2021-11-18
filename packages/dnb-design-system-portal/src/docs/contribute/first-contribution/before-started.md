---
title: 'Before getting started'
---

# What you should know before getting started

The library exists of React components. The newer components are written as functional components, with [React hooks](https://reactjs.org/docs/hooks-intro.html). This was added to React version 16.8 and have become the new standard of React.

Files in the library were first written in JavaScript using [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) to define component types. For newer components we adopt using [TypeScript](https://www.typescriptlang.org/), substituting the use of PropTypes.

### Eufemia is a Mono Repository

The Eufemia repository is a mono repo consisting of the following workspaces:

- dnb-design-system-portal: Source code of the portal website - the website you are currently on.
- dnb-eufemia: Source code of the npm package - where all the components are located.
- dnb-eufemia-sandbox: A development sandbox for playing around with components (not deployed, only for development purposes).

### How Components are structured

Eufemia has a couple of common parts, so every component do behave consistent:

- [Locale](/uilib/usage/customisation/localization) support
- [Provider](/uilib/usage/customisation/provider) support for centralized property forwarding
- [Spacing](/uilib/components/space) support
- [Skeleton](/uilib/components/skeleton) support
- [FormRow](/uilib/components/form-row) / [FormSet](/uilib/components/form-set) / [FormLabel](/uilib/components/form-label) support if its a form component
- Automatic id generation and linking of HTML elements to enhance accessibility
- Handling of `aria-describedby` with `combineDescribedBy` etc.

How to add support for every one of these are explained in [Additional support - Getting started](/contribute/getting-started#additional-support).

### Configuration files

- `ncurc.json` is used to ignore certain dependencies during a dependency update made by [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).

### Run the Portal locally

```bash
$ yarn start
```

This will start the Portal. You can view the portal website by visiting [localhost:8000](http://localhost:8000/).

Content changes to both Markdown files and styles (SCSS) and code changes will be reflected immediately.

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

#### What happens in the build steps

During the build, a lot of various things will happen, like:

**Prebuild**

```bash
$ yarn build
```

- Assets are getting generated
- All index and lib files are getting generated
- All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)
- All SASS styles are validated and compiled (to support IE)
- All bundles gets minified
- Icons are getting converted

To use the local build, you can either run the portal, or use `yarn link` to link the package with a totally different project.

**Postbuild**

```bash
$ yarn workspace @dnb/eufemia postbuild:ci
```

- Assets are getting generated
- All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)
- UMD/ESM/ES/CJS bundles are getting generated
- TypdeScript definitions are getting generated

### Development

You can also use Storybook and create a new story dedicated to your new feature. Run `yarn dev` to start Storybook.
