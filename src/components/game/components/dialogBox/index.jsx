import { useCallback, useEffect, useState } from "react";
import { find, findIndex, takeRight, findLast } from "lodash";
import store from "store";
import { Characters } from "@/config";
import ChatList from "./chatList";
import { CHAT_TYPE } from "./const";
import SendChat from "./send";

import styles from "./index.module.css";

// Images
const dialogBorderBox = "/assets/images/dialog_borderbox.png";

const CHAT_ID = "CHAT_BOX";
let cacheMsg = [];
let localStorageMsg = [];
let chatBoxObserver = null;

const LIMIT_CHAT_NUM = 50;

const DialogBox = (props) => {
  const { sessionInfo, characterName, gameSize } = props || {};
  const { session_id, game_id, image } = sessionInfo || {};
  const { width, height, multiplier } = gameSize;
  const messageBoxHeight = Math.ceil((height / 5) * multiplier);

  const curChapter = sessionInfo?.chapter;
  const npcId = Characters[characterName]?.id;
  const [chatMessageList, setChatMessageList] = useState([]);
  const [picture, setPicture] = useState(image);
  const [gameEnd, setGameEnd] = useState(false);

  const scrollToBottom = () => {
    if (!chatBoxObserver) {
      const targetNode = document.getElementById(CHAT_ID);
      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: true, subtree: true };
      const callback = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
          // console.log("A child node has been added or removed.");
          if (mutation.type === "childList") {
            targetNode?.scrollTo(0, targetNode?.scrollHeight);
          }
        }
      };
      // 创建一个观察器实例并传入回调函数
      chatBoxObserver = new MutationObserver(callback);
      // 以上述配置开始观察目标节点
      chatBoxObserver.observe(targetNode, config);
    }
  };

  // received msg, delete loading
  const setReceiveLoadingFalse = (chatKey) => {
    const chatIndex = findIndex(cacheMsg, { chatKey });
    const curChat = cacheMsg?.[chatIndex];
    const curChatList = curChat?.chatList || [];
    const loadingIndex = findIndex(curChatList, { type: CHAT_TYPE.loading });
    if (loadingIndex > -1) {
      curChatList.splice(loadingIndex, 1);
      cacheMsg.splice(chatIndex, 1, {
        chatKey,
        chatList: curChatList,
      });
    }
  };

  const updateLocalStorageMsg = (msg) => {
    localStorageMsg = msg;
    if (game_id) {
      const storeKey = `rpa_${game_id}`;
      try {
        store.set(storeKey, {
          game_id,
          session_id,
          message: msg,
        });
      } catch (error) {}
    }
  };

  const updateChatList = (params) => {
    const { type, data = {}, chatKey } = params;
    switch (type) {
      case CHAT_TYPE.loading:
        setReceiveLoadingFalse(chatKey);
        break;
      case CHAT_TYPE.send:
        const send = {
          type,
          value: data?.value,
        };
        const loading = {
          type: CHAT_TYPE.loading,
          character_id: npcId,
        };
        const chat = {
          chatKey,
          chatList: [send, loading],
          chapter: curChapter?.chapter_id,
        }
        cacheMsg.push(chat);
        localStorageMsg.push(chat);
        break;
      case CHAT_TYPE.receive:
        const chatIndex = findIndex(cacheMsg, { chatKey });
        const curChat = cacheMsg?.[chatIndex];
        const curChatList = curChat?.chatList || [];
        curChatList.push({
          type,
          value: data?.text,
          character_id: data?.character_id,
          chapter: curChapter?.chapter_id,
        });
        cacheMsg.splice(chatIndex, 1, {
          chatKey,
          chatList: curChatList,
        });

        const localIndex = findIndex(localStorageMsg, { chatKey });
        localStorageMsg.splice(localIndex, 1, {
          chatKey,
          chatList: curChatList,
        });
        break;
      case CHAT_TYPE.picture:
        const picture = {
          type,
          value: data?.text,
          character_id: data?.character_id,
          image: data?.image,
          chapter: curChapter?.chapter_id,
        };
        setPicture(data?.image);
        cacheMsg.push(picture);
        localStorageMsg.push(picture);
        break;
      case CHAT_TYPE.gameEnd:
        const end = {
          type,
          value: data,
          chapter: curChapter?.chapter_id,
        };
        setGameEnd(true);
        cacheMsg.push(end);
        localStorageMsg.push(end);
        break;
      default:
        break;
    }
    const updateStoreMsg = takeRight(localStorageMsg, LIMIT_CHAT_NUM);
    updateLocalStorageMsg(updateStoreMsg);
    setChatMessageList([...cacheMsg]);
    scrollToBottom();
  };

  const handleClose = (characterName) => {
    window.dispatchEvent(
      new CustomEvent("close-dialog", {
        detail: {
          characterName: characterName,
        },
      })
    );
  };

  const getLastPic = () => {
    if (!chatMessageList?.length) return;
    const pictures = chatMessageList?.filter(
      (item) => item?.type === CHAT_TYPE.picture
    );
    const pic = findLast(pictures, { character_id: npcId });
    pic && setPicture(pic?.image);
  };

  const resetInitialVariable = () => {
    cacheMsg = [];
    localStorageMsg = [];
    chatBoxObserver?.disconnect();
    chatBoxObserver = null;
    setGameEnd(false);
    setChatMessageList([]);
  };

  useEffect(() => {
    return () => {
      resetInitialVariable();
    };
  }, []);

  useEffect(() => {
    if (session_id && game_id) {
      const storeKey = `rpa_${game_id}`;
      const storeData = store.get(storeKey);
      if (storeData) {
        // 继续游戏，读取缓存
        const message = storeData?.message || [];
        const isEnd = find(message, { type: CHAT_TYPE.gameEnd });
        isEnd && setGameEnd(true);
        getLastPic();
        localStorageMsg = [...message];
        cacheMsg = [...message];
        setChatMessageList(cacheMsg);
        scrollToBottom();
      } else {
        // 开始新游戏，初始化章节
        updateLocalStorageMsg([]);
      }
    }
  }, [session_id, game_id, npcId]);

  useEffect(() => {
    if (npcId) {
      getLastPic();
    }
  }, [npcId]);

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
      <ChatList
        chatMessageList={chatMessageList}
        picture={picture}
        npcId={npcId}
      />
      <SendChat
        npcId={npcId}
        updateChatList={updateChatList}
        detail={sessionInfo}
        setGameEnd={setGameEnd}
        curChapter={curChapter}
      />
    </div>
  );
};

export default DialogBox;
