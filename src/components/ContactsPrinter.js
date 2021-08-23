import {Button} from "react-bootstrap";
import {jsPDF} from "jspdf";
import "../models/Amiri-Regular-normal";
import {calculateMaxIndexOnPage} from "../utilities/PaginationHelper";

function ContactsPrinter(props) {
  const {setContactsPrinted, contactsSelected} = props;

  function printContacts() {
    const contactsPerPage = 11;
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.setFontSize(14);

    const totalNumberOfRows = contactsSelected.length;
    const numberOfPdfPages = Math.ceil(totalNumberOfRows / contactsPerPage);

    for (let page = 1; page <= numberOfPdfPages; page++) {
      const startingIndex = (page - 1) * contactsPerPage;
      const maxIndex = calculateMaxIndexOnPage(startingIndex, contactsPerPage, totalNumberOfRows);
      const pageContacts = distributeContactsOnPage(startingIndex, maxIndex, contactsSelected);

      doc.text(formatContacts(pageContacts), 5, 20);
      doc.addPage();
    }
    doc.save("contacts.pdf");
    setContactsPrinted(true);
  }

  return (
    <Button variant="success" onClick={() => printContacts()} disabled={props.buttonDisabled}>Save to print
            list</Button>
  );
}

function distributeContactsOnPage(startingIndex, maxIndex, contacts) {
  const contactsOnPage = [];
  for (let contactToPrint = startingIndex; contactToPrint < maxIndex; contactToPrint++) {
    if (contacts.length > contactToPrint) {
      contactsOnPage.push(contacts[contactToPrint]);
    }
  }

  return contactsOnPage;
}

function formatContacts(contacts) {
  return contacts.map((contact) =>
    `
            ${contact.name} - ${contact.address} - ${contact.phone}
            
            
            `,
  ).join("");
}

export default ContactsPrinter;
