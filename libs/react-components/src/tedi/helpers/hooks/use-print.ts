import React from 'react';
import ReactDOM from 'react-dom';

export const usePrint = (): boolean => {
  const [isPrinting, setIsPrinting] = React.useState(window.matchMedia('print').matches);

  const handleBeforePrint = () => {
    // https://github.com/facebook/react/issues/11876#issuecomment-352421144
    ReactDOM.flushSync(() => {
      setIsPrinting(true);
    });
  };

  const handleAfterPrint = () => {
    setIsPrinting(false);
  };

  React.useEffect(() => {
    // we have to use beforeprint and afterprint instead of matchMedia('print') due to chrome not detecting correct page count.
    // when UI changes then it might not fit on the same number of pages
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return isPrinting;
};

export default usePrint;
