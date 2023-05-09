import React, { useState } from "react";
import styles from "./styles.module.css";
import { Select } from "@chakra-ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { parseISO } from "date-fns";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [interviewer, setInterviewer] = useState("");

  const { mockId } = useParams();

  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  // Fetching the mocks
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/mocks/${mockId}`
  );

  const { interviewers } = data;

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleInterviewerChange = (event) => {
    setInterviewer(
      interviewers.find((data) => data.name === event.target.value)
    );
  };

  const getAvailableDates = () => {
    const dates = interviewer?.availableDates;
    const parsedDates = dates?.map((date) => parseISO(date));
    return parsedDates;
  };

  return (
    <center>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              includeDates={getAvailableDates(interviewer)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select a date"
              inline
            />
          </div>
          <button className={styles.button1}>Book Interview Slot</button>
        </>
      )}
    </center>
  );
};
export default Schedule;
