import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { Select } from "@chakra-ui/select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { parseISO } from "date-fns";

import LoadingSpinner from "../../components/LoadingSpinner";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [interviewer, setInterviewer] = useState("");

  const { mockId } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:5050/api/mocks/${mockId}`
  );

  console.log(data);
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
