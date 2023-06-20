import { useEffect, useState } from "react";
// import axios from "axios";
import { useToast } from "@chakra-ui/react";
import api, { setAccessToken } from "../utils/apiCall";
import { useAuth } from "@clerk/clerk-react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Using Toast to display success or error messages
  const toast = useToast({
    position: "top-right",
    isClosable: true,
    duration: 3000,
  });

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Retrieve the Clerk access token
        const token = await getToken();
        // Set the access token in the API instance
        setAccessToken(token);

        // Fetch data
        const res = await api.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      // Retrieve the Clerk access token
      const token = await getToken();
      // Set the access token in the API instance
      setAccessToken(token);

      // Fetch data
      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
      toast({
        title: "Error occured !!!",
        description: err?.message,
        status: "error",
      });
    }
    setLoading(false);
  };

  const postRequest = async (postData) => {
    setLoading(true);

    try {
      // Retrieve the Clerk access token
      const token = await getToken();
      // Set the access token in the API instance
      setAccessToken(token);

      // Fetch data
      const response = await api.post(url, postData);
      setData(response.data);
    } catch (error) {
      setError(error);
      toast({
        title: "Error occured !!!",
        description: error?.message,
        status: "error",
      });
    }

    setLoading(false);
  };

  return { data, loading, error, reFetch, postRequest };
};

export default useFetch;
