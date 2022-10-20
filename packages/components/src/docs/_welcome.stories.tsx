import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import Button from '../lib/button/button';
import { Col, Row } from '../lib/grid';
import { VerticalSpacing } from '../lib/vertical-spacing';

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
                <Button
                  type="link"
                  target="_blank"
                  text="Figma"
                  url="https://www.figma.com/file/vkcvISaaYkZJVQU8VFw9kC/TEHIK-STAR-LAEH?node-id=9387%3A25923"
                />
              </Col>
              <Col width="auto">
                <Button
                  type="link"
                  target="_blank"
                  text="Gitlab"
                  url="https://gitlab.sotsiaalministeerium.ee/star/star2-frontend"
                />
              </Col>
              <Col width="auto">
                <Button
                  type="link"
                  target="_blank"
                  text="Jira"
                  url="https://smjira.sm.ee/secure/RapidBoard.jspa?rapidView=515&projectKey=STARLA"
                />
              </Col>
            </Row>
          </VerticalSpacing>
        </>
      ),
    },
  },
} as Meta;

export const Welcome = () => null;
