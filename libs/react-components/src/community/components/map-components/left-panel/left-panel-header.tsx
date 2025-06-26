import { Button, Icon } from '../../../../tedi';
import Dropdown from '../../dropdown/dropdown';
import styles from './left-panel.module.scss';

const LeftPanelHeader = () => {
  return (
    <>
      <div className={styles['tedi-left-panel__header']}>
        <img
          src="logo.svg"
          alt="logo"
          style={{ filter: 'brightness(0) saturate(100%) invert(100%)', height: '40px' }}
        />
        <Icon name="close" color="white" />
      </div>
      <div className={styles['tedi-left-panel__header-controls']}>
        <Button
          onClick={() => {
            console.log('Log in');
          }}
          color="inverted"
          iconLeft="logout"
          visualType="neutral"
        >
          Logi sisse
        </Button>
        <Dropdown
          button={{
            children: 'EST',
            iconRight: 'expand_more',
            visualType: 'link',
            color: 'inverted',
          }}
          items={[
            {
              children: 'EST',
              onClick: function Ki() {},
            },
            {
              children: 'ENG',
              isActive: true,
              onClick: function Ki() {},
            },
            {
              children: 'RUS',
              onClick: function Ki() {},
            },
          ]}
        />
      </div>
    </>
  );
};

export default LeftPanelHeader;
