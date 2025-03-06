import { useState, useEffect } from "react";

const useSeeMore = (initialData = [], nextPageUrl) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(nextPageUrl);

  useEffect(() => {
    setData(initialData);
    setNext(nextPageUrl);
  }, [initialData, nextPageUrl]);

  const loadMore = async () => {
    if (!next || loading) return;

    setLoading(true);
    try {
      const response = await fetch(next); // Assuming `next` is a URL
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData.results]);
      setNext(newData.next);
    } catch (error) {
      console.error("Failed to load more places:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    next,
    loadMore,
  };
};

export default useSeeMore;