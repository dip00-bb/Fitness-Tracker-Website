import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import axiosPublic from "../../../hooks/useAxiosPublic";


const useTrainerDetails = () => {
  const { user } = useContext(AuthContext);


  return useQuery({
    queryKey: ["trainer-details", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/trainers-dashboard-details/${user?.email}`);
      return data; 
    },
    enabled: !!user?.email, 
  });
};

export default useTrainerDetails;
