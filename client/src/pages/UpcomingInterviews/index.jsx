import React, { useState, useEffect } from "react";
import InterviewCard from "../../components/InterviewCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import { parseISO } from "date-fns";
import api, { setAccessToken } from "../../utils/apiCall";

const UpcomingInterviews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Using Toast to display success or error messages
  const toast = useToast({
    position: "top-right",
    isClosable: true,
    duration: 3000,
  });

  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

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
      // Retrieve the Clerk access token
      const token = await getToken();
      // Set the access token in the API instance
      setAccessToken(token);

      // Get upcoming interviews
      const res = await api.get(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/user/${
          isAdmin ? "i" : "s"
        }/${userID}?complete=false`
      );
      // const filteredData = res?.data.filter((item) => {
      //   console.log("booking date ", parseISO(item.bookingDate) >= new Date());
      //   return parseISO(item.bookingDate) >= new Date();
      // });
      // console.log("upcoming ", filteredData);
      setData(res.data);
    } catch (err) {
      toast({
        title: "Error occured !!!",
        description: err?.message,
        status: "error",
      });
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
      // Retrieve the Clerk access token
      const token = await getToken();
      // Set the access token in the API instance
      setAccessToken(token);

      // Delete interview
      const response = await api.delete(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/${id}`
      );
      setData(data.filter((item) => item._id !== id));
      toast({
        title: "Interview Deleted",
        description: "Deleted interview",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error occured !!!",
        description: error?.message,
        status: "error",
      });
    }

    setLoading(false);
  };

  const handleCompleteInterview = async (id) => {
    setLoading(true);
    const completeInterview = { iscompleted: true };
    try {
      // Retrieve the Clerk access token
      const token = await getToken();
      // Set the access token in the API instance
      setAccessToken(token);

      // Update interview
      const response = await api.put(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/${id}`,
        completeInterview
      );
      // setData(data.filter((item) => item._id !== id));
      toast({
        title: "Interview Completed",
        description: "Please add the feedback",
        status: "success",
      });
      navigate("/feedbacks");
    } catch (error) {
      console.log("error");
      toast({
        title: "Error occured !!!",
        description: error?.message,
        status: "error",
      });
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
                handleComplete={handleCompleteInterview}
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
