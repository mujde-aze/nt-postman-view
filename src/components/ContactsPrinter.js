import {Button} from "react-bootstrap";
import {jsPDF} from "jspdf";
import {calculateMaxIndexOnPage} from "../utilities/PaginationHelper";
import PropTypes from "prop-types";

function ContactsPrinter({setContactsPrinted, contactsSelected, buttonDisabled}) {
  function printContacts() {
    const contactsPerPage = 11;
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
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
    <Button variant="success" onClick={() => printContacts()} disabled={buttonDisabled}>Save to print
            list</Button>
  );
}

function distributeContactsOnPage(startingIndex, maxIndex, contacts) {
  const contactsOnPage = [];
  for (let contactToPrint = startingIndex; contactToPrint <= maxIndex; contactToPrint++) {
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

ContactsPrinter.propTypes = {
  contactsSelected: PropTypes.array,
  setContactsPrinted: PropTypes.func,
  buttonDisabled: PropTypes.bool,
};

export default ContactsPrinter;
