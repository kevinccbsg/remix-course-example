import { Link } from "@remix-run/react";
import styles from "./Link.module.css";

const LinkComponent = () => (
  <Link className={styles.link} to="/notes">Try Now!</Link>
);

export default LinkComponent;
