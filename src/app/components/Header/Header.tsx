import Nav from "../Nav";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Company Name */}
      <h1 className={styles.headerTitle}>Tickrpal</h1>
      {/* Navigation */}
      <Nav />
    </header>
  );
};

export default Header;
