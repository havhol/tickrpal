import React from "react";
import styles from "./header.module.scss";
import Logo from "@/components/shared/Logo";
import { Button } from "@radix-ui/themes";
import UserNav from "@/components/Layout/Nav/UserNav";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
      </div>
      <div className={styles.actions}>
        <UserNav />
      </div>
    </header>
  );
}
