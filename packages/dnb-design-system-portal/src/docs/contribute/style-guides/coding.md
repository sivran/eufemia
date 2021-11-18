---
title: 'Code guide'
order: 1
---

# Code guide

## Recommended Tools

- Use [React Testing Library](https://testing-library.com) when possible, even Enzyme is still used in existing components.
- Use [Volta](https://volta.sh/) for [Node.js](https://nodejs.org/) version handling.

## Naming

The DNB Design System Eufemia uses the following naming conventions.

**Formatting styles**

- **pascal case** also known as _upper camel case_. Every word upper case. Example: `PascalCase`
- **camel case** also known as _lower camel case_. First word lower case. Example: `camelCase`
- **kebab case** also known as _kebab case_. Only lower case letters. Example: `kebab-case`
- **snake case**. Only lower case letters. Example: `snake_case`

## React components

- React Components, both as files and as components use **pascal case**.
- The folder containing the component uses **kebab case**.

## Web components

- Web components use **kebab case**.
- They are prefixed with: `dnb-`

## CSS / SCSS

- CSS classes and the files containing the styles use **kebab case**.
- CSS classes are prefixed with: `dnb-`
- CSS `Custom Properties` (CSS Variables) use **kebab case**.
- SCSS Mixins use **camel case**.

## Javascript

- `Functions` and `Variables` use **camel case**.
- `Classes` use **pascal case**.
- Other Javascript files use **kebab case**.

## Events and Properties

- Event names use **camel case**.
- They have to describe what they are aiming to do. Like: `onClick`

**NB:** Existing components use **snake case** (`on_click`) – but you are free to use **camel case**.

## Icons

- Icon names use **snake case**.
- They have to describe what they are aiming to meant for. Like: `chevron_right`
- Sizes are added as a postfix. Like: `chevron_right_medium`
- Only alphabetic characters (a to z) without special chars, due to import statements.
- Figma icon naming has to match the same (icon archive) as they will define the import names.
- Figma page and frame names (icon archive) do have to consist the same, due to the automated import mechanism.

## Documentation

- `Pages` and directories use **kebab case**.

---

## Why `snake_case` property naming

The decision to use `snake_case` was made to not just adopt React terms (`camelCase`), because we wanted to be open for future changes in the front end world.

But also the technical limitation that **Web Components** do not support `camelCase` made us more confident to use another case style.

HTML attributes uses `kebab-case`, so we needed something between.

The aspect to distinguish between case styles will also make code easier to read and support future code changes and refactoring.

```jsx
<Component aria-hidden="true" myReactProp={...} on_click={...} />
```

_Update:_ Eufemia does not need to support **Web Components** anymore. That makes it possible to use **camel case** for React Component Properties.

## TypeScript Types

As of now, the TypeScript types are mainly generated during the package build step on the CI.

### About the build process

The two main purposes of delivering TypeScript types are:

- Inline property documentation
- Property validation and type safety

While the documentation, including the property tables, have to be kept in Markdown Tables, they get extracted, parsed and inserted in the type definition files.

### Manual type definitions

If a `*.d.ts` file is included in the source code, it will not be overwritten. But the documentation part about property types will still be inserted during the build.

### Sharing PropTypes between components

There are a couple of components doing so. You may have a look at:

- `Input` and `InputMasked`
- `Icon` and `IconPrimary`
- Also the `SpacingHelper` shares `spacingPropTypes` with almost every component

So – You can share PropTypes between files. But you may have to spread the objects, instead of only referencing them.

**NB:** Make sure you include `*PropType` in the variable name. This also effects references inside a single file.

### Shared Properties docs

If you have one `/properties.md` file, but e.g. two components shares most or all of the properties. Like a component and a provider for that component (Accordion and AccordionProvider) – then you can define in the markdown table header name both of the components: You can then provide a second table with more specific table for a second component.

```md
### Properties

| Accordion and AccordionProvider Properties  | Description                                                           |
| ------------------------------------------- | --------------------------------------------------------------------- |
| `id`                                        | _(optional)_ docs.                                                    |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported. |

| AccordionProvider Properties | Description                    |
| ---------------------------- | ------------------------------ |
| `expanded_id`                | _(optional)_ expanded_id docs. |
```

### Local development

You can either run `yarn build:types` to generate type for all files, or use `yarn build:types:dev` to only build a certain and custom defined amount of files. Have a look at the `const isOfInterest = ...` part in `generateTypes.js`.
