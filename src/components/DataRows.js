import {Button} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";

function DataRows(props) {
    if (props.data.length > 0) {
        return (props.data.map((item) => <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>
                <Button variant="primary" onClick={(e) => props.confirmUpdate(item.id, PostageStatus.NT_SENT, e)}>NT
                    Sent</Button>
            </td>
        </tr>));
    } else {
        return ([<tr key="1" align="center">
            <td colSpan="3">No contacts to display.</td>
        </tr>]);
    }
}

export default DataRows;
