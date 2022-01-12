import {StrictMode} from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import TokenDetails from "./TokenDetails";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/token/:id" element={<TokenDetails />}/>
      </Routes>
    </Router>
  )
};

render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
