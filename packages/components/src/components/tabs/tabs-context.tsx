import React from 'react';

interface ITabsContext {
  currentTab: string;
  setCurrentTab: (id: string) => void;
}

export const TabsContext = React.createContext<ITabsContext>({
  currentTab: '',
  setCurrentTab: () => null,
});
