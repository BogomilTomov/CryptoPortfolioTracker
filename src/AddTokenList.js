import { render } from "react-dom";
import {FaChevronRight, FaTimes, IconContext} from "react-icons/fa";

const AddTokenList = ({allTokens}) => {
    return (
        <>
            {allTokens.map(token =>
                <button key={token.id} className="token-row">
                    <div>
                        {token.name} {token.symbol}
                    </div>
                    <FaChevronRight/>
                </button>
            )}
        </>
    )
};

export default AddTokenList;