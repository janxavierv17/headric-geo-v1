import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "addresses",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
	endpoints: (builder) => ({
		addresses: builder.query<void, void>({
			query: () => "/address/",
		}),
	}),
});

export const { useAddressesQuery } = apiSlice;
