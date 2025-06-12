export const getPagesToDisplay = (currentPage: number, lastPage: number) => {
  if (!lastPage || lastPage === 1) {
    return [1];
  }

  let pagesAdded = 0;
  const pages = [1, lastPage];

  if (!pages.includes(currentPage)) {
    pages.push(currentPage);
    pagesAdded += 1;
  }

  let diffFromCurrent = 1;
  while (pagesAdded < 5 && diffFromCurrent < 6) {
    if (currentPage - diffFromCurrent > 1) {
      pages.push(currentPage - diffFromCurrent);
      pagesAdded += 1;
    }
    if (currentPage + diffFromCurrent < lastPage) {
      pages.push(currentPage + diffFromCurrent);
      pagesAdded += 1;
    }
    diffFromCurrent += 1;
  }
  pages.sort((a, b) => a - b);

  if (pages[0] && pages[2] && pages[2] - pages[0] > 2) {
    pages.splice(1, 1, -1);
  }
  if (
    pages[pages.length - 1] &&
    pages[pages.length - 3] &&
    pages[pages.length - 1] - pages[pages.length - 3] > 2
  ) {
    pages.splice(pages.length - 2, 1, -1);
  }

  return pages;
};
