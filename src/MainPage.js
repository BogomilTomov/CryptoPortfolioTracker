import {useEffect, useState} from "react";
import AddTokenModal from "./AddTokenModal";
import PortfolioData from "../configData.json";
import {FaPlus, FaEllipsisV, FaTrash} from "react-icons/fa";

const MainPage = () => {
    const [portfolioData, setPortfolioData] = useState({tokens: [], totalBalance: 0});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tokenSelected, setTokenSelected] = useState(null);

    useEffect(() => {
        checkLocalStorage();
        getUpdatedTokenPrice();
    }, []);
    
    const checkLocalStorage = () => {
        const localStorageVariable = PortfolioData.LOCAL_STORAGE_VARIABLE_NAME;
        
        if (localStorage.getItem(localStorageVariable) != null) {
            setPortfolioData(JSON.parse(localStorage.getItem(localStorageVariable)));
        } else {
            localStorage.setItem(localStorageVariable, JSON.stringify([]));
        }
    }
    
    const getUpdatedTokenPrice = () => {
        if (portfolioData.tokens.length) {
            //const tokenIds = portfolioData.tokens.map(t => t.id).join(',');

            fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
                "method": "GET",
                "headers": {
                        "X-CMC_PRO_API_KEY": "ede53949-3fbc-4b50-af2d-353e5dee260a",
                        "Access-Control-Allow-Origin": "http://localhost:1234",
                        "Access-Control-Allow-Headers": "privatekey",
                        "Access-Control-Allow-Credentials": "true"
                    },
                })
                .then(resp => resp.json())
                .then(data => updateTokenPricesLocally(data.data));
        }
    }

    const updateTokenPricesLocally = (tokensData) => {
        portfolioData.tokens.forEach(token => {
            var correspondingData = tokensData.find(t => t.id == token.id);
            if (correspondingData != undefined) {
                token.currentPrice = correspondingData.quote.USD.price;
            }
        });
        
        setPortfolioData({
            ...portfolioData,
            tokens: portfolioData.tokens
        })
    }
            
    useEffect(() => {
        const localStorageVariable = PortfolioData.LOCAL_STORAGE_VARIABLE_NAME;
        localStorage.setItem(localStorageVariable, JSON.stringify(portfolioData));
    }, [portfolioData]);

    const addTransactionToPortfolio = (tokenId, tokenName, newTransaction) => {
        var token = portfolioData.tokens.find(t => t.id === tokenId);
        if (token == undefined) {
            token = {
                id: tokenId,
                name: tokenName,
                currentPrice: 0,
                transactions: [],
                amount: 0,
                profit: 0,
                avgBuyPrice: 0
            };

            portfolioData.tokens.push(token);
        }
        
        token.transactions.push(newTransaction);
        recalculateTokenStats(token, newTransaction);
        getUpdatedTokenPrice();

        setPortfolioData({
            ...portfolioData,
            tokens: portfolioData.tokens
        });
    };

    const recalculateTokenStats = (token, newTransaction) => {
        token.amount += newTransaction.quantity;
        token.profit += newTransaction.quantity * (newTransaction.currentPrice - newTransaction.pricePerToken);
        recalculateTotalBalance();
    };

    const recalculateTotalBalance = () => {
        portfolioData.totalBalance = 0;
        portfolioData.tokens.forEach(token => {
            token.transactions.forEach(tran => {
            portfolioData.totalBalance += tran.quantity * tran.pricePerToken;
            });
        });
    };

    const removeToken = (token) => {
        portfolioData.tokens = portfolioData.tokens.filter(t => t.id != token.id);
        recalculateTotalBalance();

        setPortfolioData({
            ...portfolioData,
            tokens: portfolioData.tokens
        });
    };

    return (
        <div className="app-container">
            <div className="top-section">
                <div className="current-balance">
                    <div className="current-balance-label">Current Balance</div>
                    <div className="current-balance-amount">{portfolioData.totalBalance}</div>
                </div>
                <button className="ui-control add-new-button" onClick={() => {setTokenSelected(null); setModalIsOpen(true)}}>
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
                            <th>Amount</th>
                            <th>Profit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioData.tokens && portfolioData.tokens.map(token =>
                            <tr key={token.id}>
                                <td>{token.name}</td>
                                <td>{token.currentPrice}</td>
                                <td>{token.amount}</td>
                                <td>{token.profit}</td>
                                <td>
                                    <button onClick={() => {setTokenSelected(token); setModalIsOpen(true)}}><FaPlus/></button>
                                    <button onClick={() => removeToken(token)}><FaTrash/></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {modalIsOpen && <AddTokenModal isOpen={setModalIsOpen} addTransactionToPortfolio={addTransactionToPortfolio} tokenSelected={tokenSelected}/>}
        </div>
    )
};

export default MainPage;