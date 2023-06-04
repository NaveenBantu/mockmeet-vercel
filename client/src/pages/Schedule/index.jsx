import React, { useState, useMemo } from "react";
import styles from "./styles.module.css";
// import { Select } from "@chakra-ui/select";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { parseISO } from "date-fns";
import axios from "axios";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

import dateOptions from "../../utils/dateOptions";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [interviewData, setInterviewData] = useState({
    mock_id: "",
    total_score: 0,
    level: 0,
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
  const level = searchParams?.get("level");

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

  // Filtering old dates and sorting them out
  const dates = interviewer?.availableDates
    .filter((date) => {
      return parseISO(date) >= new Date();
    })
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // const parsedDates = dates?.map((date) => parseISO(date));
  // console.log("available dates ", parsedDates);

  const handleDateChange = (event) => {
    const { value } = event.target;

    // Setting the date on change of the date picker
    setDate(value);

    // Setting form data
    setInterviewData((prevInterviewData) => ({
      ...prevInterviewData,
      bookingDate: value,
    }));
  };

  const handleInterviewerChange = (event) => {
    const { value } = event.target;
    const interviewer = interviewers.find((data) => data.name === value);

    // Setting internal state to get the available dates
    setInterviewer(interviewer);

    // Setting the first available date of the interviewer in the Calendar
    const initialDate = dates && parseISO(dates[0]);
    setDate(initialDate);

    // Setting the form data for interviewer
    setInterviewData((prevInterviewData) => ({
      ...prevInterviewData,
      interviewer_id: interviewer?._id,
      student_id: userId,
      total_score: score,
      level: level,
      mock_id: mockId,
      bookingDate: initialDate,
    }));
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews`,
        interviewData
      );
      navigate("/upcoming-interviews");
    } catch (error) {
      console.log("error", error);
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
            {/* <Select
              placeholder="Select Interviewer"
              size="lg"
              value={interviewer?.name}
              onChange={handleInterviewerChange}
            > */}
            <select
              onChange={handleInterviewerChange}
              required
              className={styles.select}
            >
              <option value="">Select an Interviewer</option>
              {interviewers?.map((interviewer) => (
                <option key={interviewer?._id} value={interviewer?.name}>
                  {interviewer?.name}
                </option>
              ))}
            </select>
            {/* </Select> */}
            <div className="date-picker-container">
              {dates?.length > 0 ? (
                // <DatePicker
                //   selected={date}
                //   onChange={handleDateChange}
                //   minDate={new Date()}
                //   // maxTime={parsedDates[parsedDates.length - 1]}
                //   includeDates={parsedDates}
                //   includeTimes={parsedDates}
                //   showTimeSelect
                //   dateFormat="MMMM d, yyyy h:mm aa"
                //   placeholderText="Select a date"
                //   inline
                // />
                <select
                  onChange={handleDateChange}
                  required
                  className={styles.select}
                >
                  <option value="">Select a Date</option>
                  {dates?.map((date, index) => (
                    <option key={index} value={date}>
                      {new Date(date).toLocaleString("en-US", dateOptions)}
                    </option>
                  ))}
                </select>
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
