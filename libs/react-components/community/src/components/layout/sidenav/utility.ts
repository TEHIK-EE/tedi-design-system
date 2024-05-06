import useLayout from '../../../../../shared/helpers/hooks/use-layout';
import { IntentionalAny } from '../../../../../shared/types';
import { ILayoutProps } from '../layout/layout';
import { SideNavProps } from './sidenav';

export const useSidenavRendered = (headerType: ILayoutProps['headerType'], props?: SideNavProps<IntentionalAny>) => {
  const { breakToBottomContent, breakToHeader } = props || { breakToBottomContent: [], breakToHeader: [] };
  const shouldBreakToBottomContent = useLayout(breakToBottomContent || []) && headerType === 'public';
  const shouldBreakToHeader = useLayout(breakToHeader || []) && headerType === 'public';
  const hasSidenav = !!props && !(headerType === 'public' && (shouldBreakToBottomContent || shouldBreakToHeader));

  return { shouldBreakToBottomContent, shouldBreakToHeader, hasSidenav };
};
