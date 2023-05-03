import Card from "../../components/Card";
import { useState, useEffect } from "react";

async function fetchFeedbacks() {
  // const response = await fetch("http://localhost:5000/feedbacks");
  // const data = await response.json();
  const data = [
    {
      _id: "1",
      title: "Full-stack Interview",
      type: "full-stack",
      score: 50,
      feedback:
        "Good with the basics of HTML, CSS, JS, React, Node, Express, MongoDB, and Git. Needs to work on DSA and problem solving skills.",
      interviewers: ["644d9b0db60b99bb257dbe5d", "644da18cb2bbb460d2b49d9e"],
      date: 1234567890,
    },
    {
      _id: "2",
      title: "Frontend Interview",
      type: "frontend",
      score: 25,
      feedback:
        "Good with the basics of HTML, CSS, JS, React, and Git. Needs to work on DSA and problem solving skills.",
      interviewers: ["644da18cb2bbb460d2b49d9e"],
      date: 1234567890,
    },
  ];
  return data;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const getFeedbacks = async () => {
      const feedbacksFromServer = await fetchFeedbacks();
      setFeedbacks(feedbacksFromServer);
    };
    getFeedbacks();
  }, []);
  return (
    <>
      <h1>Feedbacks</h1>
      {feedbacks.length === 0 ? (
        <h3>No Feedbacks</h3>
      ) : (
        feedbacks.map((feedback) => {
          return <Card key={feedback._id} title={feedback.title} />;
        })
      )}

      {}
    </>
  );
};

export default Feedback;
