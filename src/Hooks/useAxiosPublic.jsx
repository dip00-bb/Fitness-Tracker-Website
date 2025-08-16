// src/hooks/useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000/", 
});

export default axiosPublic;


// https://fitnessserver-vert.vercel.app/
