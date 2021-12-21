import { useState } from "react";
import { render } from "react-dom";
import ModalHeader from "./ModalHeader";

const AddTransaction = ({allTokens, selectedToken}) => {
    const [state, setState] = useState({
        
    });
    return (
        <>
            <ModalHeader title="Add Transaction"/>
            <ul className="nav-menu">
                <li className="nav-item nav-item-selected">Buy</li>
                <li className="nav-item">Sell</li>
            </ul>
            <div>{selectedToken.name}</div>
            <div className="input-fields">
                <div className="input-field-container">
                    <p>Quantity</p>
                    <input type="number"/>
                </div>
                <div className="input-field-container">
                    <p>Price per Token</p>
                    <input type="number"/>
                </div>
            </div>
            <div>
                <button></button>
                <button>Fee</button>
                <button>Notes</button>
            </div>
            <div>
                Total spent
            </div>
            <button>Add Transaction</button>
        </>
    )
};

export default AddTransaction;