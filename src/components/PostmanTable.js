import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import StatusChangeConfirmation from "./StatusChangeConfirmation";

function PostmanTable(props) {
    const functions = props.firebase.app().functions("australia-southeast1");
    functions.useEmulator("localhost", 5001);
    const [data, setData] = useState([]);
    const [itemDeleted, setItemDeleted] = useState(0);

    async function updatePostageStatus(userId, status) {
        handleShow()
        /*const updatePostageCallable = functions.httpsCallable("updateDtPostageStatus")
        const result = await updatePostageCallable({
            ntStatus: status,
            userId: userId,
        });
        setItemDeleted(userId);*/
    }

    function handleShow(){
        return true;
    }

    useEffect( () => {
        (async () => {
            const getContactsCallable = functions.httpsCallable("getDtContacts")
            const result = await getContactsCallable({
                ntStatus: props.ntStatus,
            })
            setData(result.data);
        })();
    }, [props.ntStatus, itemDeleted]);

    let contacts = []
    if(data.length > 0) {
        contacts = data.map((item) => <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>
                <Button variant="warning" onClick={(e) => updatePostageStatus(item.id, "nt_sent", e)}>NT Sent</Button>
            </td>
        </tr>);
    }

    return (
        <div>
            <StatusChangeConfirmation show={handleShow} />
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
