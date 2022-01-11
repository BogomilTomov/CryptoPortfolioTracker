import { useState, useEffect } from "react";
import { render } from "react-dom";
import {FaChevronRight} from "react-icons/fa";
import ModalHeader from "./ModalHeader";

const AddTokenList = ({allTokens, selectToken}) => {
    const[state, setState] = useState({
        displayedTokens: [],
        search: ''
    });

    const handleChange = e => {
        setState({
            ...state,
            search: e.target.value
        })
    }

    useEffect (() => {
        setState({
            ...state,
            displayedTokens: filterTokens(state.search)
        })
    }, [state.search, allTokens]);
    
    const filterTokens = input => {
        input = input.toLowerCase();
        if (input.trim().length === 0) {
            return allTokens.slice(0, 50);
        } else {
            const results = [];
            for (let token of allTokens){
                if (token.name.toLowerCase().includes(input) || token.symbol.toLowerCase().includes(input)){
                    results.push(token);
                }
                if (results.length === 50){
                    break;
                }
            }

            return results;
        }
    }

    return (
        <>
            <input type="text" autoFocus className="search-all" name="search" value={state.search} onChange={handleChange} placeholder="Search"/>
            <div className="token-list-container">
                <div className="all-token-list">
                    {state.displayedTokens.map(token =>
                        <button key={token.id} className="token-row" onClick={() => selectToken(token)}>
                            <div>
                                <img className="token-logo" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`}></img> 
                                <span>
                                    {token.name} {token.symbol}
                                </span>
                            </div>
                            <FaChevronRight/>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
};

export default AddTokenList;