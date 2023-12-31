import Card from "../../components/Card";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import {
  FaBookReader,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCommentAlt,
  FaTrophy,
} from "react-icons/fa";
import { useEffect } from "react";
import api, { setAccessToken } from "../../utils/apiCall";

const Dashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  // Fetching auth user
  const emailAddress = user?.primaryEmailAddress.emailAddress;

  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  // Check for a hashinsert email (Validation check)
  const isAdmin = emailAddress?.includes("@hashinsert.com");

  return (
    <>
      <Heading m={4}>Welcome {user?.firstName}</Heading>
      {isAdmin ? (
        <Card
          title="Add Availability"
          icon={FaCalendarAlt}
          link="/availability"
        />
      ) : (
        <Card
          title="Schedule Interviews"
          icon={FaCalendarAlt}
          link="/mock-types"
        />
      )}
      <Card
        title="Upcoming Interviews"
        icon={FaCalendarCheck}
        link="/upcoming-interviews"
      />
      {!isAdmin && (
        <Card title="Leaderboard" icon={FaTrophy} link="/leaderboard" />
      )}
      <Card title="Feedback" icon={FaCommentAlt} link="/feedbacks" />
      {!isAdmin && (
        <Card title="Resources" icon={FaBookReader} link="/resources" />
      )}
    </>
  );
};

export default Dashboard;
