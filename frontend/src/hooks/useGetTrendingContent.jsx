import { useEffect, useState } from "react";
import axios from "axios";
import { useContentStore } from "../store/contentType";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const getTrendingContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`, {
          signal: controller.signal, // Pass the signal to Axios
        });
        console.log(res.data.content);
        setTrendingContent(res.data.content);
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Request canceled:", err.message);
        } else if (err.code === "ECONNABORTED") {
          console.error("Request timed out:", err.message);
        } else {
          console.error("An error occurred:", err.message);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    getTrendingContent();

    return () => {
      controller.abort(); // Cancel the request when the component unmounts
    };
  }, [contentType]);

  return { trendingContent, loading, error };
};

export default useGetTrendingContent;
