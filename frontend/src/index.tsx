import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "avalanche-fuji";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
        sdkOptions={{
          gasless: {
            openzeppelin: {
              relayerUrl: 'https://api.defender.openzeppelin.com/autotasks/7e93346a-9ef3-4f88-9fa9-c575616b5a0e/runs/webhook/a8297b95-7537-4a99-8832-367a7e144220/VuF4zb61uzoHQMXxKMDwho',
        },
      },
    }}
    activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
