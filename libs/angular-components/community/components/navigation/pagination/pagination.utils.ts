export const getPagesToDisplay = (currentPage: number, lastPage: number) => {
  const pages = new Set([1, currentPage, lastPage].filter((nr) => Boolean(nr)));

  let pagesAdded = pages.size;
  for (
    let diffFromCurrent = 1;
    diffFromCurrent <= 6 && pagesAdded < 7;
    diffFromCurrent++
  ) {
    if (currentPage - diffFromCurrent > 1) {
      pages.add(currentPage - diffFromCurrent);
      pagesAdded += 1;
    }
    if (currentPage + diffFromCurrent < lastPage) {
      pages.add(currentPage + diffFromCurrent);
      pagesAdded += 1;
    }
  }
  const sortedPages = [...pages].sort((a, b) => a - b);

  if (sortedPages[0] && sortedPages[2] && sortedPages[2] - sortedPages[0] > 2) {
    sortedPages.splice(1, 1, -1);
  }
  if (
    sortedPages[sortedPages.length - 1] &&
    sortedPages[sortedPages.length - 3] &&
    sortedPages[sortedPages.length - 1] - sortedPages[sortedPages.length - 3] >
      2
  ) {
    sortedPages.splice(sortedPages.length - 2, 1, -1);
  }

  return sortedPages;
};
