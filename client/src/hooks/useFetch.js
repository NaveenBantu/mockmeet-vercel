import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Using Toast to display success or error messages
  const toast = useToast({
    position: "top-right",
    isClosable: true,
    duration: 3000,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
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
      const res = await axios.get(url);
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
      const response = await axios.post(url, postData);
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
