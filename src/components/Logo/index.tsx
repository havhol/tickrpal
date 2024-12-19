"use client";

import Link from "next/link";
import styles from "./styles.module.scss";

interface LogoProps {
  size?: number; // Default to 40px
  color?: string; // Default to currentColor
  className?: string; // Additional CSS classes
  href?: string; // Default link target
  isMainHeading?: boolean; // Wrap with <h1> if true
}

const Logo = ({ isMainHeading = false }: LogoProps) => {
  return isMainHeading ? (
    <h1>
      <Link className={styles.link} href="localhost:3000">
        Tickrpal
      </Link>
    </h1>
  ) : (
    <Link className={styles.link} href="/">
      Tickrpal
    </Link>
  );
};

export default Logo;
