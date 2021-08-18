import {Table} from "react-bootstrap";
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
    const [userIdUpdated, setUserIdUpdated] = useState(0);
    const [userToUpdate, setUserToUpdate] = useState({userId: 0, ntStatus: undefined});
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({body: "", background: "light"});
    const [showSpinner, setShowSpinner] = useState(false);
    const [showUpdateSpinner, setShowUpdateSpinner] = useState(false);
    const [contactsToPrint, setContactsToPrint] = useState([]);
    const [pageData, setPageData] = useState([]);

    function handleNoModalOption() {
        console.log(`Will not update ${userToUpdate.userId} with status ${userToUpdate.ntStatus}`);
        handleCloseModal();
    }

    async function handleYesModalOption() {
        await updatePostageStatus(userToUpdate.userId, userToUpdate.ntStatus);
        handleCloseModal();
    }

    function handleCloseModal() {
        setUserToUpdate({userId: 0, ntStatus: undefined});
        setShowModal(false);
    }

    function confirmUpdate(userId, status) {
        setShowModal(true);
        setUserToUpdate({userId: userId, ntStatus: status});
    }

    async function updatePostageStatus(userId, status) {
        try {
            setShowUpdateSpinner(true);
            const updatePostageCallable = props.functions.httpsCallable("updateDtPostageStatus")
            await updatePostageCallable({
                ntStatus: status,
                userId: userId,
            });
            setShowUpdateSpinner(false);
            setUserIdUpdated(userId);
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

    let contactsPrinter;
    if (contactsToPrint.length > 0) {
        contactsPrinter = <ContactsPrinter contactsToPrint={contactsToPrint}/>
    }

    useEffect(() => {
        (async () => {
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
                if (error.code !== "not-found") {
                    setToastProps({
                        body: "There was a problem retrieving contacts. Please let the administrator know.",
                        background: "warning"
                    });
                    setShowToast(true);
                    setShowSpinner(false);
                }
                console.error(`Problem retrieving contacts with nt status ${props.ntStatus}`);
                setData([]);
            }
        })();
    }, [props.functions, props.ntStatus, userIdUpdated]);

    return (
        <div id="dataTable">
            <CustomToast setShowToast={setShowToast} showToast={showToast} toastBody={toastProps.body}
                         background={toastProps.background}/>
            <ConfirmationModal showUpdateSpinner={showUpdateSpinner} showModal={showModal}
                               handleCloseModal={handleCloseModal}
                               handleNoModalOption={handleNoModalOption} handleYesModalOption={handleYesModalOption}
                               ntStatus={PostageStatus.NT_SENT}/>
            <LoadingSpinner showSpinner={showSpinner}/>
            <p>Contacts assigned to me that require NTs to be posted.</p>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Update Postage Status</th>
                </tr>
                </thead>
                <tbody>
                <DataRows data={pageData} extractPrintList={setContactsToPrint} confirmUpdate={confirmUpdate}/>
                </tbody>
            </Table>
            <div id="printButton">{contactsPrinter}</div>
            <div id="customPagination">
                <CustomPagination contacts={data} updatePage={setPageData}/>
            </div>
        </div>
    );
}

export default PostmanTable;
