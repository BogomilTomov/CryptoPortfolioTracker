import { render } from "react-dom";
import {useEffect, useState} from "react";
import TokensData from "../tokens.json";
import AddTokenList from "./AddTokenList";
import AddTransaction from "./AddTransaction";

const AddTokenModal = ({isOpen}) => {
    const[state, setState] = useState({
        allTokens: TokensData.data,
        tokenSelected: null
    });
    
    useEffect(() => {
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

    const selectToken = (token) => {
        setState({
            ...state,
            tokenSelected: token
        })
    }

    return (
        <>
        <div className="dark-background" onClick={() => isOpen(false)} />
            <div className="modal">
                { state.tokenSelected !== null 
                    ? <AddTransaction allTokens={state.allTokens} selectedToken={state.tokenSelected}/>
                    : <AddTokenList allTokens={state.allTokens} selectToken={selectToken}/>
                }
            </div>
        </>
    );
};

export default AddTokenModal;