import React from "react";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/LoadingSpinner";

const MockTypes = () => {
  const { data, loading, error } = useFetch("http://localhost:5050/api/mocks");

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
