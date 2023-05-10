import React from "react";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const MockTypes = () => {
  const { isLoaded, isSignedIn, sessionId } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded || !isSignedIn) {
    navigate("/sign-in");
  }

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/mocks?_clerk_session_id=${sessionId}`
  );

  return (
    <center>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>MockTypes</h1>
          {data.map((type) => {
            return <Card title={type.title} link={`/schedule/${type._id}`} />;
          })}
        </>
      )}
    </center>
  );
};

export default MockTypes;
