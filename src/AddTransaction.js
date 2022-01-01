import { useState, useEffect } from "react";
import { render } from "react-dom";
import ModalHeader from "./ModalHeader";
import {FaChevronUp, FaChevronDown} from "react-icons/fa";


const AddTransaction = ({allTokens, selectedToken, setModalHeader}) => {
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
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const changeSubPage = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
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
          currentSubPage: subPages.MAIN
        });
    }

    const addFee = (e) => {
        console.log(state.fee)
        setState({
            ...state,
            oldFee: state.fee,
            currentSubPage: subPages.MAIN
        });
    }

    const submit = () => {
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
                                <input  type="number" 
                                        value={state.quantity} 
                                        name="quantity" 
                                        onChange={changeNumericInput}/>
                            </div>
                            <div className="input-field-container">
                                <p>Price per Token</p>
                                <input  type="number" 
                                        value={state.pricePerToken} 
                                        name="pricePerToken" 
                                        onChange={changeNumericInput}/>
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button value={subPages.DATE}
                                    name="currentSubPage"
                                    onClick={changeSubPage}
                                    className="ui-control">
                                Date
                            </button>
                            <button value={subPages.FEE}
                                    name="currentSubPage"
                                    onClick={changeSubPage}
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
            {/* { state.currentSubPage == subPages.DATE && <AddTransactionDate />} */}
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
            { state.currentSubPage == subPages.DATE && 
                <>
                    
                </>
            }
        </>
    )
};

export default AddTransaction;