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
        <Pagination.Item key={number} active={number === active} onClick={(e) => setActive(number)}>
          {number}
        </Pagination.Item>,
    );
  }

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

  useEffect(() => {
    if (contacts.length > 0) {
      updatePage(pageNavigation.get(active));
    } else {
      updatePage([]);
    }
  }, [updatePage, pageNavigation, active, contacts]);

  useEffect(() => {
    setPageNavigation(new Map());
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
