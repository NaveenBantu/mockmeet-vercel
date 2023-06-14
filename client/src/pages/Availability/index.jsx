import React, { useState } from "react";
import styles from "./styles.module.css";
import {
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "@clerk/clerk-react";

const Availability = () => {
  const [date, setDate] = useState(new Date());
  const [putLoading, setPutLoading] = useState(false);

  // Using Toast to display success or error messages
  const toast = useToast({
    position: "top-right",
    isClosable: true,
    duration: 3000,
  });

  // State to manage interviewer data
  const [interviewerData, setInterviewerData] = useState({
    level: 0,
    availableDates: [],
    clerk_id: "",
  });

  // Check if the User is authenticated using Clerk hooks
  const { isLoaded, isSignedIn, userId } = useAuth();
  const navigate = useNavigate();

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  // Fetching the mocks
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/mocks`
  );

  const handleDateChange = (date) => {
    // Setting the date on change of the date picker
    setDate(date);
  };

  const handleLevelChange = (event) => {
    const { value } = event.target;

    // Setting internal state to get the available dates
    // setMock(value);

    // Setting the form data for interviewer
    setInterviewerData((prevInterviewData) => ({
      ...prevInterviewData,
      clerk_id: userId,
      level: value,
    }));
  };

  const handleSubmit = async (e) => {
    // prevent the default form submission
    e.preventDefault();

    // submitting the form
    setPutLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/users/update`,
        interviewerData
      );
      toast({
        title: "Dates added",
        description: "Your available dates are added",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error occured !!!",
        description: error?.message,
        status: "error",
      });
    }
    setPutLoading(false);
    navigate("/");
  };

  const handleTimeChange = () => {
    if (date !== "" && !interviewerData.availableDates.includes(date)) {
      // Setting form data
      setInterviewerData((prevInterviewData) => ({
        ...prevInterviewData,
        availableDates: [...interviewerData.availableDates, date],
      }));
    }
  };

  // Filter old Date and Time
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // Handle function to delete the date in the list
  const handleDelete = (e, index) => {
    const updatedItems = [...interviewerData.availableDates];
    updatedItems.splice(index, 1);
    setInterviewerData((prevInterviewData) => ({
      ...prevInterviewData,
      availableDates: updatedItems,
    }));
  };

  // Date formatting options
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <>
      {loading || putLoading ? (
        <LoadingSpinner />
      ) : (
        <Box
          display="flex"
          borderWidth="2px"
          borderRadius="lg"
          margin="1rem"
          padding="1rem"
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <Heading>Availability</Heading>
            {/* Select level */}
            <select
              onChange={handleLevelChange}
              required
              className={styles.select}
            >
              <option value={0}>Select Level</option>
              {data?.map((mock) => (
                <option key={mock?._id} value={mock?.level}>
                  {mock?.title}
                </option>
              ))}
            </select>

            {/* Datepicker */}
            <div className={styles["datepicker-container"]}>
              <DatePicker
                className={styles["custom-datepicker"]}
                selected={date}
                onChange={handleDateChange}
                filterTime={filterPassedTime}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select a date"
              />
            </div>

            {/* Button to add the time */}
            <Button
              backgroundColor="black"
              onClick={handleTimeChange}
              m={2}
              color="#faa621"
            >
              Add Time
            </Button>

            {/* List of Added Availability times */}
            <ul>
              {interviewerData.availableDates?.map((date, index) => {
                return (
                  <Card
                    key={index}
                    variant={"elevated"}
                    p={4}
                    background="black"
                    color="gray.200"
                    my={2}
                  >
                    <HStack spacing={8} justifyContent="space-between">
                      <Text as="b" key={index}>
                        {new Date(date).toLocaleString("en-US", dateOptions)}
                      </Text>
                      <Button
                        onClick={() => handleDelete(index)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Card>
                );
              })}
            </ul>
            <Button backgroundColor="black" color="#faa621" type="submit" m={2}>
              Add Interview Slots
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};
export default Availability;
