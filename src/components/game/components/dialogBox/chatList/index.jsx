import React from "react";

import styles from "./index.module.css";

const ChatList = ({ message = [] }) => {
  console.log('message', message)
  return (
    <div className={styles.chatWrap}>
    </div>
  );
};

export default ChatList;
