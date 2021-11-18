---
title: 'Getting started'
icon: 'tools'
order: 3
status: 'wip'
---

# Getting started

You are now ready to get started. Here you will find a step-by-step guide to making changes in the Eufemia repo.
If you are new to the repository, check out [what I should know before getting started](/contribute/first-contribution#what-should-i-know-before-getting-started).

**Skip to step**:

1. [Get the repository on your local computer](/contribute/getting-started#1-get-the-repo-on-your-local-computer)
1. [Install dependencies](/contribute/getting-started#2-install-the-dependencies)
1. [Making changes](/contribute/getting-started#3-get-started-on-making-new-components-elements-and-extensions)
1. [Make and run tests](/contribute/getting-started#4-make-and-run-tests)
1. (Optional): [Update the EUFEMIA_CHANGELOG.md with your changes](/contribute/getting-started#5-update-change-logs)
1. [Commit your change and create a Pull Request](/contribute/getting-started#6-commit-changes)

## 1. Get the repo on your local computer

Locate the repo: [Eufemia on GitHub](https://github.com/dnbexperience/eufemia).

If you don't have commit access;

- Create a Fork.
- Make your changes in your Fork and create a _Pull Request_ back to the Eufemia repo and `origin/main`.
- Watch the result of the tests.

If you have commit access;

- Make a new branch.
- Make your changes and commit it to the repo.
- Make a _Pull Request_ to `origin/main`.
- Watch the result of the tests.

## 2. Install the dependencies

```bash
yarn install
```

## 3. Get started on making new Components, Elements and Extensions

Make a new working branch and name it e.g. `fix/my-branch-name` or `feat/my-feature-name`.

```bash
# Make a Feature branch
$ git checkout -b feat/my-feature
```

Inside `./packages/dnb-eufemia` you will find the directory `/src/components`, `/src/elements` or `/src/extensions`. There you can place a new directory with all the necessary sub folders. As a reference, take a look how the other _components_, _elements_ and _extensions_ are set up.

### Create a local build

Next, we need to create a local build (prebuild) by using `yarn build` again.

Running the build command will walk thought all parts and tie together all needed parts in order to generate valid build bundles.

```bash
$ yarn build
```

You find the output in the `./packages/dnb-eufemia/build` folder.

### Documentation

All components hare their own directory inside:

- `./packages/dnb-design-system-portal/src/docs/uilib/...`

You may have a look at existing docs in order to get the right structure.

### Additional support

#### Locale support

Put your translation inside: `./packages/dnb-eufemia/src/shared/locales/nb-NO.js` as well as to the `en-GB.js` file:

```js
export default {
  'nb-NO': {
    MyComponent: {
      myString: '...',
    },
  },
}
```

And use it as so:

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'

const defaultProps = {
  myString: null, // can be null, as we get our default from the translation file
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { myString } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
    defaultProps,
    context.getTranslation(props).MyComponent // details below 👇
    // ...
  )

  // Use myString ...
}
```

The function `getTranslation` will along with the properties will support both `locale` and the HTML `lang` attribute. This way, these properties can be set by a component basis and a context basis.

#### Provider support

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'

const defaultProps = {
  myParam: null,
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { myParam, ...rest } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
    defaultProps,
    context.MyComponent
    // ...
  )

  // Use myParam and spead the ...rest
}
```

#### Spacing support

It depends from case to case on how you would make [spacing](https://eufemia.dnb.no/uilib/components/space) support available. But you may always give the developer to send in the spacing properties to the very root element of your component.

```tsx
import { Context } from '../../shared'
import classnames from 'classnames'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import {
  spacingPropTypes, // In case you need them as PropTypes
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  SpaceProps, // TypeScript type
  createSpacingClasses,
} from '../space/Space'

interface MyComponentProps extends SpaceProps {
  myParam: string
}

const defaultProps = {
  myParam: null,
}

function MyComponent(props: MyComponentProps) {
  const context = React.useContext(Context)

  const { myParam, className, ...rest } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
    defaultProps
    // ...
  )

  // This helper will remove e.g. all spacing properties so you get only valid HTML attributes
  validateDOMAttributes(props, rest)

  // This helper will add needed spacing css classes based on the given properties
  rest.className = classnames(
    'dnb-my-component',
    createSpacingClasses(props),
    className
  )

  // Spead the ...rest on your root element
}
```

#### Skeleton support

It depends from case to case on how you would make skeleton support available. There are also more info on how to create a [custom skeleton](https://eufemia.dnb.no/uilib/components/skeleton#create-custom-skeleton). But in case your component supports the `skeleton` boolean property, then you may ensure it both can be set locally on the component, and it reacts on the global Context.

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

const defaultProps = {
  skeleton: null,
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { skeleton, className, ...rest } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
    defaultProps,
    { skeleton: context?.skeleton }
    // ...
  )

  // This helper will add some needed HTML attributes like "disabled", "aria-disabled" and "aria-label"
  skeletonDOMAttributes(rest, skeleton, context)

  // This helper will add needed skeleton css classes in order to create a custom skeleton
  rest.className = createSkeletonClass(
    'shape',
    skeleton,
    context,
    className
  )

  // Use skeleton and spead the ...rest
}
```

### Styling, css and scss of components

Use the same sass setup as all the other components. You may re-use all the [helper classes](https://eufemia.dnb.no/uilib/helpers/classes):

- `./packages/dnb-eufemia/src/style/core/utilities.scss`
- `./packages/dnb-eufemia/src/style/core/properties.scss`

## 4. Make and run tests

1. Run the integration tests: `yarn test` – you may need to update changed snapshots: `yarn test:update`
1. Start the portal: `yarn workspace dnb-design-system-portal start`
1. Run the visual test against it: `yarn test:screenshots`
1. Check the result / reports, located in: `open ./packages/dnb-eufemia/jest-screenshot-report/index.html`
1. Update eventually new or valid PNG snapshots by running: `yarn test:screenshots:update`

## 5. Update change logs

Changes to `@dnb/eufemia` have to be mentioned by using a [git commit messages decoration](/contribute/commit#commit-messages). During next release, a `CHANGELOG.md` file will be generated and changes will get listed on the [GitHub Releases](https://github.com/dnbexperience/eufemia/releases) page.

General Eufemia **Design System** changes have to be written down in the `EUFEMIA_CHANGELOG.md` file, located in the repository root.

## 6. Commit changes

1. [Commit your change](/contribute/commit) and create a Pull Request to the `origin/main` branch.
