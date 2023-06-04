import React, { useState, useMemo } from "react";
import styles from "./styles.module.css";
import { Select } from "@chakra-ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { parseISO } from "date-fns";
import axios from "axios";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [interviewData, setInterviewData] = useState({
    mock_id: "",
    total_score: "",
    student_id: "",
    interviewer_id: "",
    bookingDate: "",
  });
  const [interviewer, setInterviewer] = useState();

  // states for posting interview data
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);

  // Getting the mockid and score from url query params
  const [searchParams, setSearchParams] = useSearchParams();
  const score = searchParams?.get("score");
  const mockId = searchParams?.get("mockId");

  const { isLoaded, isSignedIn, userId } = useAuth();
  const navigate = useNavigate();

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  // Fetching the interviewers
  const {
    data: interviewers,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_REACT_API_URL}/users/interviewer`);

  const handleDateChange = (date) => {
    // Setting the date on change of the date picker
    setDate(date);

    // Setting form data
    setInterviewData((prevInterviewData) => ({
      ...prevInterviewData,
      bookingDate: date,
    }));
  };

  const handleInterviewerChange = (event) => {
    const { value } = event.target;
    const interviewer = interviewers.find((data) => data.name === value);

    // Setting internal state to get the available dates
    setInterviewer(interviewer);

    // Setting the first available date of the interviewer in the Calendar
    const initialDate = parseISO(interviewer?.availableDates[0]);
    setDate(initialDate);

    // Setting the form data for interviewer
    setInterviewData((prevInterviewData) => ({
      ...prevInterviewData,
      interviewer_id: interviewer?._id,
      student_id: userId,
      total_score: score,
      mock_id: mockId,
      bookingDate: initialDate,
    }));
  };

  const getAvailableDates = () => {
    const dates = interviewer?.availableDates;
    const parsedDates = dates?.map((date) => parseISO(date));
    return parsedDates;
  };

  const validationMessage = useMemo(() => {
    if (interviewer) {
      return;
    } else {
      if (!interviewer) {
        return "Please select the interviewer!";
      }
    }
  }, [interviewer]);

  // submitting the form
  const handleSubmit = async (e) => {
    // prevent the default form submit
    e.preventDefault();

    // Posting the data to Interviews
    setPostLoading(true);

    console.log("interview data ", interviewData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews`,
        interviewData
      );
      console.log(response);
      navigate("/upcoming-interviews");
    } catch (error) {
      setPostError(error);
      navigate("/mock-types");
    }

    setPostLoading(false);
  };

  return (
    <center>
      {loading || postLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <Heading m={4}>Schedule</Heading>
            <Select
              placeholder="Select Interviewer"
              size="lg"
              value={interviewer?.name}
              onChange={handleInterviewerChange}
            >
              {interviewers?.map((interviewer) => (
                <option key={interviewer?._id} value={interviewer?.name}>
                  {interviewer?.name}
                </option>
              ))}
            </Select>
            <div className="date-picker-container">
              {getAvailableDates(interviewer)?.length > 0 ? (
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  includeDates={getAvailableDates(interviewer)}
                  includeTimes={getAvailableDates(interviewer)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select a date"
                  inline
                />
              ) : (
                <p style={{ color: "red" }}>No Available dates</p>
              )}
            </div>
            {validationMessage ? (
              <p style={{ color: "red" }}>{validationMessage}</p>
            ) : (
              ""
            )}
            <button type="submit" className={styles.button1}>
              Book Interview Slot
            </button>
          </form>
        </>
      )}
    </center>
  );
};

export default Schedule;
