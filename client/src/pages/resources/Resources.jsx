/* eslint-disable react/jsx-key */
// import React from "react";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/LoadingSpinner";

const Resources = () => {
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_REACT_API_URL}/mocks`
  );

  return (
    <center>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Resources</h1>
          {data.map((type) => {
            return (
              <Card
                title={`${type.title} Resource`}
                link={`/resource/${type.type}`}
              />
            );
          })}
        </>
      )}
    </center>
  );
};

export default Resources;
