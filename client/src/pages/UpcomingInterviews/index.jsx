import React, { useState, useEffect } from "react";
import InterviewCard from "../../components/InterviewCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, Heading } from "@chakra-ui/react";
import axios from "axios";

const UpcomingInterviews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  const emailAddress = user?.primaryEmailAddress.emailAddress;
  const isAdmin = emailAddress?.includes("hashinsert");
  // Extracting User ID after login using Clerk
  const userID = user?.id;

  // Fetching the interviews
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/user/${
          isAdmin ? "i" : "s"
        }/${userID}?complete=false`
      );
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const handleMockSchedule = () => {
    navigate("/mock-types");
  };

  const handleAddAvailability = () => {
    navigate("/availability");
  };

  const handleDeleteInterview = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/${id}`
      );
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        <>
          <Heading m={4}>Upcoming Interviews</Heading>
          {data?.map((type) => {
            return (
              <InterviewCard
                key={type._id}
                id={type._id}
                title={type.mock_id?.title}
                date={type.bookingDate}
                withPerson={
                  isAdmin ? type.student?.name : type.interviewer?.name
                }
                handleDelete={handleDeleteInterview}
                isAdmin={isAdmin}
              />
            );
          })}
        </>
      ) : (
        <Card color="ButtonText" size="lg" colorScheme="blue" margin="10">
          <CardHeader>
            <Heading size="md">No Upcoming Interviews</Heading>
          </CardHeader>
          {isAdmin ? (
            <Button
              margin="10"
              colorScheme="orange"
              onClick={handleAddAvailability}
            >
              Add Availability
            </Button>
          ) : (
            <Button
              margin="10"
              colorScheme="orange"
              onClick={handleMockSchedule}
            >
              Schedule an Interview
            </Button>
          )}
        </Card>
      )}
    </>
  );
};

export default UpcomingInterviews;
