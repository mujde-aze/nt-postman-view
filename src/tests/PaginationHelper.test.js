import {calculateMaxIndexOnPage} from "../utilities/PaginationHelper";

describe("The calculateMaxIndexOnPage", () => {
  it("Should return 9 if starting index is 0, items per page is 10 and max items is 30", ()=>{
    const maxIndex = calculateMaxIndexOnPage(0, 10, 30);
    expect(maxIndex).toBe(9);
  });

  it("Should return 19 if starting index is 10, items per page is 10 and max items is 20", ()=>{
    const maxIndex = calculateMaxIndexOnPage(10, 10, 20);
    expect(maxIndex).toBe(19);
  });

  it("Should return 9 if starting index is 1, items per page is 10 and max items is 10", ()=>{
    const maxIndex = calculateMaxIndexOnPage(1, 10, 10);
    expect(maxIndex).toBe(9);
  });

  it("Should return 14 if starting index is 12, items per page is 5 and max items is 15", ()=>{
    const maxIndex = calculateMaxIndexOnPage(12, 5, 15);
    expect(maxIndex).toBe(14);
  });
});
