import React, { useState, useEffect } from "react";
import InterviewCard from "../../components/InterviewCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button, Card } from "@chakra-ui/react";
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
        `${
          import.meta.env.VITE_REACT_API_URL
        }/bookinginterviews/${userID}?complete=false`
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
    <center>
      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        data?.map((type) => {
          return (
            <InterviewCard
              id={type._id}
              title={type.mock_id?.title}
              date={type.bookingDate}
              interviewer={type.interviewer_id?.name}
              handleDelete={handleDeleteInterview}
            />
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
