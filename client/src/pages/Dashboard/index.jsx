import React from "react";
import Card from "../../components/Card";
import {
  CalendarIcon,
  SunIcon,
  ChatIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import Header from "../../components/header/Header";
import styles from "../Dashboard/styles.module.css"

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className={styles.main}>
      <Card
        title="Schedule Interviews"
        icon={CalendarIcon}
        link="/mock-types"
      />
      <Card title="Upcoming Interviews" icon={CalendarIcon} />
      <Card title="Leaderboard" icon={SunIcon} />
      <Card title="Feedback" icon={ChatIcon} />
      <Card title="Resources" icon={AttachmentIcon} />
    </div>
    </>
  );
};

export default Dashboard;
