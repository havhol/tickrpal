import { Container } from "@radix-ui/themes";
import styles from "./styles.module.scss";

const SimplifiedHeader = () => {
  return (
    <Container mx="4" maxWidth="none">
      <header className={styles.simplifiedHeader}>
        <h1 className={styles.headerTitle}>Tickrpal</h1>
      </header>
    </Container>
  );
};

export default SimplifiedHeader;
