import { render } from "react-dom";

const Card = ({token}) => {
  return (
    <div>
      <tr>
        <td>{token.name}</td>
        <td>{token.amount}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </div>
  );
};

export default Card;