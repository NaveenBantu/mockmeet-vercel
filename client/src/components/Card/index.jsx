import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, Icon, HStack } from "@chakra-ui/react";

import styles from "./styles.module.css";

const CustomCard = ({ icon, title, link }) => {
  return (
    <Link to={link}>
      <Card backgroundColor="black" p={2} m={2}>
        <HStack spacing={8}>
          <Icon as={icon} className={styles.icon} />
          <CardHeader color="#faa621" fontSize="2xl">
            {title}
          </CardHeader>
        </HStack>
      </Card>
    </Link>
  );
};

export default CustomCard;
