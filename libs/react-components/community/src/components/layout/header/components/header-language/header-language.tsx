import React from 'react';

import { Col, Row } from '../../../../../../../tedi/src/components/grid';
import { List, ListItem } from '../../../../../../../tedi/src/components/list';
import { useLayout } from '../../../../../helpers/hooks/use-layout';
import { useLabels } from '../../../../../providers/label-provider';
import Button, { ButtonProps } from '../../../../button/button';
import { Card, CardContent } from '../../../../card';
import { Heading } from '../../../../typography/heading/heading';
import Text from '../../../../typography/text/text';
import HeaderDropdown from '../header-dropdown/header-dropdown';
import HeaderModal from '../header-modal/header-modal';

export interface Language {
  label: string;
  onClick: (props: { onToggle: (open: boolean) => void }) => void;
  isSelected?: boolean;
  'aria-label'?: string;
}

export interface HeaderLanguageProps {
  /**
   * Content of HeaderDropdown
   */
  languages?: Language[];
}

export const HeaderLanguage: React.FC<HeaderLanguageProps> = (props) => {
  const { languages } = props;
  const isDesktopTablet = useLayout(['desktop', 'tablet']);
  const { getLabel } = useLabels();
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedLanguage = languages?.find((language) => language.isSelected);

  const triggerProps: ButtonProps = {
    children: selectedLanguage?.label,
    'aria-label': `${getLabel('header.select-lang')} ${selectedLanguage?.['aria-label'] ?? selectedLanguage?.label}`,
    visualType: isDesktopTablet ? 'link' : 'tertiary',
    iconRight: isDesktopTablet ? { name: 'expand_more', color: 'primary', size: 24 } : undefined,
  };

  const handleClick = (externalOnClick?: (props: { onToggle: (open: boolean) => void }) => void) => {
    externalOnClick?.({ onToggle: setIsOpen });
  };

  const getLanguageButton = ({ isSelected, onClick, label, 'aria-label': ariaLabel }: Language, isDropdown = true) => (
    <Button
      visualType={isDropdown ? 'link' : isSelected ? 'primary' : 'tertiary'}
      aria-current={isSelected}
      aria-label={ariaLabel}
      onClick={() => handleClick(onClick)}
    >
      {label}
    </Button>
  );

  const dropdown = (
    <div>
      <Text color="muted" modifiers="small">
        {getLabel('header.select-lang')}
      </Text>
      <HeaderDropdown
        shouldAnimate={true}
        open={isOpen}
        onToggle={setIsOpen}
        tooltipProps={{ cardProps: { padding: 1 } }}
        triggerProps={triggerProps}
      >
        <List verticalSpacing={{ size: 0.75 }} element="ul">
          {languages?.map((language) => <ListItem key={language.label}>{getLanguageButton(language)}</ListItem>) || []}
        </List>
      </HeaderDropdown>
    </div>
  );

  const modal = (
    <HeaderModal
      ariaLabelledby="header-language-modal-label"
      open={isOpen}
      onToggle={setIsOpen}
      triggerProps={triggerProps}
    >
      <Card borderless={true}>
        <CardContent>
          <Heading id="header-language-modal-label" className="sr-only">
            {getLabel('header.select-lang')}
          </Heading>
          <Row alignItems="center" element="ul">
            {languages?.map((language) => (
              <Col width="auto" key={language.label}>
                {getLanguageButton(language, false)}
              </Col>
            ))}
          </Row>
        </CardContent>
      </Card>
    </HeaderModal>
  );

  return isDesktopTablet ? dropdown : modal;
};

HeaderLanguage.displayName = 'HeaderLanguage';

export default HeaderLanguage;
