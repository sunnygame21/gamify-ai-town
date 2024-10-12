import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import TextLoading from "../loading";

import styles from "./index.module.css";

export const ReceiveItem = ({ message, npc }) => {
  return (
    <div className={styles.npcSendContent}>
      <div className={styles.npcText}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          className={styles.markdownBody}
        >
          {message?.value}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export const LoadingItem = ({ npc }) => {
  return (
    <div className={styles.npcSendContent}>
      <div className={styles.loading}>
        <TextLoading />
      </div>
    </div>
  );
};

export const SendItem = ({ message }) => {
  return (
    <div className={styles.sendItemWrap}>
      <div className={styles.sendContent}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          className={styles.markdownBody}
        >
          {message?.value}
        </ReactMarkdown>
      </div>
    </div>
  );
};
