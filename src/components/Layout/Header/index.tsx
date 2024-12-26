"use client";

import Nav from "@/components/Layout/Nav";
import UserNav from "@/components/Layout/Nav/UserNav";
import { Container, Flex } from "@radix-ui/themes";
import Logo from "@/components/shared/Logo";
import styles from "./styles.module.scss";

type HeaderProps = {
  user: {
    email: string;
    user_metadata?: { avatar_url?: string };
  } | null;
};

const Header = ({ user }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Container mx="5" maxWidth="none">
        <Flex justify="between">
          <Logo />
          {user ? <UserNav /> : <Nav />}
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
