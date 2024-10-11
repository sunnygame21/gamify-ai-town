import React from "react";
import styles from "./index.module.css";

const TextLoading = ({ text }) => {
  return (
    <div className={styles.loading}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default TextLoading;
