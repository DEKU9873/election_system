import axios from "axios";

const baseURL = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  // baseURL: "http://192.168.100.180:8000",
  // baseURL: "http://127.0.0.1:8000/",
  // baseURL: "http://192.168.100.18:8000/",
  // baseURL: "http://localhost:8000",
  // baseURL: "http://192.168.100.201:5000/",
  // baseURL: "http://192.168.0.104:5000/",
  baseURL: "http://localhost:5000/",


  
  // baseURL: "https://forednsic-python-backen.onrender.com/",
  // baseURL: "https://forensic-backend.onrender.com/",
});

export default baseURL;