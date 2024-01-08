import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com";
const apiHaeders = {
  "X-RapidAPI-Key": "6c2a704035mshed3f3f412f5f9aap1c236bjsnbaf789e00c56",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};
const createRequest = (url) => ({ url, headers: apiHaeders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCrypto: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/coin/Qwsogvtv82FCd/exchanges`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeroid }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeroid}`),
    }),
  }),
});

export const {
  useGetCryptoQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
