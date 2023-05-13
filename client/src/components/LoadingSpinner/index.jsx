import { HashLoader } from "react-spinners";
import styles from "./styles.module.css";

function LoadingSpinner() {
  return (
    <div className={styles["loading-spinner"]}>
      <HashLoader size={80} color={"#faa621"} />
    </div>
  );
}

export default LoadingSpinner;
