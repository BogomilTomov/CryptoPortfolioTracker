import {useEffect, useState} from "react";
import TokensData from "../tokens.json";
import AddTokenList from "./AddTokenList";
import AddTransaction from "./AddTransaction";
import {FaTimes} from "react-icons/fa";

const AddTokenModal = ({isOpen, addTransactionToPortfolio, tokenSelected}) => {
    const[state, setState] = useState({
        allTokens: TokensData.data,
        tokenSelected: tokenSelected || null,
        modalHeader: "Select Token"
    });

    const setModalHeader = (title) => {
        setState({
            ...state,
            modalHeader: title
        });
    }

    useEffect(() => {
        // fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map", {
        //     "method": "GET",
        //     "headers": {
        //         "X-CMC_PRO_API_KEY": "ede53949-3fbc-4b50-af2d-353e5dee260a",
        //         "Access-Control-Allow-Origin": "http://localhost:1234",
        //         "Access-Control-Allow-Headers": "privatekey",
        //         "Access-Control-Allow-Credentials": "true"
        //     },
        // })
        // .then(resp => resp.json())
        // .then(data => setState({...state, allTokens: data.data}));
    }, []);

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
                <div className="modal-header">
                    <div>{state.modalHeader}</div>
                    <button onClick={() => isOpen(false)}><FaTimes color="red"/></button>
                </div>
                { state.tokenSelected !== null 
                    ? <AddTransaction allTokens={state.allTokens} selectedToken={state.tokenSelected} setModalHeader={setModalHeader} isOpen={isOpen} addTransactionToPortfolio={addTransactionToPortfolio}/>
                    : <AddTokenList allTokens={state.allTokens} selectToken={selectToken}/>
                }
            </div>
        </>
    );
};

export default AddTokenModal;