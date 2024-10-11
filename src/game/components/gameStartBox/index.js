import React, { useEffect, useState } from "react";
import axios from "axios";
import { Game_Id } from "@/config";

import styles from "./index.module.css";

const defaultGameData = {
  image: "",
  name: "",
  intro: "",
  tags: [],
};

const GameStartBox = ({ gameSize, setShowStartBox }) => {
  const [gameData, setGameData] = useState(defaultGameData);
  const [loading, setLoading] = useState(false);

  const onStart = () => {
    console.log("Game started");
    setShowStartBox(false);
    // Insert logic to start a new game, such as initializing game state or routing to the game screen

    try {
      const session_id = "ses_" + Math.random().toString(36).substr(2, 9);

      console.log("Starting new game with session_id:", session_id); // For debugging

      axios
        .post("/api/rpggo/startgame", {
          game_id: Game_Id,
          session_id: session_id,
        })
        .then((res) => {
          const startGameData = res;
          console.log("Game Started:", startGameData);
        });
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const onResume = () => {
    console.log("Game resumed");
    setShowStartBox(false);
    // Insert logic to resume the game from a saved state or continue where left off
    try {
      const session_id = "ses_" + Math.random().toString(36).substr(2, 9);

      console.log("Resuming game with session_id:", session_id); // For debugging

      axios
        .post("/api/rpggo/resumesession", {
          game_id: Game_Id,
          session_id: "ses_qsv1jjiqd",
        })
        .then((res) => {
          const startGameData = res;
          console.log("Game Started:", startGameData);
        });
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const fetchGameData = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/rpggo/gamemetadata", {
        game_id: Game_Id,
      });
      const gameData = res.data.data;
      console.log("gameData is ", gameData);
      setGameData(gameData || defaultGameData);

      // display npc avatar
      // const npcs = gameData.chapters[0].characters;
      // console.log("NPC Details:", npcs);
      // loadNPCs(npcs || []);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  if (loading) {
    return <div className={styles.wrapper}>Loading....</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <img src={gameData?.image} alt={`${gameData?.name}`} />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.title}>{gameData?.name}</div>
          <div className={styles.intro}>{gameData?.intro}</div>
          {/* <div className={styles.tags}>{gameData?.tags?.join(", ")}</div> */}
          <div className={styles["npc-container"]}>
            {(gameData?.chapters?.[0]?.characters || []).map((npc) => (
              <img
                src={npc.avatar}
                className={styles["npc-avatar"]}
                key={npc.character_id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.lowerPanel}>
        <div className={styles.button} onClick={onStart}>
          Start
        </div>
      </div>
    </div>
  );
};

export default GameStartBox;
