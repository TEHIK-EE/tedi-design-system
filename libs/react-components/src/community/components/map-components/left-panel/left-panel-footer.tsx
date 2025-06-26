import { Col, Link, Row, Separator, Text } from '../../../../tedi';
import Toggle from '../../form/toggle/toggle';
import styles from './left-panel.module.scss';

const LeftPanelFooter = () => {
  return (
    <div className={styles['tedi-left-panel__footer']}>
      <div className={styles['tedi-left-panel__footer__theme-switch']}>
        <Toggle ariaLabel="Toggle dark mode" label={<Text>Tume režiim</Text>} />
        <Separator color="primary" topSpacing={1} />
      </div>
      <Row>
        <Col width="auto">
          <Text color="secondary" modifiers="small">
            Tehniline tugi
          </Text>
        </Col>
        <Col>
          <Link href="#" size="small">
            kaardirakendus@maaruum.ee
          </Link>
        </Col>
      </Row>
      <Row>
        <Col width="auto">
          <Text color="secondary" modifiers="small">
            Telefon
          </Text>
        </Col>
        <Col>
          <Link href="#" size="small">
            6 650 600
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text color="secondary" modifiers="small">
            Maa- ja Ruumiamet. Kõik õigused kaitstud.
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default LeftPanelFooter;
