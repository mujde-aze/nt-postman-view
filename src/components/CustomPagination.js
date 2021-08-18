import {Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";

function CustomPagination(props) {
    const {contacts, updatePage} = props;
    const [active, setActive] = useState(1);
    const [pageNavigation, setPageNavigation] = useState(new Map());

    let items = [];
    const itemsPerPage = 10;
    const numberOfPages = Math.ceil(contacts.length/itemsPerPage);
    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={(e) => setActive(number)}>
                {number}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        for (let page = 1; page <= numberOfPages; page++) {
            const pageContents = [];
            const startingIndex = (page - 1) * itemsPerPage;
            for (let contactIndex = startingIndex;
                 contactIndex < calculateMaxIndexOnPage(startingIndex, itemsPerPage, contacts.length);
                 contactIndex++) {
                pageContents.push(contacts[contactIndex]);
            }
            setPageNavigation(prevState => prevState.set(page, pageContents));
        }
    }, [contacts, numberOfPages, pageNavigation]);

    useEffect(() => {
        updatePage(pageNavigation.get(active));
    }, [updatePage, pageNavigation, active, contacts]);

    return (
        <Pagination>{items}</Pagination>
    );
}

function calculateMaxIndexOnPage(startingIndex, itemsPerPage, maxNumberOfItems) {
    const potentialMaxIndexPerPage = startingIndex + itemsPerPage;
    if ((potentialMaxIndexPerPage) <= (maxNumberOfItems)) {
        return potentialMaxIndexPerPage;
    } else {
        return maxNumberOfItems;
    }
}

export default CustomPagination;
