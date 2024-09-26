import React from 'react';

import { Col, Row } from '../../../../../../../tedi/src/components/grid';
import { Anchor } from '../../../../anchor/anchor';
import { StretchContent } from '../../../../stretch-content/stretch-content';
import { LayoutContext } from '../../../layout-context';

export const HeaderNavigation = () => {
  const { sideNavProps } = React.useContext(LayoutContext);

  return (
    <StretchContent direction="horizontal">
      <Row justifyContent="center" alignItems="center" gutterX={5}>
        {sideNavProps?.navItems?.map((anchor, index) => (
          <Col key={index} width="auto">
            <Anchor color="text-color" as={sideNavProps.linkAs} {...anchor} icon={undefined}>
              {anchor.children}
            </Anchor>
          </Col>
        ))}
      </Row>
    </StretchContent>
  );
};

export default HeaderNavigation;
