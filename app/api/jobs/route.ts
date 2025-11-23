import axios, { Axios } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const axiosInstance = axios.create({
  headers: {
    "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
    "x-rapidapi-host": `${process.env.RAPID_API_DOMAIN}`,
  },
});

export async function GET(request: NextRequest) {
  try {
    const jobResult = await axiosInstance.get(
      `https://jsearch.p.rapidapi.com/search`,
      {
        params: {
          query: "front end developer",
        },
      }
    );

    return new Response(JSON.stringify(jobResult.data), {
      status: 200,
    });
  } catch (error) {
    const { response, status } = { ...error };

    return Response.json(
      { error, message: response.data.message },
      { status: status }
    );
  }
}
