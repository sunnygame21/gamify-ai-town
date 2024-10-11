import { createContext, useEffect, useMemo, useState } from "react";
import { GAME_ID } from "@/config";
import axios from "axios";

export const initialGlobalState = {
  gameInfo: {},
  loading: false,
};

export const GlobalContext = createContext(initialGlobalState);

export const GlobalProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGame = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/rpggo/gamemetadata", {
        game_id: GAME_ID,
      });
      const gameData = res.data.data;
      console.log("Game Data:", gameData);
      setGameInfo(gameData);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGame();
  }, []);

  const globalValue = useMemo(
    () => ({
      gameInfo,
      loading,
    }),
    [JSON.stringify(gameInfo), loading]
  );

  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};
