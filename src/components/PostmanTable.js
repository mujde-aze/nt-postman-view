import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import CustomToast from "./CustomToast";
import ConfirmationModal from "./ConfirmationModal";
import DataRows from "./DataRows";
import LoadingSpinner from "./LoadingSpinner";
import {PostageStatus} from "../models/PostageStatus";
import ContactsPrinter from "./ContactsPrinter";
import CustomPagination from "./CustomPagination";

function PostmanTable(props) {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({body: "", background: "light"});
    const [showSpinner, setShowSpinner] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [prevNumberOfSelectedContact, setPrevNumberOfSelectedContact] = useState(0);
    const [pageData, setPageData] = useState([]);
    const [contactsUpdated, setContactsUpdated] = useState(false);
    const [printListButtonDisabled, setPrintListButtonDisabled] = useState(true);
    const [updateButtonDisabled, setUpdateButtonDisabled] = useState(false);
    const [displayPrintButton, setDisplayPrintButton] = useState(true);
    const [contactsPrinted, setContactsPrinted] = useState(false);

    ensureCurrentListBeforeUpdate();

    function ensureCurrentListBeforeUpdate() {
        if (props.ntStatus === PostageStatus.NEEDS_NT) {
            if (prevNumberOfSelectedContact !== selectedContacts.length) {
                if (updateButtonDisabled === false) {
                    setUpdateButtonDisabled(true);
                }
                setPrevNumberOfSelectedContact(selectedContacts.length);
            }

            if (printListButtonDisabled === true && selectedContacts.length > 0) {
                setPrintListButtonDisabled(false);
            }

            if (printListButtonDisabled === false && selectedContacts.length === 0) {
                setPrintListButtonDisabled(true);
            }

            if (updateButtonDisabled === false && selectedContacts.length === 0) {
                setUpdateButtonDisabled(true);
            }
        }
    }

    function handleNoModalOption() {
        console.log(`Will not update the ${selectedContacts.length} selected contacts to status ${PostageStatus.getTransitionState(props.ntStatus)}`);
        handleCloseModal();
    }

    function handleYesModalOption() {
        if (selectedContacts.length !== undefined && selectedContacts.length > 0) {
            setShowSpinner(true);
            selectedContacts.forEach(async (contact) => {
                    await updatePostageStatus(contact.id, PostageStatus.getTransitionState(props.ntStatus));
                }
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
            const updatePostageCallable = props.functions.httpsCallable("updateDtPostageStatus")
            await updatePostageCallable({
                ntStatus: status,
                userId: userId,
            });
        } catch (error) {
            setToastProps({
                body: "There was a problem updating the postage status. Please let the administrator know.",
                background: "warning"
            });
            setShowToast(true);
            console.error(`Problem updating nt status to ${status} for user ${userId}`);
        }
    }

    useEffect(() => {
        setContactsPrinted(false);
    }, [setContactsPrinted, selectedContacts]);

    useEffect(() => {
        if (contactsPrinted === true) {
            setUpdateButtonDisabled(false);
            setContactsUpdated(false);
        }
    }, [contactsPrinted]);

    useEffect(() => {
        setSelectedContacts([]);
        if (props.ntStatus === PostageStatus.NEEDS_NT) {
            setDisplayPrintButton(true);
        } else {
            setDisplayPrintButton(false);
        }
    }, [props.ntStatus]);

    useEffect(() => {
        (async () => {
            if (props.ntStatus === PostageStatus.NT_SENT) {
                setContactsUpdated(false);
                setUpdateButtonDisabled(false);
            }

            try {
                setShowSpinner(true);
                const getContactsCallable = props.functions.httpsCallable("getDtContacts")
                const result = await getContactsCallable({
                    ntStatus: props.ntStatus,
                    assignedToMe: true,
                })
                setShowSpinner(false);
                setData(result.data);
            } catch (error) {
                console.log(error.code)
                if (error.code !== "not-found") {
                    setToastProps({
                        body: "There was a problem retrieving contacts. Please let the administrator know.",
                        background: "warning"
                    });
                    setShowToast(true);
                }
                console.warn(`No contacts with nt status ${props.ntStatus}`);
                setShowSpinner(false);
                setData([]);
            }
        })();
    }, [props.functions, props.ntStatus, contactsUpdated]);

    return (
        <div id="dataTable">
            <CustomToast setShowToast={setShowToast} showToast={showToast} toastBody={toastProps.body}
                         background={toastProps.background}/>
            <ConfirmationModal showModal={showModal} handleCloseModal={handleCloseModal}
                               contactsSelected={selectedContacts.length}
                               handleNoModalOption={handleNoModalOption} handleYesModalOption={handleYesModalOption}
                               transitionToStatus={PostageStatus.getTransitionState(props.ntStatus)}/>
            <LoadingSpinner showSpinner={showSpinner}/>
            <p>Contacts assigned to me with status <strong>{PostageStatus.getDisplayName(props.ntStatus)}</strong>.</p>
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
                                     setContactsPrinted={setContactsPrinted} ntStatus={props.ntStatus}/>
                    : undefined
                }
            </div>
            <div id="bulkUpdateButton">
                <Button variant="success"
                        onClick={() => confirmUpdate()}
                        disabled={updateButtonDisabled}>Update {selectedContacts.length} contacts
                    to {PostageStatus.getDisplayName(PostageStatus.getTransitionState(props.ntStatus))}</Button>
            </div>
            <div id="customPagination">
                <CustomPagination contacts={data} updatePage={setPageData}/>
            </div>
        </div>
    );
}

export default PostmanTable;
