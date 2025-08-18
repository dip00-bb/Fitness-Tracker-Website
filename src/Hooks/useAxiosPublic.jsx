// src/hooks/useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://fitnessserver-vert.vercel.app/", 
});

export default axiosPublic;



