import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";
// Tawk.to Chat Widget

const tawkScript = document.createElement("script");

tawkScript.async = true;

tawkScript.src = "https://embed.tawk.to/6a61f75385c9821d4774b1e7/1ju7asc0a";

tawkScript.charset = "UTF-8";

tawkScript.setAttribute("crossorigin", "*");

document.body.appendChild(tawkScript);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TransactionProvider>
      <BrowserRouter>
        {/* <StrictMode> */}
          <App />
        {/* </StrictMode> */}
      </BrowserRouter>
    </TransactionProvider>
  </AuthProvider>,
);
