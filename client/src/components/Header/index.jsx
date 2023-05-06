import React from "react";
import styles from "../Header/styles.module.css";
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  function handleChange() {
    navigate('/Dashboard');
  }
  return (
    <div className={styles.container}>
      <div className={styles.tabbar}>
        <label onClick={handleChange}><GridViewIcon /><label>Dashboard</label></label>
      </div>
      <div className={styles.text}>
        MockMeet
      </div>
      <div className={styles.icon}>
        <label><PersonIcon /></label>
      </div>
    </div>
  )
}

export default Header;


