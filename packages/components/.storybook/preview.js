import React from 'react';

import StorybookDecorator from './storybook-decorator';

import '../src/styles/index.scss';
import '../src/styles/storybook.scss';
import 'what-input';

export const parameters = {
  viewMode: 'docs',
  backgrounds: {
    default: 'default',
    values: [
      { name: 'default', value: '#ffffff' },
      { name: 'light', value: '#f0f0f2' },
      { name: 'dark', value: '#8f91a8' },
      { name: 'black', value: '#000000' },
    ],
  },
};

export const decorators = [
  (Story, options) => {
    // prevent LabelProvider for label story, because it sets its own provider
    return options.componentId === 'components-labelprovider' ? (
      <Story />
    ) : (
      <StorybookDecorator>
        <Story />
      </StorybookDecorator>
    );
  },
];

// Hacky way of clicking on Docs button on first load of page.
// https://github.com/storybookjs/storybook/issues/13128
function clickDocsButtonOnFirstLoad() {
  window.removeEventListener('load', clickDocsButtonOnFirstLoad);

  try {
    const docsButtonSelector = window.parent.document.evaluate(
      // eslint-disable-next-line quotes
      "//button[contains(., 'Docs')]",
      window.parent.document,
      null,
      XPathResult.ANY_TYPE,
      null
    );

    const button = docsButtonSelector.iterateNext();

    button.click();
  } catch (error) {
    // Do nothing if it wasn't able to click on Docs button.
  }
}

window.addEventListener('load', clickDocsButtonOnFirstLoad);
