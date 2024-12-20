"use client";

import { Flex } from "@radix-ui/themes";
import styles from "./styles.module.scss";

type CenteredContentProps = {
  children: React.ReactNode;
};

const CenteredContent = ({ children }: CenteredContentProps) => {
  return (
    <Flex
      className={styles.centeredContent} // Corrected string interpolation
    >
      {children}
    </Flex>
  );
};

export default CenteredContent;
