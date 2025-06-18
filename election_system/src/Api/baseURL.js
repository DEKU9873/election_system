import axios from "axios";

const baseURL = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  // baseURL: "http://192.168.100.180:8000",
  // baseURL: "http://127.0.0.1:8000/",
  // baseURL: "http://192.168.100.18:8000/",
  // baseURL: "http://localhost:8000",
  baseURL: "https://fornisc-e-backnd.onrender.com/",


  
  // baseURL: "https://forednsic-python-backen.onrender.com/",
  // baseURL: "https://forensic-backend.onrender.com/",
});

export default baseURL;