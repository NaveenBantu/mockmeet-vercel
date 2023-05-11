import React, { useState } from "react";
import styles from "./styles.module.css";
import { Select } from "@chakra-ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { parseISO } from "date-fns";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [interviewData, setInterviewData] = useState({
    mock_id: "",
    total_score: "",
    student_id: "",
    interviewer_id: "",
    bookingDate: "",
  });
  const [interviewer, setInterviewer] = useState("");

  const { mockId } = useParams();

  const { isLoaded, isSignedIn, userId } = useAuth();
  const navigate = useNavigate();

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  // Fetching the mocks
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/mocks/${mockId}`
  );

  // Posting the data to Interviews
  const { postRequest: postInterviewRequest, loading: postLoading } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews`
  );

  const { interviewers, score } = data;

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
    setDate(parseISO(interviewer?.availableDates[0]));

    // Setting the form data for interviewer
    setInterviewData((prevInterviewData) => ({
      ...prevInterviewData,
      interviewer_id: interviewer._id,
      student_id: userId,
      total_score: score,
      mock_id: mockId,
    }));
  };

  const getAvailableDates = () => {
    const dates = interviewer?.availableDates;
    const parsedDates = dates?.map((date) => parseISO(date));
    return parsedDates;
  };

  const handleSubmit = (e) => {
    // prevent the default form submit
    e.preventDefault();

    // submitting the form
    console.log(interviewData);

    postInterviewRequest(interviewData);

    navigate("/");
  };

  return (
    <center>
      {loading || postLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h3 className={styles.text}>Schedule {data?.title}</h3>
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
                <p>No Available dates</p>
              )}
            </div>
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
