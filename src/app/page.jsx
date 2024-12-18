"use client";
import dynamic from "next/dynamic";
import { GlobalProvider } from "@/context/global";
import { WalletContextProvider } from "@/context/WalletProvider";

const PhaserGame = dynamic(() => import("@/app/game"), { ssr: false });

function App() {
  return (
    <WalletContextProvider>
      <GlobalProvider>
        <PhaserGame />
      </GlobalProvider>
    </WalletContextProvider>
  );
}

export default App;
