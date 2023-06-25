/* eslint-disable react/prop-types */
// import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
//   Typography,
// } from "../../../node_modules/@mui/material";
// import ExpandMoreIcon from "../../../node_modules/@mui/icons-material/ExpandMore";

function Accordion_list(props) {
  let obj = props.data;
  let title = props.title;

  // const accordions = Object.keys(obj).map((key) => (
  //   <Accordion
  //     key={key}
  //     sx={{
  //       mb: "5px",
  //     }}
  //   >
  //     <AccordionSummary
  //       sx={{
  //         backgroundColor: "black",
  //         color: "#FAA621",
  //       }}
  //       expandIcon={<ExpandMoreIcon sx={{ color: "#FAA621" }} />}
  //       aria-controls={`${key}-content`}
  //       id={`${key}-header`}
  //     >
  //       {key}
  //     </AccordionSummary>
  //     <AccordionDetails>
  //       <List>
  //         {obj[key].map((ele) => (
  //           <ListItem
  //             key={ele.text}
  //             button
  //             component={Link}
  //             to={ele.link}
  //             target="_blank"
  //           >
  //             <ListItemText primary={ele.text} />
  //           </ListItem>
  //         ))}
  //       </List>
  //     </AccordionDetails>
  //   </Accordion>
  // ));

  return (
    <>
      {/* <Container maxWidth={"sm"} sx={{ mt: "20px" }}>
        <center>
          <Typography
            sx={{
              color: "black",
              fontSize: "1.5rem",
              mb: "10px",
              fontWeight: "600",
            }}
          >
            {title} Resources
          </Typography>
        </center>
        {accordions}
      </Container> */}
      <h1>Accordian List</h1>
    </>
  );
}

export { Accordion_list };
