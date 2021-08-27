import {Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import {calculateMaxIndexOnPage} from "../utilities/PaginationHelper";
import * as PropType from "prop-types";

function CustomPagination({contacts, updatePage, ntStatus}) {
  const [active, setActive] = useState(1);
  const [pageNavigation, setPageNavigation] = useState(new Map());

  const items = [];
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(contacts.length / itemsPerPage);
  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => setActive(number)}>
          {number}
        </Pagination.Item>,
    );
  }

  /**
   * Break contacts into pages then add each one to a map entry. Do this everytime contacts change.
   * */
  useEffect(() => {
    for (let page = 1; page <= numberOfPages; page++) {
      const pageContents = [];
      const startingIndex = (page - 1) * itemsPerPage;
      for (let contactIndex = startingIndex;
        contactIndex <= calculateMaxIndexOnPage(startingIndex, itemsPerPage, contacts.length);
        contactIndex++) {
        pageContents.push(contacts[contactIndex]);
      }
      setPageNavigation((prevState) => prevState.set(page, pageContents));
    }
  }, [contacts, numberOfPages, pageNavigation]);

  /**
   * When the contacts list has been cleared, this effect ensures that the table data
   * is cleared as well. We're also ensuring that if the page is cleared but not the entire
   * contact list, we move the previous page (in this instance, previous page is the same as numberOfPages)
   * after the contact list is updated.
   * */
  useEffect(() => {
    if (contacts.length === 0) {
      updatePage([]);
    } else {
      let pageToRetrieve;
      if (active < numberOfPages) {
        pageToRetrieve = active;
      } else {
        pageToRetrieve = numberOfPages;
        setActive(numberOfPages);
      }
      updatePage(pageNavigation.get(pageToRetrieve));
    }
  }, [updatePage, pageNavigation, active, contacts, numberOfPages]);

  /**
   * When switching Nt Statuses, ensure that the active state is set to 1, and current navigation is cleared.
   * */
  useEffect(() => {
    setPageNavigation((prevState) => {
      prevState.clear();
      return prevState;
    });
    setActive(1);
  }, [ntStatus, updatePage]);

  return (
    <Pagination>{items}</Pagination>
  );
}

CustomPagination.propTypes = {
  contacts: PropType.array,
  updatePage: PropType.func,
  ntStatus: PropType.string,
};

export default CustomPagination;
