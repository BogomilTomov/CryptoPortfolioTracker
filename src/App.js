import {StrictMode} from "react";
import { render } from "react-dom";
import MainPage from "./MainPage";

const App = () => {
  return (
    <div>
        <MainPage/>
    </div>
)
};

render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
