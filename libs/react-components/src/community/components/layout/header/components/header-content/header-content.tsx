export interface HeaderContentProps {
  /**
   * Content of HeaderDropdown
   */
  children?: React.ReactNode;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({ children }) => <>{children}</>;

HeaderContent.displayName = 'HeaderContent';

export default HeaderContent;
