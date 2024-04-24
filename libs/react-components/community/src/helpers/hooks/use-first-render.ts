import React from 'react';

export const useFirstRender = () => {
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};
