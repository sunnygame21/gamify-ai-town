import React from "react";
import { classNames } from "@/utils/helper";
import styles from "./index.module.css";

const Loading = ({ text, className }) => {
  return (
    <div className={classNames("global-loading", styles.loading, className)}>
      <p className={styles.desc}>Loading....</p>
    </div>
  );
};

export default Loading;
