import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "addresses",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
	endpoints: (builder) => ({
		addresses: builder.query<GeoJSON.FeatureCollection, void>({
			query: () => "/address/",
		}),
		unitList: builder.query<GeoJSON.FeatureCollection, void>({
			query: () => "/unit/",
		}),
	}),
});

export const { useAddressesQuery, useUnitListQuery } = apiSlice;
