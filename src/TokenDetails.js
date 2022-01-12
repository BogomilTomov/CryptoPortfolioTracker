import { useState } from "react";
import { FaTrash} from "react-icons/fa";
import { formatNumber } from "./Utils";

const TokenDetails = ({ token, setModalIsOpen, setTokenSelected, updateTokenTransactions }) => {
  const removeTransaction = (transactionId) => {
    token.transactions = token.transactions.filter(tran => tran.id != transactionId);
    console.log(token)
    updateTokenTransactions(token);
  };

  return (
    <>
    <div className="top-section">
        <div className="current-balance">
            <div className="current-balance-label">{token.name} Balance</div>
            <div className="current-balance-amount">{formatNumber(token.amount * token.currentPrice)}</div>
        </div>
        <button className="ui-control add-new-button" onClick={() => {setTokenSelected(token); setModalIsOpen(true)}}>
            Add Transaction
        </button>
    </div>
    <div>
        <div className="token-list-heading">Your Tokens</div>
        <table className="tokens-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Fees</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {token.transactions && token.transactions.map(tran =>
                <tr key={tran.id}>
                    <td>{tran.quantity > 0 ? 'Buy' : 'Sell'}</td>
                    <td>{formatNumber(tran.pricePerToken)}</td>
                    <td>
                        <div>{formatNumber(tran.quantity)}</div>
                        <div>{formatNumber(tran.quantity * tran.pricePerToken)}</div>
                    </td>
                    <td>
                      {formatNumber(tran.fee)}
                    </td>
                    <td>
                     <button onClick={() => removeTransaction(tran.id)}><FaTrash/></button>
                    </td>
                </tr>
              )}
            </tbody>
        </table>
    </div>
</>
  )
};

export default TokenDetails;