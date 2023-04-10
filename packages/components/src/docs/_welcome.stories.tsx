import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import Anchor from '../components/anchor/anchor';
import { Col, Row } from '../components/grid';
import Section from '../components/section/section';
import { VerticalSpacing } from '../components/vertical-spacing';

export default {
  title: 'Documentation/Welcome',
  parameters: {
    docs: {
      page: () => (
        <Section>
          <Title>Tehik Design System</Title>
          <Subtitle>
            <>
              Here you can find our design guidelines, component documentation, and resources for building apps with{' '}
              <code>@tehik/react-components</code>.
            </>
          </Subtitle>
          <VerticalSpacing size={0.5}>
            <h2>Resources</h2>
            <Row alignItems="center">
              <Col width="auto">
                <Anchor
                  target="_blank"
                  href="https://www.figma.com/file/aw4UVf6HRaZEv0rQmED2cf/%F0%9F%9A%A7-TEHIK-Design-System"
                >
                  Figma
                </Anchor>
              </Col>
              <Col width="auto">
                <Anchor
                  target="_blank"
                  href="https://gitlab.sotsiaalministeerium.ee/tehik-react/tehik-react-components"
                >
                  Gitlab
                </Anchor>
              </Col>
              <Col width="auto">
                <Anchor
                  target="_blank"
                  href="https://smjira.sm.ee/secure/RapidBoard.jspa?rapidView=978&projectKey=TEHVEER&view=detail"
                >
                  Jira
                </Anchor>
              </Col>
              <Col width="auto">
                <Anchor
                  target="_blank"
                  href="https://join.slack.com/t/stararendus/shared_invite/zt-1jddufgmr-BYaTtRfzp16YjOhJ3r2ifQ"
                >
                  Slack
                </Anchor>
              </Col>
            </Row>
          </VerticalSpacing>
        </Section>
      ),
    },
  },
} as Meta;

export const Welcome = () => null;
