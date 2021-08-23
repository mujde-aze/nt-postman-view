import {InputGroup} from "react-bootstrap";
import {useEffect} from "react";

function DataRows(props) {
    const {data, printList, setPrintList} = props;

    useEffect(() => {
        printList.forEach((item) => {
            const checkbox = document.getElementById(item.id);
            if (checkbox !== null && checkbox.checked === false) {
                checkbox.checked = true;
            }
        });

    }, [data, printList]);

    function updatePrintList(contact) {
        let newPrintList = printList.slice();

        if (newPrintList.filter((existingContact => existingContact.id === contact.id)).length > 0) {
            newPrintList = printList.filter(existingContact => existingContact.id !== contact.id);
        } else {
            newPrintList.push(contact);
        }
        setPrintList(newPrintList);
    }

    if (data.length > 0) {
        return (data.map((contact) => <tr key={contact.id}>
            <td>
                <InputGroup className="mb-1">
                    <InputGroup.Checkbox id={contact.id} onClick={() => updatePrintList({
                        id: contact.id,
                        name: contact.name,
                        phone: contact.phone,
                        address: contact.address
                    })} aria-label="Add to print list"/>
                </InputGroup>
            </td>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>{contact.address}</td>
        </tr>));
    } else {
        return ([<tr key="1" align="center">
            <td colSpan="4">No contacts to display.</td>
        </tr>]);
    }
}

export default DataRows;
