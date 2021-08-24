import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import CustomToast from "./CustomToast";
import ConfirmationModal from "./ConfirmationModal";
import DataRows from "./DataRows";
import LoadingSpinner from "./LoadingSpinner";
import {PostageStatus} from "../models/PostageStatus";
import ContactsPrinter from "./ContactsPrinter";
import CustomPagination from "./CustomPagination";
import PropTypes from "prop-types";

function PostmanTable({ntStatus, functions}) {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({body: "", background: "light"});
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [prevNumberOfSelectedContacts, setPrevNumberOfSelectedContacts] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [contactsUpdated, setContactsUpdated] = useState(false);
  const [printListButtonDisabled, setPrintListButtonDisabled] = useState(true);
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const [displayPrintButton, setDisplayPrintButton] = useState(true);
  const [contactsPrinted, setContactsPrinted] = useState(false);

  /**
     * Certain conditions need to be met when the status is 'needs_nt':
     * 1. The 'Save to print list' button must be clicked before the update button can be selected.
     * 2. The 'Save to print list' button must only be enabled if there is at least 1 contact selected.
     * 3. The update button must be disabled as long as the 'Save to print list' button is disabled and no contacts
     * have been selected.
     * */
  if (ntStatus === PostageStatus.NEEDS_NT) {
    if (prevNumberOfSelectedContacts !== selectedContacts.length) {
      if (updateButtonDisabled === false) {
        setUpdateButtonDisabled(true);
      }
      setPrevNumberOfSelectedContacts(selectedContacts.length);
    }

    if (printListButtonDisabled === true && selectedContacts.length > 0) {
      setPrintListButtonDisabled(false);
    }

    if (printListButtonDisabled === false && selectedContacts.length === 0) {
      setPrintListButtonDisabled(true);
      setUpdateButtonDisabled(true);
    }
  }

  function handleNoModalOption() {
    console.log(`Will not update the ${selectedContacts.length} selected contacts to status ${PostageStatus.getTransitionState(ntStatus)}`);
    handleCloseModal();
  }

  function handleYesModalOption() {
    if (selectedContacts.length !== undefined && selectedContacts.length > 0) {
      setShowSpinner(true);
      selectedContacts.forEach(async (contact) => {
        await updatePostageStatus(contact.id, PostageStatus.getTransitionState(ntStatus));
      },
      );
      setContactsUpdated(true);
      setShowSpinner(false);
      setSelectedContacts([]);
    }
    handleCloseModal();
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function confirmUpdate() {
    setShowModal(true);
  }

  async function updatePostageStatus(userId, status) {
    try {
      const updatePostageCallable = functions.httpsCallable("updateDtPostageStatus");
      await updatePostageCallable({
        ntStatus: status,
        userId: userId,
      });
      setToastProps({
        body: "Successfully updated the selected contacts.",
        background: "success",
      });
      setShowToast(true);
    } catch (error) {
      setToastProps({
        body: "There was a problem updating the postage status. Please let the administrator know.",
        background: "warning",
      });
      setShowToast(true);
      console.error(`Problem updating nt status to ${status} for user ${userId}`);
    }
  }

  useEffect(() => {
    setContactsPrinted(false);
    if (ntStatus === PostageStatus.NT_SENT) {
      if (selectedContacts.length > 0) {
        setUpdateButtonDisabled(false);
      } else {
        setUpdateButtonDisabled(true);
      }
    }
  }, [setContactsPrinted, selectedContacts, ntStatus]);

  useEffect(() => {
    if (contactsPrinted === true) {
      setUpdateButtonDisabled(false);
      setContactsUpdated(false);
    }
  }, [contactsPrinted]);

  useEffect(() => {
    setSelectedContacts([]);
    if (ntStatus === PostageStatus.NEEDS_NT) {
      setDisplayPrintButton(true);
    } else {
      setUpdateButtonDisabled(true);
      setDisplayPrintButton(false);
    }
  }, [ntStatus]);

  useEffect(() => {
    (async () => {
      try {
        setShowSpinner(true);
        const getContactsCallable = functions.httpsCallable("getDtContacts");
        const result = await getContactsCallable({
          ntStatus: ntStatus,
          assignedToMe: true,
        });
        setShowSpinner(false);
        setData(result.data);
      } catch (error) {
        console.log(error.code);
        if (error.code !== "not-found") {
          setToastProps({
            body: "There was a problem retrieving contacts. Please let the administrator know.",
            background: "warning",
          });
          setShowToast(true);
        }
        console.warn(`No contacts with nt status ${ntStatus}`);
        setShowSpinner(false);
        setData([]);
      }
    })();

    return () => {
      setContactsUpdated(false);
    };
  }, [functions, ntStatus, contactsUpdated]);

  return (
    <div id="dataTable">
      <CustomToast setShowToast={setShowToast} showToast={showToast} toastBody={toastProps.body}
        background={toastProps.background}/>
      <ConfirmationModal showModal={showModal} handleCloseModal={handleCloseModal}
        contactsSelected={selectedContacts.length}
        handleNoModalOption={handleNoModalOption} handleYesModalOption={handleYesModalOption}
        transitionToStatus={PostageStatus.getTransitionState(ntStatus)}/>
      <LoadingSpinner showSpinner={showSpinner}/>
      <p>Contacts assigned to me with status <strong>{PostageStatus.getDisplayName(ntStatus)}</strong>.</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <DataRows data={pageData} selectedContacts={selectedContacts}
            setSelectedContacts={setSelectedContacts}/>
        </tbody>
      </Table>
      <div id="printButton">
        {displayPrintButton ?
                    <ContactsPrinter contactsSelected={selectedContacts} buttonDisabled={printListButtonDisabled}
                      setContactsPrinted={setContactsPrinted} ntStatus={ntStatus}/> :
                    undefined
        }
      </div>
      <div id="bulkUpdateButton">
        <Button variant="success"
          onClick={() => confirmUpdate()}
          disabled={updateButtonDisabled}>Update {selectedContacts.length} contacts
                    to {PostageStatus.getDisplayName(PostageStatus.getTransitionState(ntStatus))}</Button>
      </div>
      <div id="customPagination">
        <CustomPagination contacts={data} updatePage={setPageData} ntStatus={ntStatus}/>
      </div>
    </div>
  );
}

PostmanTable.propTypes = {
  ntStatus: PropTypes.string,
  functions: PropTypes.object,
};

export default PostmanTable;
