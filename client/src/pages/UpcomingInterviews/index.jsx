import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import InterviewCard from "../../components/InterviewCard";

const UpcomingInterviews = () => {
  const upcomingInterviews = [
    {
      _id: "1",
      title: "Full-stack Interview",
      type: "full-stack",
      date: "06/06/2023",
      time: "10:00:00",
      interviewers: ["Urvashi", "Bhargav"],
    },
    {
      _id: "2",
      title: "Frontend Interview",
      type: "frontend",
      date: "07/18/2023",
      time: "11:00:00",
      interviewers: ["Urvashi", "Bhargav"],
    },
    {
      _id: "3",
      title: "Backend Interview",
      type: "backend",
      date: "09/18/2023",
      time: "18:00:00",
      interviewers: ["Bhargav", "Naveen"],
    },
    {
      _id: "4",
      title: "DSA Interview",
      type: "dsa",
      date: "05/04/2023",
      time: "16:05:00",
      interviewers: ["Vamsi", "Bhargav"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      {upcomingInterviews.map((type) => {
        return (
          <>
            <InterviewCard
              title={type.title}
              date={type.date}
              time={type.time}
              interviewers={type.interviewers}
            />
          </>
        );
      })}
    </div>
  );
};

export default UpcomingInterviews;
