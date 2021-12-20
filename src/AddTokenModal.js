import { render } from "react-dom";
import {useEffect, useState} from "react";
import TokensData from "../tokens.json";
import {FaChevronRight, FaTimes, IconContext} from "react-icons/fa";
import AddTokenList from "./AddTokenList";

const AddTokenModal = ({isOpen}) => {
    const[allTokens, setAllTokens] = useState(TokensData.data);
    const[state, setState] = useState({
        tokenList: TokensData.data.slice(0,100),
        search: ""
    });
    
    useEffect(() => {
        console.log(1)
        // fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=1", {
            //     "method": "GET",
        //     "headers": {
        //         "X-CMC_PRO_API_KEY": "ede53949-3fbc-4b50-af2d-353e5dee260a",
        //         "Access-Control-Allow-Origin": "http://localhost:1234",
        //         "Access-Control-Allow-Headers": "privatekey",
        //         "Access-Control-Allow-Credentials": "true"
        //     },
        // })
        // .then(setAllTokens);
        //setAllTokens(TokensData.data);
    });

    useEffect (() => {
        setState({
            ...state,
            tokenList: filterTokens(state.search)
        })
    }, [state.search])
    
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    
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
        <div className="dark-background" onClick={() => isOpen(false)} />
            <div className="modal">
                <div className="modal-header">
                    <div>Select Coin</div>
                    <button onClick={() => isOpen(false)}><FaTimes color="red"/></button>
                </div>
                <input type="text" className="search-all" name="search" value={state.search} onChange={handleChange} placeholder="Search"/>
                <div>{state.search}</div>
                <div className="token-list-container">
                    <div className="all-token-list">
                        <AddTokenList allTokens={state.tokenList}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTokenModal;