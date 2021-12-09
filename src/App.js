import {StrictMode, useState, useEffect} from "react";
import { render } from "react-dom";
import Card from "./Card";

const App = () => {
    const [portfolioTokens, setPortfolioTokens] = useState([]);
    
    useEffect(() => {
        setPortfolioTokens(JSON.parse(localStorage.getItem('portfolioTokens')));
      }, []);

  return (
      <div>
          {portfolioTokens.map(token =>
            <Card key={token} tokenName={token}/>
          )}
      </div>
  )
};

render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
