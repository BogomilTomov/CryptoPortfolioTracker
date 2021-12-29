import { useState } from "react";
import { render } from "react-dom";
import ModalHeader from "./ModalHeader";
import {FaChevronUp, FaChevronDown} from "react-icons/fa";

const AddTransaction = ({allTokens, selectedToken}) => {
    const options = ["Buy", "Sell"];

    const [state, setState] = useState({
        selectedToken: selectedToken,
        filteredTokens: allTokens.slice(0,20),
        searchText: '',
        option: options[0],
        quantity: 0,
        pricePerToken: 0,
        fee: 0,
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
        const selectedTokenContainer = document.getElementById('selectedTokenContainer');
        const dropdownContainer = document.getElementById('dropdownContainer');
        const dropdownInput = document.getElementById('dropdownInput');
        const tokensDropdown = document.getElementById('dropdown');
        
        selectedTokenContainer.classList.toggle('hidden-element');
        dropdownContainer.classList.toggle('hidden-element');
        tokensDropdown.classList.toggle('hidden-element');
        dropdownInput.focus();
    }

    const hideTokenDropdown = () => {
        const selectedTokenContainer = document.getElementById('selectedTokenContainer');
        const dropdownContainer = document.getElementById('dropdownContainer');
        const tokensDropdown = document.getElementById('dropdown');

        selectedTokenContainer.classList.toggle('hidden-element');
        dropdownContainer.classList.toggle('hidden-element');
        tokensDropdown.classList.toggle('hidden-element');
    }
    
    const filterTokens = (e) => {
        const searchText = e.target.value;
        const input = searchText.toLowerCase();
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
            filteredTokens: results,
            searchText: searchText
        });
    }

    const selectToken = (token) => {
        setState({
            ...state,
            selectedToken: token
        })
    };

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
            <div id="selectedTokenContainer" className="select-token-container" onClick={showTokenDropdown}>
                <div onChange={filterTokens}>{state.selectedToken.name}</div>
                <FaChevronDown/>
            </div>
            <div id="dropdownContainer" className="select-token-container hidden-element">
                <input id="dropdownInput" className="dropdown-input" onChange={filterTokens} onBlur={hideTokenDropdown} value={state.searchText} name="searchText"/>
                <FaChevronUp/>
            </div>
            <div id="dropdown" className="token-dropdown hidden-element">
                {state.filteredTokens.map(token =>
                    <div key={token.id} className="dropdown-token" onMouseDown={() => selectToken(token)}>{token.name}</div>  
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
                <div className="buttons-container">
                    <button>Date</button>
                    <button>Fee</button>
                    <button>Notes</button>
                </div>
                <div className="total-spent">
                    <div>Total spent</div>
                    <div>${state.quantity * state.pricePerToken + state.fee}</div>
                </div>
            </div>
            <button onClick={submit}>Add Transaction</button>
        </>
    )
};

export default AddTransaction;