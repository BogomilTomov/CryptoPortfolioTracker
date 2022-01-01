import { render } from "react-dom";
import {FaTimes} from "react-icons/fa";

const ModalHeader = ({title, hasCloseButton}) => {
    return (
        <>
            <div className="modal-header">
                <div>{title}</div>
                {hasCloseButton && <button onClick={() => isOpen(false)}><FaTimes color="red"/></button>}
            </div>
        </>
    )
};

export default ModalHeader;