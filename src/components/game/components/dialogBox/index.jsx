import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { addChatHistory } from "@/components/game/ChatUtils";
import { GAME_ID } from "@/config";
import ChatList from "./chatList";
import styles from "./index.module.css";

// Images
const dialogBorderBox = "/assets/images/dialog_borderbox.png";

const DialogBox = (props) => {
  const { sessionInfo, messages, characterName, gameSize } = props || {};
  const { width, height, multiplier } = gameSize;
  const messageBoxHeight = Math.ceil((height / 5) * multiplier);

  const [messageText, setMessageText] = useState("");

  const handleClose = (characterName) => {
    window.dispatchEvent(
      new CustomEvent("close-dialog", {
        detail: {
          characterName: characterName,
        },
      })
    );
  };

  const sendMessage = () => {
    // Insert logic to start a new game, such as initializing game state or routing to the game screen
    addChatHistory("you", messageText);

    try {
      const session_id = "ses_" + Math.random().toString(36).substr(2, 9);

      console.log("Starting new game with session_id:", session_id); // For debugging

      axios
        .post("/api/rpggo/chatwithnpc", {
          game_id: GAME_ID,
          session_id: "ses_qsv1jjiqd",
          character_id: "1aeaa765-a163-4898-b00b-c9b868e7457d",
          message: messageText,
        })
        .then((res) => {
          const chatData = res.data;
          addChatHistory("npc_03", chatData.text);
          console.log("chat finished:", chatData);
        });
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  return (
    <div
      className={styles.dialogBox}
      style={{
        borderImage: `url("${dialogBorderBox}") 6 / ${6 * multiplier}px ${
          6 * multiplier
        }px ${6 * multiplier}px ${6 * multiplier}px stretch`,
        top: `${Math.ceil(
          height * multiplier - (messageBoxHeight + messageBoxHeight * 0.4)
        )}px`,
        width: `${Math.ceil(width * 0.5 * multiplier)}px`,
        minHeight: `${messageBoxHeight}px`,
      }}
    >
      <div
        onClick={() => handleClose(characterName)}
        className={styles.dialogFooter}
      >
        Close
      </div>
      <div
        className={styles.characterName}
        style={{
          marginBottom: `${6 * multiplier}px`,
          fontWeight: "bold",
        }}
      >
        {characterName}
      </div>
      <ChatList />
      <div className={styles.textbox}>
        <textarea
          rows={5}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        ></textarea>
        <div className={styles.btnbox}>
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
