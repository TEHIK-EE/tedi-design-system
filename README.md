# React Shared Libraries

Usage:

- Add the following line to your package.json
  - `@tehik:registry=https://repo.tehik.ee/artifactory/api/npm/tehik-npm-release/`
- Afterwards follow the directions described in [here](https://repo.tehik.ee/ui/repos/tree/General/tehik-npm-release) under "Set Me Up"
- Add `import @tehik/react-components/style.css` to your root, \_app.tsx
- Add any necessary providers around your app, like LabelProvider and StyleProvider
- Use the components: `import { Button } from '@tehik/react-components'`

## Development

TODO:

- CI jobs
- Gitlab rules
- Commit rules (Breaking changes etc.)
- Who oversees changes, how is everything shared across projects
- Publishing (auto-publish on main probably)
- Setting up storybook on a public? URL

- debugging
  - `npm run build`
  - `cd dist/packages/components && npm link`
  - In target project:
    - `npm link @tehik/react-components --save`

Future ideas:

- Publishing every component separately
- More tests
- ...
