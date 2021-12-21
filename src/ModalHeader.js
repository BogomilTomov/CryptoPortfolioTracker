import { render } from "react-dom";
import {FaTimes} from "react-icons/fa";

const ModalHeader = ({title}) => {
    return (
        <>
            <div className="modal-header">
                <div>{title}</div>
                <button onClick={() => isOpen(false)}><FaTimes color="red"/></button>
            </div>
        </>
    )
};

export default ModalHeader;