import {Button, InputGroup} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";
import {useEffect, useState} from "react";

function DataRows(props) {
    const [printList, setPrintList] = useState([]);
    const {extractPrintList, currentStatus, data, confirmUpdate} = props;
    const transitionState = PostageStatus.getTransitionState(currentStatus);

    useEffect(() => {
        extractPrintList(printList);

        printList.forEach((item) => {
            const checkbox = document.getElementById(item.id);
            if (checkbox !== null && checkbox.checked === false) {
                checkbox.checked = true;
            }
        });
    }, [printList, extractPrintList]);

    function updatePrintList(contact, e) {
        let newPrintList = printList.slice();

        if (newPrintList.filter((existingContact => existingContact.id === contact.id)).length > 0) {
            newPrintList = printList.filter(existingContact => existingContact.id !== contact.id);
        } else {
            newPrintList.push(contact);
        }
        setPrintList(newPrintList);
    }

    if (data !== undefined) {
        return (data.map((contact) => <tr key={contact.id}>
            <td>
                <InputGroup className="mb-1">
                    <InputGroup.Checkbox id={contact.id} onClick={(e) => updatePrintList({
                        id: contact.id,
                        name: contact.name,
                        phone: contact.phone,
                        address: contact.address
                    }, e)} aria-label="Add to print list"/>
                </InputGroup>
            </td>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>{contact.address}</td>
            <td>
                <Button variant="primary"
                        onClick={(e) => confirmUpdate(contact.id, transitionState, e)}>{PostageStatus.getDisplayName(transitionState)}</Button>
            </td>
        </tr>));
    } else {
        return ([<tr key="1" align="center">
            <td colSpan="5">No contacts to display.</td>
        </tr>]);
    }
}

export default DataRows;
