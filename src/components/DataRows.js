import {Button, InputGroup} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";
import {useState} from "react";

function DataRows(props) {
    const [printList, setPrintList] = useState([]);

    function addToPrintList(contactId, e) {
        const runningList = printList;

        if (runningList.includes(contactId)) {
            runningList.splice(runningList.indexOf(contactId), 1);
        } else {
            runningList.push(contactId);
        }
        setPrintList(runningList);
    }

    if (props.data.length > 0) {
        return (props.data.map((contact) => <tr key={contact.id}>
            <td>
                <InputGroup className="mb-1">
                    <InputGroup.Checkbox onClick={(e) => addToPrintList(contact.id, e)} aria-label="Add to print list"/>
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
