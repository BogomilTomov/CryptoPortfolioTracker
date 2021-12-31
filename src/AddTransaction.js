import { useState } from "react";
import { render } from "react-dom";
import ModalHeader from "./ModalHeader";
import AddTransactionMain from "./AddTransactionMain";
import AddTransactionDate from "./AddTransactionDate";
import AddTransactionFee from "./AddTransactionFee";

const AddTransaction = ({allTokens, selectedToken}) => {
    const options = ["Buy", "Sell"];

    const subPages = {
        MAIN: "main",
        DATE: "date",
        FEE: "fee",
        NOTES: "notes"
    }
    
    const [state, setState] = useState({
        selectedToken: selectedToken,
        filteredTokens: allTokens.slice(0,20),
        searchText: '',
        options: options,
        option: options[0],
        quantity: 0,
        pricePerToken: 0,
        fee: 0,
        notes: "",
        totalPrice: 0,
        subPages: subPages,
        currentSubPage: subPages.MAIN
    });


    return (
        <>
            { state.currentSubPage == subPages.MAIN && <AddTransactionMain state={state} setState={setState} options={options}/>}
            { state.currentSubPage == subPages.DATE && <AddTransactionDate />}
            { state.currentSubPage == subPages.FEE && <AddTransactionFee state={state} setState={setState} />}
        </>
    )
};

export default AddTransaction;