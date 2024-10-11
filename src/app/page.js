"use client";
import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("@/app/game"), { ssr: false });

function App() {
  return <PhaserGame />;
}

export default App;
