import React, { useState, useEffect } from "react";
import styles from "../Leaderboard/styles.module.css";
import {
  Center,
  Table,
  TableContainer,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

const data = {
  Userscore: "320",
  UserRank: 4,
  allScores: [
    {
      score: 400,
      name: "athiya",
      id: "64512411d1bbcb801c61df5a",
    },
    {
      score: 370,
      name: "fathima",
      id: "6451243ad1bbcb801c61df5e",
    },
    {
      score: 350,
      name: "shobitha",
      id: "6451241ed1bbcb801c61df5c",
    },
    {
      score: 320,
      name: "Nikhil",
      id: "645123a997d0f3709355d4a2",
    },
  ],
};
const Leaderboard = () => {
  const [prevRank, setPrevRank] = useState(data.UserRank);

  useEffect(() => {
    setPrevRank(data.UserRank);
  }, [data]);

  const rankDiff = prevRank - data.UserRank;
  const isRankIncreased = rankDiff < 0;

  return (
    <div>
      <Center>
        <div className={styles.container}>
          <h1>Performance</h1>
          <div className={styles.card}>
            <div>
              <span className={styles.text}>Score : </span>
              <span className={styles.score}>{data.Userscore}</span>
            </div>
            <div>
              <StatGroup>
                <Stat className="styles.rankContainer">
                  <StatLabel className={styles.rank}>Rank : </StatLabel>
                  <StatNumber className={styles.rankDisplay}>
                    {data.UserRank}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow
                      className={styles.difference}
                      type={isRankIncreased ? "increase" : "decrease"}
                    />
                    <span className={styles.diff}>{Math.abs(rankDiff)}</span>
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </div>
          </div>
          <div className={styles.table}>
            <TableContainer>
              <Table striped="true" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Student</Th>
                    <Th>Score</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.allScores.map((student, index) => (
                    <Tr key={student.id}>
                      <Td>{student.name}</Td>
                      <Td>{student.score}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Center>
    </div>
  );
};

export default Leaderboard;
