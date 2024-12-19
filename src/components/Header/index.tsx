import Nav from "@/components/Nav";
import styles from "./styles.module.scss";
import { Container } from "@radix-ui/themes";
import Logo from "../Logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container mx="4" maxWidth="none">
        <div className={styles.innerContainer}>
          <Logo />
          <Nav />
        </div>
      </Container>
    </header>
  );
};

export default Header;
