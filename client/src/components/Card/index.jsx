import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@chakra-ui/react";

import styles from "./styles.module.css";

const Card = ({ icon, title, link }) => {
  return (
    <Link to={link} className={styles.link}>
      <div className={styles.container}>
        <Icon as={icon} className={styles.icon} />
        <h3 className={styles.title}>{title}</h3>
      </div>
    </Link>
  );
};

export default Card;
