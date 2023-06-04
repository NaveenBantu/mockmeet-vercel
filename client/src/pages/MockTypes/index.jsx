import React from "react";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaDiceOne, FaDiceTwo, FaDiceThree } from "react-icons/fa";
import { Heading } from "@chakra-ui/react";

const MockTypes = () => {
  const { isLoaded, isSignedIn, sessionId } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/mocks`
  );

  return (
    <center>
      {loading || !isLoaded ? (
        <LoadingSpinner />
      ) : (
        <>
          <Heading m={4}>MockTypes</Heading>
          {data.map((type, i) => {
            // Allocating icons according to the levels
            let icon = "";
            switch (type.level) {
              case 1:
                icon = FaDiceOne;
                break;
              case 2:
                icon = FaDiceTwo;
                break;
              case 3:
                icon = FaDiceThree;
                break;
              default:
                break;
            }
            // Returning the Card component
            return (
              <Card
                key={i}
                icon={icon}
                title={type.title}
                link={`/schedule?mockId=${type._id}&score=${type.score}`}
              />
            );
          })}
        </>
      )}
    </center>
  );
};

export default MockTypes;
