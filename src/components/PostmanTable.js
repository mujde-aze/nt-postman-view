import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import CustomToast from "./CustomToast";
import ConfirmationModal from "./ConfirmationModal";
import DataRows from "./DataRows";

function PostmanTable(props) {
    const functions = props.functions
    const [data, setData] = useState([]);
    const [userIdUpdated, setUserIdUpdated] = useState(0);
    const [userToUpdate, setUserToUpdate] = useState({userId: 0, ntStatus: undefined});
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({body: "", background: "light"});

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
            const updatePostageCallable = functions.httpsCallable("updateDtPostageStatus")
            await updatePostageCallable({
                ntStatus: status,
                userId: userId,
            });
            setUserIdUpdated(userId);
        } catch (error) {
            setToastProps({
                body: "There was a problem updating the postage status. Please let the administrator know.",
                background: "warning"
            });
            setShowToast(true)
            console.error(`Problem updating nt status to ${status} for user ${userId}`);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const getContactsCallable = functions.httpsCallable("getDtContacts")
                const result = await getContactsCallable({
                    ntStatus: props.ntStatus,
                    assignedToMe: true,
                })
                setData(result.data);
            } catch (error) {
                if (error.code !== "not-found") {
                    setToastProps({
                        body: "There was a problem retrieving contacts. Please let the administrator know.",
                        background: "warning"
                    });
                    setShowToast(true)
                }
                console.error(`Problem retrieving contacts with nt status ${props.ntStatus}`);
                setData([]);
            }
        })();
    }, [props.ntStatus, userIdUpdated]);

    return (
        <div>
            <CustomToast setShowToast={setShowToast} showToast={showToast} toastBody={toastProps.body}
                         background={toastProps.background}/>
            <ConfirmationModal showModal={showModal} handleCloseModal={handleCloseModal}
                               handleNoModalOption={handleNoModalOption} handleYesModalOption={handleYesModalOption}/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Update Postage Status</th>
                </tr>
                </thead>
                <tbody>
                    <DataRows data={data} confirmUpdate={confirmUpdate}/>
                </tbody>
            </Table>
        </div>
    );
}

export default PostmanTable;
