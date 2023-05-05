import React from "react";
import Card from "../../components/Card";
import {
  CalendarIcon,
  SunIcon,
  ChatIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import Header from "../../components/header/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Card
        title="Schedule Interviews"
        icon={CalendarIcon}
        link="/mock-types"
      />
      <Card title="Upcoming Interviews" icon={CalendarIcon} />
      <Card title="Leaderboard" icon={SunIcon} />
      <Card title="Feedback" icon={ChatIcon} link="/feedbacks"/>
      <Card title="Resources" icon={AttachmentIcon} />
    </>
  );
};

export default Dashboard;
