Vite build pipeline doesn't allow separate [asset files](https://vitejs.dev/config/build-options.html#build-assetsinlinelimit) during library build.
Currently, they get bundled in code (JS, CSS) and when we have lots of fonts, then the outputted CSS is huge.

The only way to not inline font files is to put them in public folder and to make sure they can't be found during build time.
For storybook the assets should be absolute urls. For component library they should be relative.

Affected files are \_icons.scss, \_fonts.scss. Fonts folder in src/public and build script in package.json

### To update material-symbols font files:

- download the font files from the following urls
  - https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0.1,0
  - https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0.1,0
  - https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@24,400,0.1,0
    - 24 stands for the font size in px
    - 400 stands for the font weight (only 'normal' is supported)
    - 0.1 means that both regular and filled icons are included
    - 0 is for grade (not used)
    - https://fonts.google.com/icons
    - keep in mind that while it is possible to extend these parameters, each added value increases the size of the font file -> slower loading times
- rename the downloaded files and copy them to src/public/fonts

### To update roboto font files:

In most cases this is never needed. Unless we want to add support for new weights or styles.

- download the font files from the following url
  - https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap
- rename each of the files to match the weight and style of the font. Example `roboto-v30-latin-ext-300-italic.woff2`
- add or update the @font-face in the `/src/styles/_fonts.scss`
- make sure the font is rendered correctly in the https://disainipesa-react.tehik.ee/?path=/story/components-typography-text--font-variants story

https://github.com/vitejs/vite/issues/4454
https://github.com/vitejs/vite/issues/3295
