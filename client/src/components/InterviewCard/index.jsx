import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import moment from "moment";

const InterviewCard = ({ title, date, time, interviewers }) => {
  const [disable, setDisable] = useState(true);

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
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.details}>
        <>
          <p>Date: {date.replaceAll("/", "-")}</p>
          <p>Time: {time.slice(0, 5)}</p>
          <p>By:{interviewers.join(", ")}</p>
          <button className={styles.join} disabled={disable}>
            Join
          </button>
        </>
      </div>
    </div>
  );
};

export default InterviewCard;
