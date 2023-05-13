import React, { useEffect } from "react";
import InterviewCard from "../../components/InterviewCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button, Card } from "@chakra-ui/react";

const UpcomingInterviews = () => {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }
  // Fetching the interviews
  const userID = user?.id;
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/${userID}`
  );

  console.log("interviews data ", data);
  console.log("error ", error);

  const handleMockSchedule = () => {
    navigate("/mock-types");
  };

  return (
    <center>
      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        data?.map((type) => {
          return (
            <>
              <InterviewCard
                id={type._id}
                title={type.mock_id?.title}
                date={type.bookingDate}
                interviewer={type.interviewer_id?.name}
              />
            </>
          );
        })
      ) : (
        <Card color="ButtonText" size="lg" colorScheme="blue" margin="20">
          No Upcoming Interviews
          <Button margin="10" colorScheme="orange" onClick={handleMockSchedule}>
            Schedule an Interview
          </Button>
        </Card>
      )}
    </center>
  );
};

export default UpcomingInterviews;
