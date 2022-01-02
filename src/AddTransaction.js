import { useState, useEffect } from "react";
import {FaChevronUp, FaChevronDown} from "react-icons/fa";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import PortfolioData from "../configData.json";

const AddTransaction = ({allTokens, selectedToken, setModalHeader, isOpen, addTokenToPortfolio}) => {
    const options = ["Buy", "Sell"];

    const subPages = {
        MAIN: "Add Transaction",
        DATE: "Date",
        FEE: "Fee"
    }
    
    const [state, setState] = useState({
        selectedToken: selectedToken,
        filteredTokens: allTokens.slice(0, 20),
        searchText: '',
        option: options[0],
        quantity: null,
        pricePerToken: null,
        fee: null,
        oldFee: null,
        totalPrice: 0,
        date: new Date(),
        oldDate: new Date(),
        currentSubPage: subPages.MAIN
    });

    useEffect(() => {
        setModalHeader(state.currentSubPage);
    }, [state.currentSubPage]);

    useEffect (() => {
        tryRecalculateTotal();
    }, [state.quantity, state.pricePerToken, state.fee])

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

    const changeNumericInput = (e) => {
        var numericInput = isNaN(e.target.value) ? null : e.target.value;

        setState({
            ...state,
            [e.target.name]: numericInput,
        });

        clearErrorMessage(e.target.id);
    }

    const clearErrorMessage = (property) => {
        const errorElement = document.getElementById(`${property}Error`);

        if (errorElement) {
            errorElement.classList.add('hidden-element');
        }
    }

    const changeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const changeDate = (date) => {
        setState({
            ...state,
            date: date,
        });
    }

    const tryRecalculateTotal = () => {
        var quantity = isNaN(state.quantity) ? 0 : Number(state.quantity);
        var pricePerToken = isNaN(state.pricePerToken) ? 0 : Number(state.pricePerToken);
        var fee = isNaN(state.fee) ? 0 : Number(state.fee);
        var total = quantity * pricePerToken + fee;

        setState({
            ...state,
            totalPrice: total
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

    const goBackToAddTransaction = () => {
        setState({
          ...state,
          fee: state.oldFee,
          date: state.oldDate,
          currentSubPage: subPages.MAIN
        });
    }

    const addFee = (e) => {
        setState({
            ...state,
            oldFee: state.fee,
            currentSubPage: subPages.MAIN
        });
    }

    const saveDate = (e) => {
        setState({
            ...state,
            oldDate: state.date,
            currentSubPage: subPages.MAIN
        });
    }

    const submit = () => {
        const inputsAreValid = validateInput();
        if (inputsAreValid) {
            const newTransaction = {
                type: state.option,
                quantity: Number(state.quantity),
                pricePerToken: Number(state.pricePerToken),
                fee: Number(state.fee),
                total: Number(state.totalPrice),
                date: state.date,
                id: state.selectedToken.id,
                name: state.selectedToken.name
            }

            addTokenToPortfolio(newTransaction)
            isOpen(false);
        }
    }

    const validateInput = () => {
        const inputsToCheck = [
            {property: "quantity", displayName: "Quantity"}, 
            {property: "pricePerToken", displayName: "Price"}
        ];
        let isValid = true;
        
        inputsToCheck.forEach(input => {
            if (state[input.property] == null || state[input.property] == 0) {
                const errorElement = document.getElementById(`${input.property}Error`);
                const errorMessage = state[input.property] == 0 
                    ? `${input.displayName} must be > 0` 
                    : `${input.displayName} is not valid`;
                errorElement.classList.remove('hidden-element');
                errorElement.textContent = errorMessage;
                isValid = false;
            }
        })
        
        return isValid;
    }

    return (
        <>
            { state.currentSubPage == subPages.MAIN &&        
                <>     
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
                                <input  id="quantity"
                                        type="number" 
                                        value={state.quantity} 
                                        name="quantity" 
                                        onChange={changeNumericInput}/>
                                <div id="quantityError" className="hidden-element">Error</div>
                            </div>
                            <div className="input-field-container">
                                <p>Price per Token</p>
                                <input  id="pricePerToken"
                                        type="number" 
                                        value={state.pricePerToken} 
                                        name="pricePerToken" 
                                        onChange={changeNumericInput}/>
                                <div id="pricePerTokenError" className="hidden-element">Error</div>
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button value={subPages.DATE}
                                    name="currentSubPage"
                                    onClick={changeState}
                                    className="ui-control">
                                {state.date.toLocaleString()}
                            </button>
                            <button value={subPages.FEE}
                                    name="currentSubPage"
                                    onClick={changeState}
                                    className="ui-control">
                                $ {(state.fee == null || state.fee == '' ? 'Fee' : state.fee)}
                            </button>
                        </div>
                        <div className="total-spent">
                            <div>Total spent</div>
                            <div>${state.totalPrice}</div>
                        </div>
                    </div>
                    <button onClick={submit}>Add Transaction</button>
                </>     

            }
            { state.currentSubPage == subPages.DATE && 
                <>
                    <Calendar value={state.date} name="date" onChange={changeDate}/>
                    <div>
                        <button className="ui-control" onClick={goBackToAddTransaction}>Back</button>
                        <button className="ui-control" onClick={saveDate}>Change Date</button>
                    </div>
                </>
            }
            { state.currentSubPage == subPages.FEE && 
                <>
                    <input  type="number"
                            value={state.fee}
                            name="fee"
                            onChange={changeNumericInput}
                            />
                    <div>
                        <button className="ui-control" onClick={goBackToAddTransaction}>Back</button>
                        <button className="ui-control" onClick={addFee}>Add Fee</button>
                    </div>
                </>
            }
        </>
    )
};

export default AddTransaction;