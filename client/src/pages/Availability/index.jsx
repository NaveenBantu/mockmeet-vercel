import React, { useState } from "react";
import styles from "./styles.module.css";
import { Select } from "@chakra-ui/select";
import { Card, CardBody, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { parseISO } from "date-fns";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";

const Availability = () => {
  const [date, setDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [interviewerData, setInterviewerData] = useState({
    name: "",
    mockType: "",
    availableDates: [],
    interviewer_id: "",
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

  // Posting the data to Interviews
  const { postRequest: postInterviewRequest, loading: postLoading } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/interviewers`
  );

  const { type } = data;
  // console.log(data);

  const handleDateChange = (date) => {
    // Setting the date on change of the date picker
    setDate(date);

    console.log("date change ", date);
  };

  const handleInterviewerChange = (event) => {
    const { value } = event.target;
    // const interviewer = interviewers.find((data) => data.name === value);

    // Setting internal state to get the available dates
    setMock(value);

    // Setting the first available date of the interviewer in the Calendar
    // setDate(parseISO(interviewer?.availableDates[0]));

    // Setting the form data for interviewer
    setInterviewerData((prevInterviewData) => ({
      ...prevInterviewData,
      interviewer_id: userId,
      name: user.fullName,
      mockType: value,
    }));
  };

  // const getAvailableDates = () => {
  //   const dates = interviewer?.availableDates;
  //   const parsedDates = dates?.map((date) => parseISO(date));
  //   return parsedDates;
  // };

  const handleSubmit = (e) => {
    // prevent the default form submit
    e.preventDefault();

    // submitting the form
    console.log(interviewerData);

    postInterviewRequest(interviewerData);

    navigate("/");
  };

  const handleTimeChange = () => {
    console.log(date);

    if (date !== "" && !interviewerData.availableDates.includes(date)) {
      // Setting form data
      // setAvailableDates((prevDates) => [...prevDates, date]);
      setInterviewerData((prevInterviewData) => ({
        ...prevInterviewData,
        availableDates: [...interviewerData.availableDates, date],
      }));
    }
  };
  console.log(interviewerData.availableDates);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <center>
      {loading || postLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h2 className={styles.text}>Availability {data?.title}</h2>
            <Select
              placeholder="Select MockType"
              // size="lg"
              isRequired
              value={mock?.type}
              onChange={handleInterviewerChange}
            >
              {data?.map((mock) => (
                <option key={mock?._id} value={mock?.type}>
                  {mock?.title}
                </option>
              ))}
            </Select>
            <div className="date-picker-container">
              {/* {getAvailableDates(interviewer)?.length > 0 ? ( */}
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                filterTime={filterPassedTime}
                // includeDates={getAvailableDates(interviewer)}
                // includeTimes={getAvailableDates(interviewer)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select a date"
                // inline
              />
              {/* ) : ( */}
              {/* <p>No Available dates</p> */}
              {/* )} */}
            </div>

            <button
              type="button"
              onClick={handleTimeChange}
              className={styles.button1}
            >
              Add Time
            </button>
            <ul>
              {interviewerData.availableDates.map((date) => {
                return <li>{new Date(date).toLocaleString()}</li>;
              })}
            </ul>
            <button type="submit" className={styles.button1}>
              Add Interview Slots
            </button>
          </form>
        </>
      )}
    </center>
  );
};
export default Availability;
