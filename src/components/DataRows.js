import {Button, InputGroup} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";
import {useEffect, useState} from "react";

function DataRows(props) {
    const [printList, setPrintList] = useState([]);

    useEffect(() => {
        props.extractPrintList(printList);
    }, [printList, props]);

    function addToPrintList(contact, e) {
        let newPrintList = printList.slice();

        if (newPrintList.filter((existingContact => existingContact.id === contact.id)).length > 0) {
            newPrintList = printList.filter(existingContact => existingContact.id !== contact.id);
        } else {
            newPrintList.push(contact);
        }
        setPrintList(newPrintList);
    }

    if (props.data.length > 0) {
        return (props.data.map((contact) => <tr key={contact.id}>
            <td>
                <InputGroup className="mb-1">
                    <InputGroup.Checkbox onClick={(e) => addToPrintList({id: contact.id, name: contact.name, phone: contact.phone, address: contact.address}, e)} aria-label="Add to print list"/>
                </InputGroup>
            </td>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>{contact.address}</td>
            <td>
                <Button variant="primary" onClick={(e) => props.confirmUpdate(contact.id, PostageStatus.NT_SENT, e)}>NT
                    Sent</Button>
            </td>
        </tr>));
    } else {
        return ([<tr key="1" align="center">
            <td colSpan="5">No contacts to display.</td>
        </tr>]);
    }
}

export default DataRows;
