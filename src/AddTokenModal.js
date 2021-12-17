import { render } from "react-dom";
import {useEffect, useState} from "react";
import TokensData from "../tokens.json";
import {FaChevronRight, FaTimes, IconContext} from "react-icons/fa";

const AddTokenModal = ({isOpen}) => {
    const[allTokens, setAllTokens] = useState([]);

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
        setAllTokens(TokensData.data);
    }, []);

    return (
        <>
        <div className="dark-background" onClick={() => isOpen(false)} />
            <div className="modal">
                <div className="modal-header">
                    <div>Select Coin</div>
                    <button onClick={() => isOpen(false)}><FaTimes color="red"/></button>
                </div>
                <input type="text" className="search-all" placeholder="Search"/>
                <div className="token-list-container">
                    <div className="all-token-list">
                        {allTokens.map(token =>
                            <button key={token.id} className="token-row">
                                <div>
                                    {token.name} {token.symbol}
                                </div>
                                <FaChevronRight/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTokenModal;