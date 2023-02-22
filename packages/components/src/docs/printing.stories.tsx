import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import { VerticalSpacing } from '../components/vertical-spacing';

export default {
  title: 'Documentation/Printing',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>Components have a built-in styles for printing</Subtitle>
          <VerticalSpacing>
            <ul>
              <li>Text color and some components are converted into grayscale</li>
              <li>Most background colors are set to white</li>
              <li>Base font size is 14px and all other font sizes and spacing is adjusted accordingly</li>
              <li>Some component are hidden by default (Buttons, Anchors, Header, Footer, Breadcrumbs, Sidenav)</li>
              <li>Expandable components are open by default (Accordion, Collapse, Table subRow/subComponent)</li>
              <li>
                Prevent page break in some components (Placeholder, Table rows). Rest of the page break locations should
                be defined in the app using <code>{'<Print>'}</code> component.
                <p>
                  <strong>NB!</strong>{' '}
                  <i>
                    Page break does not work in Firefox.{' '}
                    <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1807406" target="_blank" rel="noreferrer">
                      Bug 1
                    </a>
                    ,{' '}
                    <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1695475" target="_blank" rel="noreferrer">
                      Bug 2
                    </a>
                    ,{' '}
                    <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=939897" target="_blank" rel="noreferrer">
                      Bug 3
                    </a>
                  </i>
                </p>
              </li>
              <li>
                Tables are printed by default. Every table should be reviewed case by case. When table does not fit
                horizontally we have a scrollbar. This means that tables with many columns might not fit in the print
                view.
              </li>
            </ul>
            <p>
              <strong>UI can be adjusted using the following methods:</strong>
            </p>
            <h3>
              <code>{'<Print>'}</code> component
            </h3>
            <p>
              Preferred method. <a href="/?path=/docs/components-print--default">More info here</a>
            </p>
            <h3>Hooks</h3>
            <ul>
              <li>
                <code>const isPrinting = usePrint()</code> - Checks if <code>window.matchMedia(print)</code> matches.
                Useful when you want to conditionally re-render UI during printing.
              </li>
            </ul>
            <h3>Utility classes</h3>
            <p>
              <strong>
                NB! Only use utility classes when usage of <code>{'<Print>'}</code> component is not possible.
              </strong>
            </p>
            <ul>
              <li>
                <code>no-print</code> - Hide component from print view
              </li>
              <li>
                <code>show-print</code> - Can be used to show components in print view, that are hidden by default
              </li>
              <li>
                <span>
                  Determine where page breaks during printing. Value can be <code>auto</code>, <code>avoid</code>,{' '}
                  <code>avoid-column</code>, <code>avoid-page</code>, <code>avoid-region</code>
                </span>
                <ul>
                  <li>
                    <code>break-before-{'{value}'}</code> - How page, column, or region breaks should behave{' '}
                    <b>before</b> a generated box
                  </li>
                  <li>
                    <code>break-after-{'{value}'}</code> - How page, column, or region breaks should behave <b>after</b>{' '}
                    a generated box
                  </li>
                  <li>
                    <code>break-inside-{'{value}'}</code> - How page, column, or region breaks should behave{' '}
                    <b>inside</b> a generated box
                  </li>
                </ul>
              </li>
            </ul>
          </VerticalSpacing>
        </>
      ),
    },
  },
} as Meta;

export const Printing = () => <span>test</span>;
