import React, { useEffect } from "react";
// import moment from "moment";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const InterviewCard = ({
  id,
  title,
  date,
  time,
  interviewer,
  handleDelete,
}) => {
  // useEffect(() => {
  //   let startTime = moment(`${date} ${time}`, "MM/DD/YYYY HH:mm:ss");
  //   let endTime = moment(
  //     moment().format("MM/DD/YYYY HH:mm:ss"),
  //     "MM/DD/YYYY hh:mm:ss"
  //   );
  //   let minutesDiff = startTime.diff(endTime, "minutes");

  //   if (minutesDiff <= 10 && minutesDiff >= 0) {
  //     setDisable(false);
  //   }
  // }, []);

  // Date formatting options
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <Box>
      <Card
        backgroundColor="black"
        p={2}
        m={2}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <CardHeader color="#faa621">
          <Heading size="md" color="#faa621">
            {title}
          </Heading>
        </CardHeader>
        <CardBody>
          <Heading size="sm" color="#faa621">
            By: {interviewer}
          </Heading>
          <Badge p={2} mt={2}>
            {new Date(date).toLocaleString("en-US", dateOptions)}
          </Badge>
        </CardBody>
        <CardFooter>
          <Button colorScheme="red" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default InterviewCard;
