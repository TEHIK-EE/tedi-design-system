import { AllowedHTMLTags } from '../../../../../helpers/polymorphic/types';
import Anchor, { AnchorProps } from '../../../../anchor/anchor';
import styles from './skip-links.module.scss';

type ConditionalTypes<C extends React.ElementType = 'a'> =
  | {
      /**
       * Render all links as this component<br />
       * See [Anchor/CustomComponent](/?path=/docs/components-anchor--custom-component) for an example
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<any>>;
      /**
       * Category links
       */
      links: AnchorProps<C>[];
    }
  | {
      linkAs?: never;
      links: AnchorProps<any>[];
    };

export type SkipLinksProps<C extends React.ElementType = 'a'> = ConditionalTypes<C>;

export const SkipLinks = <C extends React.ElementType = 'a'>(props: SkipLinksProps<C>): JSX.Element => {
  const { links, linkAs } = props;
  return (
    <div data-name="skip-links" className={styles['skip-links']}>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Anchor as={linkAs} {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkipLinks;
