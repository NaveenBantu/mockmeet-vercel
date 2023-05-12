import Card from "../../components/Card";
import {
  CalendarIcon,
  SunIcon,
  ChatIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";

const Dashboard = () => {
  return (
    <>
      <center>
        <h1>Dashboard</h1>
        <Card
          title="Schedule Interviews"
          icon={CalendarIcon}
          link="/mock-types"
        />
        <Card title="Upcoming Interviews" icon={CalendarIcon} />
        <Card title="Leaderboard" icon={SunIcon} />
        <Card title="Feedback" icon={ChatIcon} link="/feedbacks" />
        <Card title="Resources" icon={AttachmentIcon} link="/resources" />
      </center>
    </>
  );
};

export default Dashboard;
