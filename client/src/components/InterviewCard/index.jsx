import React, { useEffect } from "react";
import styles from "./styles.module.css";
import moment from "moment";
import { Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const InterviewCard = ({
  id,
  title,
  date,
  time,
  interviewer,
  handleDelete,
}) => {
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

  return (
    <center>
      <div className={styles.container}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.details}>
          <>
            <h4>By:{interviewer}</h4>
            <Badge>{new Date(date).toLocaleString()}</Badge>
          </>
        </div>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </center>
  );
};

export default InterviewCard;
