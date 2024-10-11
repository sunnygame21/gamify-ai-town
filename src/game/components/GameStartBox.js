import React, { useEffect, useState } from "react";
import axios from "axios";
import { Game_Id } from "@/config";

import "./gamestartbox.css";

// Images
const dialogBorderBox = "/assets/images/dialog_borderbox.png";

const GameStartBox = ({ gameSize, setShowStartBox }) => {
  const { width, height, multiplier } = gameSize;

  // State to store the game details
  const defaultGameData = {
    image: "",
    name: "",
    intro: "",
    tags: [],
  };
  const [game, setGame] = useState(defaultGameData);

  // Load NPCs
  const loadNPCs = (npcs) => {
    const npcContainer = document.getElementById("npc-container");
    npcContainer.innerHTML = ""; // clean up existing NPCs

    npcs.forEach((npc) => {
      const npcAvatar = document.createElement("img");
      npcAvatar.src = npc.avatar;
      npcAvatar.classList.add("npc-avatar");
      npcAvatar.dataset.characterId = npc.character_id; // store character_id in data attribute

      npcContainer.appendChild(npcAvatar);
    });
  };

  useEffect(() => {
    axios
      .post("/api/rpggo/gamemetadata", {
        game_id: Game_Id,
      })
      .then((res) => {
        const gameData = res.data.data;
        console.log("gameData is ", gameData);
        setGame(gameData || defaultGameData);

        // display npc avatar
        const npcs = gameData.chapters[0].characters;
        console.log("NPC Details:", npcs);
        loadNPCs(npcs || []);
      });
  }, []);

  // Define the onStart function
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

  // Define the onResume function
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

  return (
    <div
      className="gameStartBox"
      style={{
        borderImage: `url("${dialogBorderBox}") 6 / ${6 * multiplier}px ${
          6 * multiplier
        }px ${6 * multiplier}px ${6 * multiplier}px stretch`,
        padding: `${8 * multiplier}px`,
        width: `${Math.ceil(width * 0.5 * multiplier)}px`,
        height: `${Math.ceil(height * 0.6 * multiplier)}px`,
      }}
    >
      {/* Upper Panel: Game Cover Image */}
      <div
        className="upperPanel"
        style={{
          padding: `${6 * multiplier}px`,
        }}
      >
        <img
          src={game?.image}
          alt={`${game?.name} cover`}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>

      {/* Middle Panel: Game Name, Intro, Tags */}
      <div
        className="middlePanel"
        style={{
          padding: `${6 * multiplier}px`,
        }}
      >
        <div
          className="title"
          style={{
            fontSize: `${14 * multiplier}px`,
          }}
        >
          {game.name}
        </div>
        <div
          style={{
            fontSize: `${6 * multiplier}px`,
          }}
        >
          {game.intro}
        </div>
        <div
          className="tags"
          style={{
            fontSize: `${4 * multiplier}px`,
          }}
        >
          {game?.tags?.join(", ")}
        </div>
      </div>

      {/* Lower Panel: Resume and Start Buttons */}
      <div className="lowerPanel">
        <div id="npc-container" className="npc-container"></div>
        <div
          className="button"
          style={{
            fontSize: `${6 * multiplier}px`,
            padding: `${4 * multiplier}px ${8 * multiplier}px`,
          }}
          onClick={onResume}
        >
          Resume
        </div>
        <div
          className="button"
          style={{
            fontSize: `${6 * multiplier}px`,
            padding: `${4 * multiplier}px ${8 * multiplier}px`,
          }}
          onClick={onStart}
        >
          Start
        </div>
      </div>
    </div>
  );
};

export default GameStartBox;
