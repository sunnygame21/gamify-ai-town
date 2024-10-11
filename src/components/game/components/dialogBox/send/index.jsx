/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import axios from "axios";
import { getUniqueKey } from "@/utils/helper";
import { GAME_ID } from "@/config";
import { addChatHistory } from "@/components/game/ChatUtils";
import { CHAT_TYPE, GameStatusAction, CharacterType } from "../const";

import styles from "./index.module.css";

let msg_index = 0;

const SendChat = (props) => {
  const { updateChatList, detail, npcId } = props;
  const { game_id, session_id } = detail || {};

  const [messageText, setMessageText] = useState("");

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!messageText) return;
    const chatKey = `${getUniqueKey(5)}/${npcId}/${msg_index}`;
    msg_index++;
    updateChatList({
      type: CHAT_TYPE.send,
      data: {value: messageText},
      chatKey,
    });
    await sendMessage(chatKey);
    setMessageText('');
  };

  const handleChangeChapter = async (chapter_id) => {
    try {
      const res = await fetch(`/api/game/change_chapter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game_id,
          session_id,
          chapter_id,
        }),
      })
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      const { data, success } = res || {};
      if (success && data?.game_id) {
        const chapter = data?.chapter || {};
        msg_index = 0;
        updateChatList({
          type: CHAT_TYPE.chapterIntro,
          data: chapter,
        });
      }
    } catch (error) {
      console.log("handleChangeChapter", error);
    }
  };


  const sendMessage = async (chatKey) => {
    // Insert logic to start a new game, such as initializing game state or routing to the game screen
    // addChatHistory("you", messageText);

    try {
      const res = await axios.post("/api/rpggo/chatwithnpc", {
        game_id: GAME_ID,
        session_id: session_id,
        character_id: npcId,
        message: messageText,
      });
      updateChatList({
        type: CHAT_TYPE.loading,
        chatKey,
      });
      const data = res?.data?.data;
      console.log("chat finished:", data);
      if (data) {
        const characterType = data?.character_type;
        // const gameAction = data?.game_status?.action;
        if (characterType === CharacterType.CommonNpc) {
          if (data?.text) {
            updateChatList({
              type: CHAT_TYPE.receive,
              data,
              chatKey,
            });
          }
        } else if (characterType === CharacterType.PictureProduceDm) {
          if (data?.image) {
            updateChatList({
              type: CHAT_TYPE.picture,
              data,
              chatKey,
            });
          }
        } else if (characterType === CharacterType.GoalCheckDm) {
          if (gameAction === GameStatusAction.End) {
            updateChatList({
              type: CHAT_TYPE.gameEnd,
              data,
              chatKey,
            });
          } else if (gameAction === GameStatusAction.ChangeChapter) {
            if (data?.chapter_id) {
              await handleChangeChapter(data?.chapter_id);
            }
          }
        }
      }
      // addChatHistory("npc_03", data.text);
    } catch (error) {
      updateChatList({
        type: CHAT_TYPE.loading,
        chatKey,
      });
      console.error("Error starting game:", error);
    }
  };

  useEffect(() => {
    return () => {
      msg_index = 0;
    };
  }, []);

  return (
    <div className={styles.textbox}>
      <textarea
        rows={5}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      ></textarea>
      <div className={styles.btnbox}>
        <button onClick={throttle(handleSend, 500)}>Send</button>
      </div>
    </div>
  );
};

export default SendChat;
