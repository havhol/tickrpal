import Nav from "@/components/Nav";
import styles from "./styles.module.scss";
import { Container } from "@radix-ui/themes";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container mx="4" maxWidth="none">
        <div className={styles.innerContainer}>
          <h1 className={styles.headerTitle}>Tickrpal</h1>
          <Nav />
        </div>
      </Container>
    </header>
  );
};

export default Header;
