import Anchor from '../../../anchor/anchor';
import Button from '../../../button/button';
import { CardContent } from '../../../card';
import Dropdown from '../../../dropdown/dropdown';
import { Col, Row } from '../../../grid';
import { Modal, ModalProvider, ModalTrigger } from '../../../modal';
import Separator from '../../../separator/separator';

export const renderCustomHeader = (isSmallLayout: boolean) => {
  const desktopLayout = (
    <Row>
      <Col width="auto" align="center">
        <Anchor href="#">Accessibility</Anchor>
      </Col>
      <Col width="auto">
        <Separator axis="vertical" />
      </Col>
      <Col width="auto" shrink={1}>
        <p>Role:</p>
        <Anchor href="#">Kairi Sarapuu</Anchor>
      </Col>
      <Col width="auto">
        <Separator axis="vertical" />
      </Col>
      <Col>
        <p>Language:</p>
        <Dropdown
          button={{ children: 'EST', visualType: 'link', iconRight: 'expand_more' }}
          items={[
            { children: 'EST', href: '#', isActive: true },
            { children: 'ENG', href: '#' },
            { children: 'RUS', href: '#' },
          ]}
        />
      </Col>
    </Row>
  );

  const mobileLayout = (
    <Row gutterX={3}>
      <Col width="auto">
        <Separator axis="vertical" fullWidth />
      </Col>
      <Col width="auto">
        <ModalProvider>
          <ModalTrigger>
            <Button icon={{ name: 'account_circle', size: 24 }} id="account-toggle" className="block" visualType="link">
              Account
            </Button>
          </ModalTrigger>
          <Modal aria-labelledby="account-toggle" position="right">
            <CardContent>
              <Row direction="column">
                <Col>
                  <Separator fullWidth topSpacing={2.5} bottomSpacing={1.5} />
                </Col>
                <Col>
                  <Anchor href="#">Accessibility</Anchor>
                </Col>
                <Col>
                  <Separator fullWidth spacing={1.5} />
                </Col>
                <Col>
                  Role: <Anchor href="#">Kairi Sarapuu</Anchor>
                </Col>
                <Col width="auto">
                  <Separator fullWidth spacing={1.5} />
                </Col>
                <Col>
                  <Row>
                    <Col width="auto">Language:</Col>
                    <Col width="auto">
                      <Anchor href="#" isActive>
                        EST
                      </Anchor>
                    </Col>
                    <Col width="auto">
                      <Anchor href="#">ENG</Anchor>
                    </Col>
                    <Col width="auto">
                      <Anchor href="#">RUS</Anchor>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Separator fullWidth spacing={1.5} />
                </Col>
                <Col>
                  <Button visualType="link" onClick={() => console.log('Logging out')}>
                    Log out
                  </Button>
                </Col>
                <Col>
                  <Separator fullWidth topSpacing={1.5} />
                </Col>
              </Row>
            </CardContent>
          </Modal>
        </ModalProvider>
      </Col>
    </Row>
  );

  return isSmallLayout ? mobileLayout : desktopLayout;
};
