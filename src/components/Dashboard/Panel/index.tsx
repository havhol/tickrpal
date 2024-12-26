import React, { ReactNode } from "react";
import styles from "./panel.module.scss";

interface PanelProps {
  children: ReactNode;
}

const Panel: React.FC<PanelProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.panel}>{children}</div>
      </div>
    </main>
  );
};

export default Panel;
