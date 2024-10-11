"use client";
import dynamic from "next/dynamic";
import { GlobalProvider } from "@/context/global";

const PhaserGame = dynamic(() => import("@/app/game"), { ssr: false });

function App() {
  return (
    <GlobalProvider>
      <PhaserGame />
    </GlobalProvider>
  );
}

export default App;
