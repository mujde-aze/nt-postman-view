export function calculateMaxIndexOnPage(startingIndex, itemsPerPage, maxNumberOfItems) {
  const potentialMaxIndexPerPage = startingIndex + itemsPerPage;
  if ((potentialMaxIndexPerPage) <= (maxNumberOfItems)) {
    return potentialMaxIndexPerPage;
  } else {
    return maxNumberOfItems;
  }
}
