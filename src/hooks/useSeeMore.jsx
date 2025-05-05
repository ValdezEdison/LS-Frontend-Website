import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApiInstance } from "../services/AxiosConfig";

const useSeeMore = (initialData = [], nextPageUrl, listUpdater, listName="") => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(nextPageUrl);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(initialData);
    setNext(nextPageUrl);
  }, [initialData, nextPageUrl]);

  const loadMore = async () => {
    if (!next || loading) return;

    setLoading(true);
    setHasLoadedMore(true);
    try {
      // const response = await fetch(next); // Assuming `next` is a URL
      const response = await ApiInstance.get(next);
      
      const newData = response?.data;
      setData((prevData) => [...prevData, ...newData.results]);
      dispatch(listUpdater({ results: newData.results, next: newData.next, listName: listName }));
      setNext(newData.next);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    next,
    loadMore,
    hasLoadedMore,
  };
};

export default useSeeMore;