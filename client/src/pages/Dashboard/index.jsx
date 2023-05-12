import Card from "../../components/Card";
import {
  CalendarIcon,
  SunIcon,
  ChatIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }
  return (
    <>
      <center>
        <h2>Welcome {user?.firstName}</h2>
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
