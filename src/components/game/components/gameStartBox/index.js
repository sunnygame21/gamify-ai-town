import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GAME_ID } from "@/config";
import { GlobalContext } from "@/context/global";

import styles from "./index.module.css";


const GameStartBox = ({ setShowStartBox }) => {
  const { gameInfo, loading } = useContext(GlobalContext);

  const onStart = () => {
    setShowStartBox(false);
    // Insert logic to start a new game, such as initializing game state or routing to the game screen

    try {
      const session_id = "ses_" + Math.random().toString(36).substr(2, 9);

      console.log("Starting new game with session_id:", session_id); // For debugging

      axios
        .post("/api/rpggo/startgame", {
          game_id: GAME_ID,
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
          game_id: GAME_ID,
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

  if (loading || !gameInfo?.game_id) {
    return <div className={styles.wrapper}>Loading....</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <img src={gameInfo?.image} alt={`${gameInfo?.name}`} />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.title}>{gameInfo?.name}</div>
          <div className={styles.intro}>{gameInfo?.intro}</div>
          {/* <div className={styles.tags}>{gameInfo?.tags?.join(", ")}</div> */}
          <div className={styles["npc-container"]}>
            {(gameInfo?.chapters?.[0]?.characters || []).map((npc) => (
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
