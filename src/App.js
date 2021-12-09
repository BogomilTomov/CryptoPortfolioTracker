import {StrictMode} from "react";
import { render } from "react-dom";

const App = () => {
  return <div>Hi</div>;
};

render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
