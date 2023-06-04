// import Card from "../../components/Card";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";

import styles from "./styles.module.css";

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
      <Heading m={4}>Feedbacks</Heading>
      <Accordion allowMultiple m={4}>
        {feedbacks.length === 0 ? (
          <h3>No Feedbacks</h3>
        ) : (
          feedbacks.map((feedbackItem) => {
            // return <Card key={feedback._id} title={feedback.title} />;
            return (
              <AccordionItem key={feedbackItem._id}>
                <h2>
                  <AccordionButton className={styles.container}>
                    <Box
                      className={styles.title}
                      as="span"
                      flex="1"
                      textAlign="left"
                    >
                      {feedbackItem.title}
                    </Box>
                    <AccordionIcon className={styles.icon} />
                  </AccordionButton>
                  <AccordionPanel className={styles.accordian_panel} pb={4}>
                    {feedbackItem.feedback}
                  </AccordionPanel>
                </h2>
              </AccordionItem>
            );
          })
        )}
      </Accordion>
      {}
    </>
  );
};

export default Feedback;
