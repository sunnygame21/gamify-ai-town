"use client";
import { useCallback, useEffect, useState, useContext } from "react";
import Phaser from "phaser";
import GridEngine from "grid-engine";
import { GlobalContext } from "@/context/global";
import BootScene from "@/components/game/scenes/BootScene";
import GameScene from "@/components/game/scenes/GameScene";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import DialogBox from "@/components/game/components/dialogModal";
import { calculateGameSize } from "@/components/game/utils";
import GameHint from "@/components/game/components/GameHint";
import GameStartBox from "@/components/game/components/gameStartBox";
import { If, Then } from "react-if";

import "@/styles/App.css";

const { width, height, multiplier } = calculateGameSize();

function Game() {
  const { gameInfo } = useContext(GlobalContext);

  const [messages, setMessages] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [gameHintText, setGameHintText] = useState(
    "https://github.com/RPGGO-AI/demo-ai-town"
  );

  const handleMessageIsDone = useCallback(() => {
    const customEvent = new CustomEvent(`${characterName}-dialog-finished`, {
      detail: {},
    });
    window.dispatchEvent(customEvent);

    setMessages([]);
    setCharacterName("");
  }, [characterName]);

  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      title: "ai-town",
      parent: "game-content",
      orientation: Phaser.Scale.LANDSCAPE,
      localStorageName: "ai-town",
      width,
      height,
      autoRound: true,
      pixelArt: true,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.ENVELOP,
      },
      scene: [BootScene, GameScene],
      physics: {
        default: "arcade",
      },
      dom: {
        createContainer: true,
      },
      plugins: {
        scene: [
          {
            key: "gridEngine",
            plugin: GridEngine,
            mapping: "gridEngine",
          },
          {
            key: "rexUI",
            plugin: RexUIPlugin,
            mapping: "rexUI",
          },
        ],
      },
      backgroundColor: "#000000",
    });
    window.phaserGame = game;
  }, []);

  useEffect(() => {
    //show dialogs event
    const showdialogBoxEventListener = ({ detail }) => {
      setCharacterName(detail.characterName);
      setMessages([
        {
          message: detail.message,
        },
      ]);
    };
    window.addEventListener("show-dialog", showdialogBoxEventListener);
    //close dialogs event
    const closedialogBoxEventListener = ({ detail }) => {
      setCharacterName(detail.characterName);
      // setMessages([]);
      // const timer = setInterval(() => {
      //   clearInterval(timer);
      //   handleMessageIsDone();
      // }, 2000);
    };
    window.addEventListener("close-dialog", closedialogBoxEventListener);
    //game hint event
    const gameHintEventListener = ({ detail }) => {
      var hint = detail.hintText;
      if (hint === "") {
        hint = "ai-town";
      }
      setGameHintText(hint);
    };
    window.addEventListener("game-hint", gameHintEventListener);
    //remove listeners
    return () => {
      window.removeEventListener("show-dialog", showdialogBoxEventListener);
      window.removeEventListener("close-dialog", closedialogBoxEventListener);
      window.removeEventListener("game-hint", gameHintEventListener);
    };
  }, [setCharacterName, setMessages, handleMessageIsDone]);

  const [showStartBox, setShowStartBox] = useState(true);

  return (
    <div>
      <div className="gameWrapper">
        <div
          id="game-content"
          className="gameContentWrapper"
          style={{
            width: `${width * multiplier}px`,
            height: `${height * multiplier}px`,
          }}
        ></div>
        <GameHint
          gameSize={{
            width,
            height,
            multiplier,
          }}
          hintText={gameHintText}
        />
        {messages.length > 0 && gameInfo?.sessionInfo ? (
          <DialogBox
            onDone={handleMessageIsDone}
            characterName={characterName}
            messages={messages}
            gameSize={{
              width,
              height,
              multiplier,
            }}
          />
        ) : null}
        {showStartBox ? (
          <GameStartBox setShowStartBox={setShowStartBox} />
        ) : null}
      </div>
    </div>
  );
}

export default Game;
