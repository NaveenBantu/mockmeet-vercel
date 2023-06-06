import Card from "../../components/Card";
import {
  CalendarIcon,
  SunIcon,
  ChatIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";

import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Heading } from "@chakra-ui/react";

const Dashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Fetching auth user
  // console.log("auth fetch function ", useAuthFetch());

  const emailAddress = user?.primaryEmailAddress.emailAddress;
  // const fetchUser = useAuthFetch()(
  //   `${import.meta.env.VITE_REACT_API_URL}/user`
  // );

  // console.log(fetchUser);

  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  const isAdmin = emailAddress?.includes("hashinsert");

  return (
    <>
      <Heading m={4}>Welcome {user?.firstName}</Heading>
      {isAdmin ? (
        <Card
          title="Add Availability"
          icon={CalendarIcon}
          link="/availability"
        />
      ) : (
        <Card
          title="Schedule Interviews"
          icon={CalendarIcon}
          link="/mock-types"
        />
      )}
      <Card
        title="Upcoming Interviews"
        icon={CalendarIcon}
        link="/upcoming-interviews"
      />
      {!isAdmin && (
        <Card title="Leaderboard" icon={SunIcon} link="/leaderboard" />
      )}
      <Card title="Feedback" icon={ChatIcon} link="/feedbacks" />
      {!isAdmin && (
        <Card title="Resources" icon={AttachmentIcon} link="/resources" />
      )}
    </>
  );
};

export default Dashboard;
