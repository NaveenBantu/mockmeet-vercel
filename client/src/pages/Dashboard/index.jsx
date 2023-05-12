import React from "react";
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
import useAuthFetch from "../../hooks/useAuthFetch";


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

  // Fetching the interviews
  const userID = user?.id;
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/${userID}`
  );

  console.log("interviews data ", data);

  const isAdmin = emailAddress?.includes("hashinsert");

  return (
    <>
      <center>
        <h2>Welcome {user?.firstName}</h2>
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
        <Card title="Upcoming Interviews" icon={CalendarIcon} />
        {!isAdmin && <Card title="Leaderboard" icon={SunIcon} />}
        <Card title="Feedback" icon={ChatIcon} link="/feedbacks" />
        {!isAdmin && <Card title="Resources" icon={AttachmentIcon} />}
      </center>
    </>
  );
};

export default Dashboard;
