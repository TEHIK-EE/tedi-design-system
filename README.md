test fork

# React Shared Libraries

Usage of tehik scope packages:

- Add the following line to your `.npmrc`
  - `@tehik:registry=https://repo.tehik.ee/artifactory/api/npm/tehik-npm-release/`
- Afterwards follow the directions described in [here](https://repo.tehik.ee/ui/repos/tree/General/tehik-npm-release) under "Set Me Up"

Steps to use `@tehik/react-components` are described [here](https://disainipesa-react.tehik.ee/?path=/docs/documentation-get-started--get-started).

## Naming conventions

- interactive/click events are prefixed by `on`, for example `onClick`
- boolean values are prefixed by `is`, for example `isMenuVisible`

## Development

### Publishing

- Creating a merge-request trigger pipelines that have to succeed before merge
- When merging a pull-request to master, automatic deploy and versioning will be triggered
- Using semantic-versioning new version will be generated using commits and published to registry
- Changelog is generated and new code is deployed to storybook

### Skipping new version

To skip new version on commit use `docs` or `chore` prefix in commits. For example `docs(storybook): Fix storybook visual styles`,
this ensures new version is not generated, but deploy to storybook is still made. (Use for changes that are not important for end users)

### Commit rules (Breaking changes etc.)

To provide correct changelog we have to follow [conventional-changelog-standard](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).
Check the link for more instructions

TODO:

- CI jobs
- Gitlab rules
- Who oversees changes, how is everything shared across projects

- debugging
  - `npm run build`
  - `cd dist && npm link`
  - In target project:
    - `npm link @tehik/react-components`

Future ideas:

- Publishing every component separately
- More tests
- ...
