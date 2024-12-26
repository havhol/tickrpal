import React, { ReactNode } from "react";
import styles from "./main.module.scss";

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default Main;
