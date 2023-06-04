import React, { useState } from "react";
import styles from "./styles.module.css";
import {
  Box,
  Button,
  Card,
  FormControl,
  HStack,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";

const Availability = () => {
  const [date, setDate] = useState(new Date());

  const [putLoading, setPutLoading] = useState(false);
  const [putError, setPutError] = useState(false);

  // const [availableDates, setAvailableDates] = useState([]);

  const [interviewerData, setInterviewerData] = useState({
    level: 0,
    availableDates: [],
    clerk_id: "",
  });
  const [mock, setMock] = useState("");

  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  // // Fetching the mocks
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/mocks`
  );

  const handleDateChange = (date) => {
    // Setting the date on change of the date picker
    setDate(date);

    console.log("date change ", date);
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
    // prevent the default form submit
    e.preventDefault();

    // submitting the form
    console.log(interviewerData);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/users/update`,
        interviewerData
      );
    } catch (error) {
      setPutError(error);
    }

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

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // Handle function to delete the date in the list
  const handleDelete = (e, index) => {
    // e.preventDefault();
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
          alignContent="center"
          justifyContent="center"
          borderWidth="2px"
          borderRadius="lg"
          margin="2rem"
          padding="1rem"
        >
          <FormControl
            onSubmit={handleSubmit}
            isRequired
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Heading>Availability {data?.title}</Heading>
            <Select
              m={0}
              variant="outline"
              size="lg"
              width="100%"
              onChange={handleLevelChange}
              placeholder="Select a Level"
            >
              {data?.map((mock) => (
                <option key={mock?._id} value={mock?.level}>
                  {mock?.title}
                </option>
              ))}
            </Select>

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

            <button
              type="button"
              onClick={handleTimeChange}
              className={styles.button1}
            >
              Add Time
            </button>
            <ul>
              {interviewerData.availableDates?.map((date, index) => {
                return (
                  <Card variant={"elevated"} p={4}>
                    <HStack spacing={8}>
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
            <button type="submit" className={styles.button1}>
              Add Interview Slots
            </button>
          </FormControl>
        </Box>
      )}
    </>
  );
};
export default Availability;
