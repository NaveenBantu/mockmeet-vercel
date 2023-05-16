import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import moment from "moment";
import { Badge } from "@chakra-ui/react";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InterviewCard = ({ id, title, date, time, interviewer }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let startTime = moment(`${date} ${time}`, "MM/DD/YYYY HH:mm:ss");
    let endTime = moment(
      moment().format("MM/DD/YYYY HH:mm:ss"),
      "MM/DD/YYYY hh:mm:ss"
    );
    let minutesDiff = startTime.diff(endTime, "minutes");

    if (minutesDiff <= 10 && minutesDiff >= 0) {
      setDisable(false);
    }
  }, []);

  const handleDeleteInterview = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/${id}`
      );
      setData(response.data);
      navigate("/upcoming-interviews");
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return (
    <center>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.container}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.details}>
            <>
              <h4>By:{interviewer}</h4>
              <Badge>{new Date(date).toLocaleString()}</Badge>
            </>
          </div>
          <button onClick={handleDeleteInterview}>Delete</button>
        </div>
      )}
    </center>
  );
};

export default InterviewCard;
