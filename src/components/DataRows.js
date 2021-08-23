import {InputGroup} from "react-bootstrap";
import {useEffect} from "react";

function DataRows(props) {
  const {data, selectedContacts, setSelectedContacts} = props;

  useEffect(() => {
    selectedContacts.forEach((item) => {
      const checkbox = document.getElementById(item.id);
      if (checkbox !== null && checkbox.checked === false) {
        checkbox.checked = true;
      }
    });
  }, [data, selectedContacts]);

  function updateSelectedContacts(contact) {
    let newSelectedContacts = selectedContacts.slice();

    if (newSelectedContacts.filter(((existingContact) => existingContact.id === contact.id)).length > 0) {
      newSelectedContacts = selectedContacts.filter((existingContact) => existingContact.id !== contact.id);
    } else {
      newSelectedContacts.push(contact);
    }
    setSelectedContacts(newSelectedContacts);
  }

  if (data.length > 0) {
    return (data.map((contact) => <tr key={contact.id}>
      <td>
        <InputGroup className="mb-1">
          <InputGroup.Checkbox id={contact.id} onClick={() => updateSelectedContacts({
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
            address: contact.address,
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
