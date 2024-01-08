import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://google-web-search1.p.rapidapi.com";
const apiHaeders = {
  "X-RapidAPI-Key": "6c2a704035mshed3f3f412f5f9aap1c236bjsnbaf789e00c56",
  "X-RapidAPI-Host": "google-web-search1.p.rapidapi.com",
};
// const baseUrl = "https://bing-news-search1.p.rapidapi.com";
// const apiHaeders = {
//   "X-BingApis-SDK": "true",
//   "X-RapidAPI-Key": "6c2a704035mshed3f3f412f5f9aap1c236bjsnbaf789e00c56",
//   "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
// };
const createRequest = (url) => ({ url, headers: apiHaeders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`/?query=${newsCategory}&limit=${count}`),
    }),
  }),
});
// export const cryptoNewsApi = createApi({
//   reducerPath: "cryptoNewsApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getNews: builder.query({
//       query: ({ newsCategory, count }) =>
//         createRequest(`/news/search?q=${newsCategory}&count=${count}`),
//     }),
//   }),
// });

export const { useGetNewsQuery } = cryptoNewsApi;
