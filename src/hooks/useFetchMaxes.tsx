import { useEffect } from "react";
import {
  useUserMaxes,
  useUserMaxesUpdate,
  UserMaxes,
} from "../contexts/UserMaxesContext";
import { fetchData } from "../utils/api";

const useFetchMaxes = (userId?: string) => {
  const userMaxes = useUserMaxes();
  const setUserMaxes = useUserMaxesUpdate();

  const setData = async () => {
    try {
      const url = userId
        ? `/dashboard/orm-records/${userId}`
        : `/dashboard/orm-records`;

      const response = await fetchData(url, "One Rep Maxes", true);

      const data: UserMaxes[] = response?.data;

      if (data.length) {
        const { squat, benchpress, deadlift } = data[0];
        setUserMaxes({ squat, benchpress, deadlift });
      }
    } catch (err) {
      console.error("Error Fetching One Rep Maxes:", err);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return userMaxes;
};

export default useFetchMaxes;
