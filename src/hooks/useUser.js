import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getUserDetail } from "../api";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getUserDetail();
        return userDetail;
      } catch (err) {
        if (!err.message.includes("not authenticated")) {
          console.log(err.message);
        }
        throw err;  // Ensure the error is re-thrown to be caught by React Query
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useUser;


