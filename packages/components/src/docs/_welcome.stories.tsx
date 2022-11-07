import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import { Anchor, Col, Row, VerticalSpacing } from '..';

export default {
  title: 'Documentation/Welcome',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Tehik Design System</Title>
          <Subtitle>
            Here you can find our design guidelines, component documentation, and resources for building apps with Tehik
            Design System.
          </Subtitle>
          <VerticalSpacing size={0.5}>
            <h2>Resources</h2>
            <Row alignItems="center">
              <Col width="auto">
                <Anchor
                  visualType="link"
                  target="_blank"
                  href="https://www.figma.com/file/vkcvISaaYkZJVQU8VFw9kC/TEHIK-STAR-LAEH?node-id=9387%3A25923"
                >
                  Figma
                </Anchor>
              </Col>
              <Col width="auto">
                <Anchor
                  visualType="link"
                  target="_blank"
                  href="https://gitlab.sotsiaalministeerium.ee/star/star2-frontend"
                >
                  Gitlab
                </Anchor>
              </Col>
              <Col width="auto">
                <Anchor
                  visualType="link"
                  target="_blank"
                  href="https://smjira.sm.ee/secure/RapidBoard.jspa?rapidView=515&projectKey=STARLA"
                >
                  Jira
                </Anchor>
              </Col>
            </Row>
          </VerticalSpacing>
        </>
      ),
    },
  },
} as Meta;

export const Welcome = () => null;
