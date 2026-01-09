import axios from "axios";

// Base URL from .env
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/api",
});

// --- Contact Form ---
export const submitContactForm = async (data) => {
  const res = await API.post("/contact", data);
  return res.data;
};

// --- AI Waitlist ---
export const submitWaitlistForm = async (data) => {
  const res = await API.post("/ai-waitlist", data);
  return res.data;
};

// --- Admin Routes (optional) ---
export const getContactSubmissions = async () => {
  const res = await API.get("/admin/contact-submissions");
  return res.data;
};

export const getWaitlistSubmissions = async () => {
  const res = await API.get("/admin/waitlist-submissions");
  return res.data;
};
