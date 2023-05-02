import React from "react";
import Card from "../../components/Card";

const MockTypes = () => {
  const mockTypes = [
    {
      _id: "1",
      title: "Full-stack Interview",
      type: "full-stack",
      score: 50,
      interviewers: ["644d9b0db60b99bb257dbe5d", "644da18cb2bbb460d2b49d9e"],
    },
    {
      _id: "2",
      title: "Frontend Interview",
      type: "frontend",
      score: 25,
      interviewers: ["644da18cb2bbb460d2b49d9e"],
    },
    {
      _id: "3",
      title: "Backend Interview",
      type: "backend",
      score: 25,
      interviewers: ["644d9b0db60b99bb257dbe5d", "644da18cb2bbb460d2b49d9e"],
    },
    {
      _id: "4",
      title: "DSA Interview",
      type: "dsa",
      score: 40,
      interviewers: ["644da18cb2bbb460d2b49d9e"],
    },
  ];

  return (
    <>
      <h1>MockTypes</h1>
      {mockTypes.map((type) => {
        return <Card title={type.title} />;
      })}
    </>
  );
};

export default MockTypes;
