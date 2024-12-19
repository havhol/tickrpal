import { Container } from "@radix-ui/themes";
import styles from "./styles.module.scss";
import Logo from "@/components/Logo";

const SimplifiedHeader = () => {
  return (
    <Container mx="4" maxWidth="none">
      <header className={styles.simplifiedHeader}>
        <Logo />
      </header>
    </Container>
  );
};

export default SimplifiedHeader;
