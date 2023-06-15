import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

import styles from "./styles.module.css";
import { useUser } from "@clerk/clerk-react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";
import axios from "axios";

const FeedbackList = ({ data }) => {
  return (
    <>
      <Heading m={4}>Feedbacks</Heading>
      <Accordion allowMultiple m={4}>
        {data.length === 0 ? (
          <h3>No Feedbacks</h3>
        ) : (
          data.map((feedbackItem) => {
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
                      {feedbackItem?.mock_id.title}
                    </Box>
                    <AccordionIcon className={styles.icon} />
                  </AccordionButton>
                  <AccordionPanel className={styles.accordian_panel} pb={4}>
                    {feedbackItem.feedback !== ""
                      ? feedbackItem.feedback
                      : "Still waiting for the Feedback"}
                  </AccordionPanel>
                </h2>
              </AccordionItem>
            );
          })
        )}
      </Accordion>
    </>
  );
};

const FeedbackForm = ({ data }) => {
  const [id, setID] = useState("");
  const [formData, setFormData] = useState({
    feedback: "",
    score: "",
  });

  // Using Toast to display success or error messages
  const toast = useToast({
    position: "top-right",
    isClosable: true,
    duration: 3000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInterviewChange = (e) => {
    const { value } = e.target;
    setID(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // submitting the form
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/${id}`,
        formData
      );
      toast({
        title: "Feedback updated",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error occured !!!",
        description: error?.message,
        status: "error",
      });
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" p="4">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel htmlFor="id" fontSize="2xl">
            Interview Feedback
          </FormLabel>
          <Select
            name="id"
            value={formData._id}
            onChange={handleInterviewChange}
            placeholder="Select Interview"
          >
            {data?.map((interview) => (
              <option value={interview?._id}>{`${
                interview?.student.name
              } on ${new Date(
                interview?.bookingDate
              ).toLocaleString()}`}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb="4">
          <FormLabel htmlFor="score">Score:</FormLabel>
          <Input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel htmlFor="feedback">Message:</FormLabel>
          <Textarea
            name="feedback"
            value={formData.message}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
};

const Feedback = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const emailAddress = user?.primaryEmailAddress.emailAddress;
  const isAdmin = emailAddress?.includes("hashinsert");
  const userID = user?.id;

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/bookinginterviews/user/${
      isAdmin ? "i" : "s"
    }/${userID}?complete=true`
  );

  console.log(data);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : isAdmin ? (
        <FeedbackForm data={data} />
      ) : (
        <FeedbackList data={data} />
      )}
    </>
  );
};

export default Feedback;
