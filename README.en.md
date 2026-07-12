# @navfolio/page-template

This is a custom page module template for Navfolio contributors. It shows how
to create a page module that can be consumed by `@navfolio/pages` and injected
as an Astro route.

简体中文文档见 [README.md](./README.md).

## Who This Is For

Start from this template when you want to add a new Navfolio page capability,
such as:

- Gallery
- Resume
- Links
- Uses
- Reading

## File Structure

```txt
src/
  index.ts
  routes/
    hello.astro
```

- `src/index.ts` exports the module factory `templatePageModule()`.
- `src/routes/hello.astro` is a minimal Astro route entrypoint declared by the
  module's `routes` field.

## Module Factory

The core template code:

```ts
export function templatePageModule(options = {}) {
  const route = options.route ?? '/hello-page';

  return {
    id: 'template',
    enabled: options.enabled,
    route,
    nav: {
      label: 'Hello',
      href: route,
    },
    collections: [],
    routes: [
      {
        entrypoint: new URL('./routes/hello.astro', import.meta.url),
        prerender: true,
      },
    ],
    scaffold: {
      command: 'hello',
      collection: 'template',
      directory: 'src/content/template',
      defaultExtension: 'md',
      template: 'article',
    },
  };
}
```

Field reference:

| Field | Description |
| --- | --- |
| `id` | Unique module id, such as `gallery` or `resume`. |
| `enabled` | Set to `false` to disable the module. |
| `route` | Default page route. |
| `nav` | Default navigation label and href. |
| `collections` | Content collection names required by the module. Leave empty if none are needed. |
| `routes` | Astro route entrypoints. |
| `scaffold` | Optional content scaffold configuration. |

## Use In Navfolio

After installing the package, register it in `navfolio.config.ts`:

```ts
import { pages } from '@navfolio/pages';
import { templatePageModule } from '@navfolio/page-template';
import { markdownPlugin } from '@navfolio/plugin-markdown';

import { defineNavfolioConfig } from './src/plugins/config';

export default defineNavfolioConfig({
  plugins: [markdownPlugin(), pages()],
  modules: [
    templatePageModule({
      route: '/hello',
    }),
  ],
});
```

To show it in the top navigation, reference the module in `site.toml`:

```toml
[[config.topNav.links]]
label = "Hello"
module = "template"
```

## Content Scaffolding

If the module declares `scaffold`, Navfolio's generic content script can use it:

```bash
bun run content:new -- hello first-note
```

This creates `src/content/template/first-note.md`.

## Development Steps

1. Rename the package in `package.json`.
2. Rename `templatePageModule()`, change `id`, the default `route`, and
   `nav.label`.
3. Replace `src/routes/hello.astro` with your own page.
4. If your module needs content collections, fill in `collections` and provide a
   matching schema in the host project.
5. Build the package:

```bash
bun install
bun run build
```

## Design Notes

- A page module should expose a clear configuration entry point.
- Do not require users to edit private files inside the host template.
- Page routes, content directories, and scaffold commands belong in module
  config.
- Page copy and navigation order can stay in `site.toml`.
- If your module needs complex components, keep them inside the package and
  avoid importing private host-project paths.
