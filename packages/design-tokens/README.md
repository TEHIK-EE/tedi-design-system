# Design-tokens

This libray export main scss tokens used inside Design System.
Tokens main source of truth is tokens.json file. Where every design-system token is kept.

To generate new css variables run `npm run generate-variables` inside design-tokens folder.

Tokens are kept inside json file to make them more convertable to other resources and remove the need to copy them.
For example usage inside Storybook stories.
