# React Shared Libraries

Usage:

- Add `"@tehik/react-components": "gitlab-registry-url-somewhere"`to your package.json
  - TODO Or maybe .npmrc?, have to look into it
- Add `import @tehik/react-components/main.scss` to your root, \_app.tsx or something along those lines
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
    - Afterrr

Future ideas:

- Publishing every component separately
- ...
