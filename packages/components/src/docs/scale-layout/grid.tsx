import { Title } from '@storybook/blocks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Col, Heading, Row, Separator, Table, VerticalSpacing } from '../../index';
import BreakingpointsTable from './breaking-points';

const Grid = () => {
  return (
    <VerticalSpacing size={2.5}>
      <VerticalSpacing>
        <Title>Grid system</Title>
        <p>
          Grids are fundamental to creating visually consistent, organized, and responsive designs. Grids help maintain
          order and structure across different pages, components, and devices.{' '}
        </p>
        <Row gutter={5}>
          <Col md={6}>
            <VerticalSpacing>
              <img alt="Visual example of 12-column grid" src="/layout/columns.svg" />
              <Heading element="h3">Columns</Heading>
              <p>
                Columns are vertical divisions within a container that provide a framework for organising and aligning
                content.
              </p>
              <p>
                We use a 12-column grid. For design purposes we can use 6col, 4col, 3col and 2 col grids, since they are
                easily translated to 12 column grid in development. Widths of the columns are fluid, meaning it is
                determined by the container size where the grid is placed (plus fixed width gutter).
              </p>
            </VerticalSpacing>
          </Col>
          <Col md={6}>
            <VerticalSpacing>
              <img alt="Visual example of gutters in grid" src="/layout/gutter.svg" />
              <Heading element="h3">Gutter</Heading>
              <p>
                Gutters are the gaps between the columns, created by horizontal padding. Gutters can be responsively
                adjusted.
              </p>
              <p>Gutter width is fixed. Gutter values that can be used: 24px (default) , 16px, 12px, 8px, 0px. </p>
              <p>
                Note that gutter size helps us utilise rule of proximity, meaning elements that are close together are
                perceived connected.
              </p>
            </VerticalSpacing>
          </Col>
          <Col md={6}>
            <VerticalSpacing>
              <img alt="Visual example of layout variatsions" src="/layout/layout-variatsions.svg" />
              <Heading element="h3">Layout variations</Heading>
              <div>
                12 columns grid is extremely adaptable and provides a lot of flexible combinations. For example content
                can be:
                <ul>
                  <li>utilising full container width;</li>
                  <li>divided into 2, 3, 4 and 6 columns;</li>
                  <li>divided into 2 columns of different width and create 1/3 layouts.</li>
                </ul>
              </div>
            </VerticalSpacing>
          </Col>
          <Col md={6}>
            <VerticalSpacing>
              <img alt="Visual example of column offset" src="/layout/offset.svg" />
              <Heading element="h3">Column offset</Heading>
              <p>
                Column offset functionality is available for use in development. Use offsets very intentionally, as
                it&apos;s generally a good practice to align elements on the left. Left alignment supports the natural
                reading flow of left-to-right languages.
              </p>
            </VerticalSpacing>
          </Col>
        </Row>
      </VerticalSpacing>
      <Separator />
      <VerticalSpacing>
        <Heading element="h2">Layout grid & breaking points</Heading>
        <p>
          Layout grids play a crucial role in creating cohesive, organised, and accessible designs. They provide a solid
          foundation for building scalable and responsive designs, streamline the design process, and promote
          collaboration among team members.
        </p>
        <BreakingpointsTable />
      </VerticalSpacing>
    </VerticalSpacing>
  );
};

export default Grid;
