import {useEffect, useState} from "react";
import AddTokenModal from "./AddTokenModal";
import PortfolioData from "../configData.json";

import TokenDetails from "./TokenDetails";
import PortfolioOverview from "./PortfolioOverview";

const MainPage = () => {
    const [tokenTransactions, setTokenTransactions] = useState(null)
    const [portfolioData, setPortfolioData] = useState({tokens: [], totalBalance: 0});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tokenSelected, setTokenSelected] = useState(null);

    useEffect(() => {
        checkLocalStorage();
    }, []);

    useEffect(() => {
        recalculateTotalBalance();
        getUpdatedTokenPrices();
    }, [portfolioData.tokens.length]);
    
    const checkLocalStorage = () => {
        const localStorageVariable = PortfolioData.LOCAL_STORAGE_VARIABLE_NAME;
        
        if (localStorage.getItem(localStorageVariable) != null) {
            setPortfolioData(JSON.parse(localStorage.getItem(localStorageVariable)));
        } else {
            localStorage.setItem(localStorageVariable, JSON.stringify([]));
        }
    }
    
    const getUpdatedTokenPrices = () => {
        if (portfolioData.tokens.length) {
            const tokenIds = portfolioData.tokens.map(t => t.id).join(',');

            fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${tokenIds}`, {
                "method": "GET",
                "headers": {
                        "X-CMC_PRO_API_KEY": "ede53949-3fbc-4b50-af2d-353e5dee260a",
                        "Access-Control-Allow-Origin": "http://localhost:1234",
                        "Access-Control-Allow-Headers": "privatekey",
                        "Access-Control-Allow-Credentials": "true"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.data != undefined) {
                    updateTokenPricesLocally(data.data);
                }
            });
        }
    }

    const updateTokenPricesLocally = (tokensData) => {
        portfolioData.tokens.forEach(token => {
            var correspondingData = tokensData[token.id];
            if (correspondingData != undefined) {
                token.currentPrice = correspondingData.quote.USD.price;
            }
        });
        
        setPortfolioData({
            ...portfolioData,
            tokens: portfolioData.tokens
        });
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
                currentPrice: newTransaction.currentPrice,
                transactions: [],
                amount: 0,
                profit: 0,
                avgBuyPrice: 0,
                lastTransactionId: 0
            };

            portfolioData.tokens.push(token);
        }

        newTransaction.id = ++token.lastTransactionId;
        
        token.transactions.push(newTransaction);
        recalculateTokenStats(token, newTransaction);

        setPortfolioData({
            ...portfolioData,
            tokens: portfolioData.tokens
        });
    };

    const updateToken = (updatedToken) => {
        if (updatedToken == null) {
            setTokenTransactions(null);
            return;
        }

        const token = portfolioData.tokens.find(t => t.id == updatedToken.id);

        if (token != undefined) {
            
            if (updatedToken.transactions.length == 0) {
                portfolioData.tokens = portfolioData.tokens.filter(t => t.id != token.id);
                recalculateTotalBalance();
            } else {
                token.transactions = [...updatedToken.transactions];
                recalculateTokenStats(token);
            }

            setPortfolioData({
                ...portfolioData,
                tokens: portfolioData.tokens
            });
        }
    };

    const recalculateTokenStats = (token, newTransaction) => {
        if (newTransaction != undefined) {
            token.amount += newTransaction.quantity;
            token.profit += newTransaction.quantity * (newTransaction.currentPrice - newTransaction.pricePerToken);
        } else {
            token.amount = 0
            token.profit = 0;

            token.transactions.forEach(tran => {
                token.amount += tran.quantity;
                token.profit += tran.quantity * (tran.currentPrice - tran.pricePerToken);
            });
        }

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

    const seeTransactions = (token) => {
        window.location.href = `/token/${token.id}`;
    }

    return (
        <div className="app-container">
            { tokenTransactions == null 
                ? <PortfolioOverview portfolioData={portfolioData} setPortfolioData={setPortfolioData} setTokenSelected={setTokenSelected} setModalIsOpen={setModalIsOpen} setTokenTransactions={setTokenTransactions}/>
                : <TokenDetails token={tokenTransactions} setTokenSelected={setTokenSelected} setModalIsOpen={setModalIsOpen} updateToken={updateToken} /> }
            {modalIsOpen && <AddTokenModal isOpen={setModalIsOpen} addTransactionToPortfolio={addTransactionToPortfolio} tokenSelected={tokenSelected} />}
        </div>
    )
};

export default MainPage;