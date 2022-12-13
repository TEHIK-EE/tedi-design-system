Vite build pipeline doesn't allow separate [asset files](https://vitejs.dev/config/build-options.html#build-assetsinlinelimit) during library build.
Currently they get bundled in code (JS, CSS) and when we have lots of fonts, then the outputted CSS is huge.

The only way to not inline font files is to put them in public folder and to make sure they can't be found during build time.
For storybook the assets should be absolute urls. For component library they should be relative.

Affected files are \_icons.scss, \_fonts.scss. Fonts folder in src/public and build script in package.json

When we want to use the latest icons, we have to manually update material-symbols font files in public/fonts folder. They can be copy/pasted from node_modules/material-symbols after that package has been updated.

https://github.com/vitejs/vite/issues/4454
https://github.com/vitejs/vite/issues/3295
