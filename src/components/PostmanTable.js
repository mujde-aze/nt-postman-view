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
    const [showUpdateSpinner, setShowUpdateSpinner] = useState(false);
    const [contactsToPrint, setContactsToPrint] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [contactsUpdated, setContactsUpdated] = useState(true);
    const [printListButtonDisabled, setPrintListButtonDisabled] = useState(true);
    const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);

    function handleNoModalOption() {
        console.log(`Will not update the ${contactsToPrint.length} selected contacts to status ${PostageStatus.getTransitionState(props.ntStatus)}`);
        handleCloseModal();
    }

    function handleYesModalOption() {
        if (contactsToPrint.length !== undefined && contactsToPrint.length > 0) {
            setShowUpdateSpinner(true);
            contactsToPrint.forEach(async (contact) => {
                    await updatePostageStatus(contact.id, PostageStatus.getTransitionState(props.ntStatus));
                }
            );
            setShowUpdateSpinner(false);
            setContactsUpdated(true);
            setContactsToPrint([]);
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
            setShowSpinner(false);
            console.error(`Problem updating nt status to ${status} for user ${userId}`);
        }
    }

    useEffect(() => {
        setContactsUpdated(true);
        setContactsToPrint([]);
    }, [props.ntStatus]);

    useEffect(() => {
        (async () => {
            if (contactsUpdated === true) {
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
            }
        })();
    }, [props.functions, props.ntStatus, contactsUpdated]);

    return (
        <div id="dataTable">
            <CustomToast setShowToast={setShowToast} showToast={showToast} toastBody={toastProps.body}
                         background={toastProps.background}/>
            <ConfirmationModal showUpdateSpinner={showUpdateSpinner} showModal={showModal}
                               handleCloseModal={handleCloseModal} contactsSelected={contactsToPrint.length}
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
                <DataRows data={pageData} printList={contactsToPrint}
                          setPrintList={setContactsToPrint} printButtonDisabled={printListButtonDisabled}
                          setPrintButtonDisabled={setPrintListButtonDisabled}
                          updateButtonDisabled={updateButtonDisabled}
                          setUpdateButtonDisabled={setUpdateButtonDisabled}/>
                </tbody>
            </Table>
            <div id="printButton">
                <ContactsPrinter contactsToPrint={contactsToPrint} buttonDisabled={printListButtonDisabled}
                                 setUpdateButtonDisabled={setUpdateButtonDisabled}
                                 setContactsUpdated={setContactsUpdated}/>
            </div>
            <div id="bulkUpdateButton">
                <Button variant="success"
                        onClick={() => confirmUpdate()}
                        disabled={updateButtonDisabled}>Update {contactsToPrint.length} contacts
                    to {PostageStatus.getDisplayName(PostageStatus.getTransitionState(props.ntStatus))}</Button>
            </div>
            <div id="customPagination">
                <CustomPagination contacts={data} updatePage={setPageData}/>
            </div>
        </div>
    );
}

export default PostmanTable;
