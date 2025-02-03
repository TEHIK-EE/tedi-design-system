import React from 'react';

import ScrollFade from '../../../../../../tedi/components/scroll-fade/scroll-fade';
import { useLabels } from '../../../../../../tedi/providers/label-provider';
import { Card, CardContent } from '../../../../card';
import Collapse from '../../../../collapse/collapse';
import Tag from '../../../../tag/tag';
import { Text } from '../../../../typography/text/text';
import { HeaderDropdown } from '../header-dropdown/header-dropdown';
import styles from './header-role.module.scss';

export interface HeaderRoleProps {
  /**
   * Primary info of user
   */
  primaryInfo: string;
  /**
   * Secondary info of user
   */
  secondaryInfo?: string;
  /**
   * Override roleSelection label from LabelProvider
   */
  label?: string;
  /**
   * Content of HeaderDropdown if user can open dropdown.
   * When using a function you have access to onToggle callback that can be used to close the menu
   */
  children?: ((props: { onToggle: (open: boolean) => void }) => React.ReactNode) | React.ReactNode;
  /**
   * Pass true when HeaderRole is used in HeaderSettings modal
   * @default false
   */
  renderModal?: boolean;
}

export const HeaderRole: React.FC<HeaderRoleProps> = (props) => {
  const { renderModal = false, ...rest } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  return renderModal ? (
    <HeaderRoleModal {...rest} open={isOpen} onToggle={setIsOpen} />
  ) : (
    <HeaderRoleDropdown {...rest} open={isOpen} onToggle={setIsOpen} />
  );
};

HeaderRole.displayName = 'HeaderRole';

type HeaderRoleComponentProps = Omit<HeaderRoleProps, 'renderModal'> & {
  /**
   * Should the Tooltip be open or closed.
   * Use to handle state outside of component, should use with onToggle prop.
   */
  open: boolean;
  /**
   * Callback when Tooltip is toggled.
   * Use to handle state outside of component, should use with open prop.
   */
  onToggle: (open: boolean) => void;
};

const HeaderRoleDropdown = (props: HeaderRoleComponentProps) => {
  const { getLabel } = useLabels();
  const { children, open, onToggle, primaryInfo, secondaryInfo, label = getLabel('header.role-label') } = props;

  const getLabelText = () => {
    if (label === getLabel('header.role-label')) {
      return (
        <div>
          <Tag color="primary" type="secondary">
            {label}
          </Tag>
        </div>
      );
    }
    return (
      <Text color="muted" modifiers={['bold', 'small']}>
        {label}
        {!!secondaryInfo && (
          <>
            {' '}
            <Text element="span" modifiers={['small', 'normal']}>
              <span style={{ color: 'var(--color-border-default)' }}>|</span> {secondaryInfo}
            </Text>
          </>
        )}
      </Text>
    );
  };

  const getChildren = typeof children === 'function' ? children({ onToggle }) : children;

  const dropdown = (
    <HeaderDropdown
      shouldAnimate={true}
      open={open}
      onToggle={onToggle}
      tooltipProps={{ cardProps: { padding: 0 }, maxWidth: 'medium' }}
      triggerProps={{
        children: primaryInfo,
        'aria-label': `${label ?? ''} ${secondaryInfo ?? ''} ${primaryInfo ?? ''}`,
        visualType: 'link',
        iconRight: { name: 'expand_more', color: 'primary', size: 24 },
      }}
    >
      <div className={styles['header-role-wrapper']}>
        <ScrollFade fadeSize={0}>
          <div className={styles['header-role-children']}>{getChildren}</div>
        </ScrollFade>
      </div>
    </HeaderDropdown>
  );

  return (
    <div>
      {getLabelText()}
      {getChildren ? dropdown : primaryInfo}
    </div>
  );
};

const HeaderRoleModal = (props: HeaderRoleComponentProps) => {
  const { getLabel } = useLabels();
  const { children, open, onToggle, primaryInfo, secondaryInfo, label = getLabel('header.role-label') } = props;

  const title = (
    <Text element="span" color="muted" modifiers="bold">
      {label} {primaryInfo}
      {secondaryInfo && (
        <Text element="span" modifiers="normal">
          {` | ${secondaryInfo}`}
        </Text>
      )}
    </Text>
  );

  const getChildren = typeof children === 'function' ? children({ onToggle }) : children;

  return (
    <Card background="bg-muted" borderRadius={false} borderless={true}>
      <CardContent padding={0}>
        {getChildren ? (
          <Collapse
            id="role-collapse"
            open={open}
            onToggle={onToggle}
            className={styles['header-role-collapse']}
            hideCollapseText
            title={title}
          >
            <div className={styles['header-role-wrapper']}>
              <ScrollFade fadeSize={0}>
                <div className={styles['header-role-children']}>{getChildren}</div>
              </ScrollFade>
            </div>
          </Collapse>
        ) : (
          <div className={styles['header-role-children']}>{title}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeaderRole;
