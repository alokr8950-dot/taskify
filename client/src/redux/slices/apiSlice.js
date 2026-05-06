import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000"; // 🔥 FIX

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include", // 🔥 important for cookies
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});