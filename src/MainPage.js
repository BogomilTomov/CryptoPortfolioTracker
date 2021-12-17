import { render } from "react-dom";
import {useEffect, useState} from "react";
import Card from "./Card";
import AddTokenModal from "./AddTokenModal";
import PortfolioData from "../configData.json";

const MainPage = () => {
    const [portfolioData, setPortfolioData] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(true);
    
    useEffect(() => {
        const localStorageVariable = PortfolioData.LOCAL_STORAGE_VARIABLE_NAME;
        setPortfolioData(JSON.parse(localStorage.getItem("portfolioData")));
    }, []);

    return (
        <div className="app-container">
            <div className="top-section">
                <div className="current-balance">
                    <div className="current-balance-label">Current Balance</div>
                    <div className="current-balance-amount">1000</div>
                </div>
                <button className="ui-control add-new-button" onClick={() => setModalIsOpen(true)}>
                    Add New
                </button>
            </div>
            <div>
                <div className="token-list-heading">Your Tokens</div>
                <table className="tokens-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24H</th>
                            <th>Amount</th>
                            <th>Profit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioData.tokens && portfolioData.tokens.map(token =>
                            <tr key={token.name}>
                                <td>{token.name}</td>
                                <td>{token.amount}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {modalIsOpen && <AddTokenModal isOpen={setModalIsOpen} />}
        </div>
    )

};

export default MainPage;