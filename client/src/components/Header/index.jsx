import styles from "../Header/styles.module.css";
// import GridViewIcon from "../../../node_modules/@mui/icons-material/GridView";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Heading } from "@chakra-ui/react";

function Header({ user }) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  function handleChange() {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabbar}>
        {isSignedIn && <GridViewIcon onClick={handleChange} />}
      </div>
      <Heading alignSelf="center">MockMeet</Heading>
      <div className={styles.icon}>{user}</div>
    </div>
  );
}

export default Header;
