import {Button, InputGroup} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";
import {useState} from "react";

function DataRows(props) {
    const [printList, setPrintList] = useState([]);

    function addToPrintList(contact, e) {
        let runningList = printList.slice();

        if (runningList.filter((selectedContact => selectedContact.id === contact.id)).length > 0) {
            runningList = printList.filter(existingContact => existingContact.id !== contact.id);
        } else {
            runningList.push(contact);
        }
        setPrintList(runningList);
    }

    if (props.data.length > 0) {
        return (props.data.map((contact) => <tr key={contact.id}>
            <td>
                <InputGroup className="mb-1">
                    <InputGroup.Checkbox onClick={(e) => addToPrintList({id: contact.id, name: contact.name, address: contact.address}, e)} aria-label="Add to print list"/>
                </InputGroup>
            </td>
            <td>{contact.name}</td>
            <td>{contact.address}</td>
            <td>
                <Button variant="primary" onClick={(e) => props.confirmUpdate(contact.id, PostageStatus.NT_SENT, e)}>NT
                    Sent</Button>
            </td>
        </tr>));
    } else {
        return ([<tr key="1" align="center">
            <td colSpan="3">No contacts to display.</td>
        </tr>]);
    }
}

export default DataRows;
