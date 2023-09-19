import React from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Card, CardContent } from '../../../../card';
import Collapse from '../../../../collapse/collapse';
import ScrollFade from '../../../../scroll-fade/scroll-fade';
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
   * Content of HeaderDropdown if user can open dropdown
   */
  children?: React.ReactNode;
  /**
   * Pass true when HeaderRole is used in HeaderSettings modal
   * @default false
   */
  renderModal?: boolean;
}

export const HeaderRole = (props: HeaderRoleProps) => {
  const { renderModal = false, ...rest } = props;
  return renderModal ? <HeaderRoleModal {...rest} /> : <HeaderRoleDropdown {...rest} />;
};

const HeaderRoleDropdown = (props: Omit<HeaderRoleProps, 'renderModal'>) => {
  const { getLabel } = useLabels();
  const { children, primaryInfo, secondaryInfo, label = getLabel('header.role-label') } = props;

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

  const dropdown = (
    <HeaderDropdown
      shouldAnimate={true}
      tooltipProps={{ cardProps: { padding: 0 }, maxWidth: 'medium' }}
      triggerProps={{
        children: primaryInfo,
        visualType: 'link',
        iconRight: { name: 'expand_more', color: 'primary', size: 24 },
      }}
    >
      <div className={styles['header-role-wrapper']}>
        <ScrollFade fadeSize="0">
          <div className={styles['header-role-children']}>{children}</div>
        </ScrollFade>
      </div>
    </HeaderDropdown>
  );

  return (
    <div>
      {getLabelText()}
      {children ? dropdown : primaryInfo}
    </div>
  );
};

const HeaderRoleModal = (props: Omit<HeaderRoleProps, 'renderModal'>) => {
  const { getLabel } = useLabels();
  const { children, primaryInfo, secondaryInfo, label = getLabel('header.role-label') } = props;

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

  return (
    <Card background="bg-muted" borderRadius={false} borderless={true}>
      <CardContent padding={0}>
        {children ? (
          <Collapse id="role-collapse" className={styles['header-role-collapse']} hideCollapseText title={title}>
            <div className={styles['header-role-wrapper']}>
              <ScrollFade fadeSize="0">
                <div className={styles['header-role-children']}>{children}</div>
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
