import React, { useEffect } from "react";
// import moment from "moment";
import dateOptions from "../../utils/dateOptions";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";

const InterviewCard = ({
  id,
  title,
  date,
  time,
  withPerson,
  isAdmin,
  handleDelete,
  handleComplete,
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

  const [isSmallerThanMd] = useMediaQuery("(max-width: 768px)");

  return (
    <Box>
      <Card
        backgroundColor="black"
        p={2}
        m={2}
        direction={isSmallerThanMd ? "column" : "row"}
        justify="space-between"
        alignItems="center"
      >
        <CardHeader color="#faa621">
          <Heading size="md" color="#faa621">
            {title}
          </Heading>
        </CardHeader>
        <CardBody py="0">
          <Heading size="sm" color="#faa621">
            {isAdmin ? `Student: ${withPerson}` : `Interviewer: ${withPerson}`}
          </Heading>
          <Badge p={2} mt={2}>
            {new Date(date).toLocaleString("en-US", dateOptions)}
          </Badge>
        </CardBody>
        <CardFooter>
          {isAdmin ? (
            <Button colorScheme="green" onClick={() => handleComplete(id)}>
              Complete
            </Button>
          ) : (
            <Button colorScheme="red" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
    </Box>
  );
};

export default InterviewCard;
