import Anchor, { AnchorProps } from '../anchor/anchor';
import styles from './skip-links.module.scss';

export interface SkipLinksProps {
  /**
   * Hidden links array that is only visible when focused.
   */
  links: AnchorProps[];
}

export const SkipLinks = (props: SkipLinksProps): JSX.Element => {
  const { links } = props;
  return (
    <div className={styles['skip-links']}>
      <ul>
        {links.map((link, index) => (
          <Anchor {...link} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default SkipLinks;
