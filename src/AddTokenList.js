import { useState, useEffect } from "react";
import { render } from "react-dom";
import {FaChevronRight} from "react-icons/fa";
import ModalHeader from "./ModalHeader";

const AddTokenList = ({allTokens, selectToken}) => {
    const[state, setState] = useState({
        displayedTokens: allTokens.slice(0,100),
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
    }, [state.search])
    
    const filterTokens = input => {
        input = input.toLowerCase();
        if (input.trim().length === 0) {
            return allTokens.slice(0,100);
        } else {
            const results = [];
            for (let token of allTokens){
                if (token.name.toLowerCase().includes(input)){
                    results.push(token);
                }
                if (results.length === 100){
                    break;
                }
            }

            return results;
        }
    }

    return (
        <>
            <ModalHeader title="Select Coin"/>
            <input type="text" className="search-all" name="search" value={state.search} onChange={handleChange} placeholder="Search"/>
            <div className="token-list-container">
                <div className="all-token-list">
                    {state.displayedTokens.map(token =>
                        <button key={token.id} className="token-row" onClick={() => selectToken(token)}>
                            <div>
                                {token.name} {token.symbol}
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