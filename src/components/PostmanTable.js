import {Button, Modal, Table} from "react-bootstrap";
import {useEffect, useState} from "react";

function PostmanTable(props) {
    const functions = props.firebase.app().functions("australia-southeast1");
    //TODO: remove before prod deployment
    functions.useEmulator("localhost", 5001);
    const [data, setData] = useState([]);
    const [userIdUpdated, setUserIdUpdated] = useState(0);
    const [userToUpdate, setUserToUpdate] = useState({userId: 0, ntStatus: undefined});
    const [showModal, setShowModal] = useState(false);

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
        setShowModal(false)
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
        } catch (e) {
            console.error(`Problem updating nt status to ${status} for user ${userId}`);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const getContactsCallable = functions.httpsCallable("getDtContacts")
                const result = await getContactsCallable({
                    ntStatus: props.ntStatus,
                    assignedToMe: false,
                })
                setData(result.data);
            }catch (e) {
                console.error(`Problem retrieving contacts with nt status ${props.ntStatus}`);
            }
        })();
    }, [props.ntStatus, userIdUpdated]);

    let contacts = []
    if (data.length > 0) {
        contacts = data.map((item) => <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>
                <Button variant="warning" onClick={(e) => confirmUpdate(item.id, "nt_sent", e)}>NT Sent</Button>
            </td>
        </tr>);
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Postage Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to set the Postage Status to {props.ntStatus}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNoModalOption}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleYesModalOption}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Update Postage Status</th>
                </tr>
                </thead>
                <tbody>
                {contacts}
                </tbody>
            </Table>
        </div>
    );
}

export default PostmanTable;
