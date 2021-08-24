export function calculateMaxIndexOnPage(startingIndex, itemsPerPage, maxNumberOfItems) {
  let maxIndex;
  const potentialMaxIndexPerPage = startingIndex + itemsPerPage;
  if (potentialMaxIndexPerPage <= maxNumberOfItems) {
    maxIndex = potentialMaxIndexPerPage;
  } else {
    maxIndex = maxNumberOfItems;
  }

  return maxIndex - 1;
}
