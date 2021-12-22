import { useState } from "react";
import { render } from "react-dom";
import ModalHeader from "./ModalHeader";
import {FaChevronUp, FaChevronDown} from "react-icons/fa";

const AddTransaction = ({allTokens, selectedToken}) => {
    const options = ["Buy", "Sell"];

    const [state, setState] = useState({
        selectedToken: selectedToken,
        filteredTokens: [],
        searchText: '',
        option: options[0],
        quantity: 0,
        pricePerToken: 0,
        notes: "",
        totalPrice: 0
    });

    const selectOption = (e) => {
        const clickedOption = e.target.id;
        if (clickedOption !== state.option) {
            state.option = clickedOption;
            
            for (let option of options){
                document.getElementById(option).classList.remove('nav-item-selected');
            }

            e.target.classList.add('nav-item-selected');
        }
    };

    const changeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const showTokenDropdown = (e) => {
        const selectedTokenInput = document.getElementById('selectedToken');
        selectedTokenInput.setAttribute('contenteditable', 'true');
        selectedTokenInput.textContent = state.searchText;
        selectedTokenInput.focus();

        const tokensDropdown = document.getElementById('dropdown');
        tokensDropdown.classList.toggle('hidden-element');
    }

    const hideTokenDropdown = () => {
        const selectedTokenInput = document.getElementById('selectedToken');
        selectedTokenInput.setAttribute('contenteditable', 'false');
        selectedTokenInput.textContent = state.selectedToken.name;
        
        const tokensDropdown = document.getElementById('dropdown');
        tokensDropdown.classList.toggle('hidden-element');
    }
    
    const filterTokens = (e) => {
        console.log(1)
        state.searchText = e.target.textContent;
        const input = e.target.textContent.toLowerCase();
        const results = [];
        
        for (let token of allTokens){
            if (token.name.toLowerCase().includes(input)){
                results.push(token);
            }
            if (results.length === 20){
                break;
            }
        }

        setState({
            ...state,    
            filteredTokens: results
        });
    }

    const submit = () => {
        console.log(state)
    }

    return (
        <>
            <ModalHeader title="Add Transaction"/>
            <ul className="nav-menu">
                {options.map(option => 
                    <li key={option}
                        id={option}
                        className={['nav-item', option === state.option ? 'nav-item-selected' : ''].join(' ')} 
                        onClick={selectOption}>{option}
                    </li>
                )}
            </ul>
            <div className="select-token-container" 
                 onClick={showTokenDropdown} 
                 onBlur={hideTokenDropdown} 
                >
                <div id="selectedToken" onChange={filterTokens}>{state.selectedToken.name}</div>
                <FaChevronDown/>
            </div>
            <div id="dropdown" className="token-dropdown hidden-element">
                {state.filteredTokens.map(token =>
                    <div>{token.name}</div>    
                )}
            </div>
            <div className="input-section">
                <div className="input-fields">
                    <div className="input-field-container">
                        <p>Quantity</p>
                        <input  type="number" 
                                value={state.quantity} 
                                name="quantity" 
                                onChange={changeState}/>
                    </div>
                    <div className="input-field-container">
                        <p>Price per Token</p>
                        <input  type="number" 
                                value={state.pricePerToken} 
                                name="pricePerToken" 
                                onChange={changeState}/>
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
            </div>
            <button onClick={submit}>Add Transaction</button>
        </>
    )
};

export default AddTransaction;