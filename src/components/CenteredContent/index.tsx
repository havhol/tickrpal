"use client";

import { Flex } from "@radix-ui/themes";
import styles from "./styles.module.scss";

type CenteredContentProps = {
  children: React.ReactNode;
  isBlurred?: boolean;
};

const CenteredContent = ({
  children,
  isBlurred = false,
}: CenteredContentProps) => {
  return (
    <Flex
      className={`${styles.centeredContent} ${isBlurred ? styles.blurred : ""}`}
    >
      {children}
    </Flex>
  );
};

export default CenteredContent;
