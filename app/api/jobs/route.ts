import { removeUndefinedKeyValues } from "@/lib/utils";
import { JobSearchType } from "@/modules/dashboard/components/jobs/schema";
import axios, { Axios } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { scrapeJobs } from "ts-jobspy";
export const axiosInstance = axios.create({
  headers: {
    "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
    "x-rapidapi-host": `${process.env.RAPID_API_DOMAIN}`,
  },
});

// export async function GET(request: NextRequest) {
//   try {
//     const jobResult = await axiosInstance.get(
//       `https://jsearch.p.rapidapi.com/search`,
//       {
//         params: {
//           query: "front end developer",
//         },
//       }
//     );

//     return new Response(JSON.stringify(jobResult.data), {
//       status: 200,
//     });
//   } catch (error) {
//     // const newError = structuredClone(error) ;

//     return Response.json(
//       { error, message: "Unexpected Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function getJobs(params: Record<string, unknown>) {
  return await scrapeJobs({
    siteName: ["indeed", "linkedin"],
    resultsWanted: 5,
    descriptionFormat: "html",
    linkedinFetchDescription: true,
    ...params,
    // hoursOld: params.hoursOld ? parseInt(params.hoursOld as string) : 72,
    // location: searchParams.location,
    // searchTerm: searchParams.searchTerm,

    ...(params.jobType ? { jobType: params.jobtype as string } : {}),
    ...(params.isRemote
      ? { isRemote: (params.isRemote as unknown) === "true" ? true : false }
      : {}),

    ...(params.easyApply
      ? { easyApply: (params.easyApply as unknown) === "true" ? true : false }
      : {}),

    ...(params.hoursOld
      ? { hoursOld: parseInt(params.hoursOld as string) || 24 }
      : {}),
  });
}

export async function GET(request: NextRequest) {
  // console.log(request.nextUrl.searchParams);

  const jobData = await getJobs(
    Object.fromEntries(
      request.nextUrl.searchParams.entries(),
    ) as unknown as JobSearchType,
  );

  return NextResponse.json(jobData);
}
