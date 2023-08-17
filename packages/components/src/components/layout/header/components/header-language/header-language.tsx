import { useLayout } from '../../../../../helpers/hooks/use-layout';
import { useLabels } from '../../../../../providers/label-provider';
import Button, { ButtonProps } from '../../../../button/button';
import { Card, CardContent } from '../../../../card';
import { Col, Row } from '../../../../grid';
import { List, ListItem } from '../../../../list';
import { Heading } from '../../../../typography/heading/heading';
import Text from '../../../../typography/text/text';
import HeaderDropdown from '../header-dropdown/header-dropdown';
import HeaderModal from '../header-modal/header-modal';

export interface Language {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

export interface HeaderLanguageProps {
  /**
   * Content of HeaderDropdown
   */
  languages?: Language[];
}

export const HeaderLanguage = (props: HeaderLanguageProps) => {
  const { languages } = props;
  const isDesktopTablet = useLayout(['desktop', 'tablet']);
  const { getLabel } = useLabels();

  const selectedLanguage = languages?.find((language) => language.isSelected);

  const triggerProps: ButtonProps = {
    children: selectedLanguage?.label,
    visualType: isDesktopTablet ? 'link' : 'tertiary',
    iconRight: isDesktopTablet ? { name: 'expand_more', color: 'primary', size: 24 } : undefined,
  };

  const getLanguageButton = ({ isSelected, onClick, label }: Language, isDropown = true) => (
    <Button
      visualType={isDropown ? 'link' : isSelected ? 'primary' : 'tertiary'}
      aria-current={isSelected}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  const dropdown = (
    <div>
      <Text color="muted" modifiers="small">
        {getLabel('header.select-lang')}
      </Text>
      <HeaderDropdown shouldAnimate={true} tooltipProps={{ cardProps: { padding: 1 } }} triggerProps={triggerProps}>
        <List verticalSpacing={{ size: 0.75 }} element="ul">
          {languages?.map((language) => <ListItem key={language.label}>{getLanguageButton(language)}</ListItem>) || []}
        </List>
      </HeaderDropdown>
    </div>
  );

  const modal = (
    <HeaderModal ariaLabelledby="header-language-modal-label" triggerProps={triggerProps}>
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

export default HeaderLanguage;
