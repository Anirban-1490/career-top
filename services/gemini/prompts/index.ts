import { TrendsType } from "@/modules/dashboard/components/trends/schema";
import dayjs from "dayjs";

export const AIEnhancerPrompt = (description: string) => `
Make yourself as a expert resume analyzer who gives very ATS friendly resume.
Now check this check this description of something the User has worked on, and improve it for ATS friendly

${description}

Put the output in this below format in JSON .


Output format - 
{
    enhancedText:{output}
}


DO NOT PUT ANY OTHER EXTRA TEXT, JUST OUTPUT ONLY IN THIS PROVIDED FORMAT.
ALSO KEEP THE SAME TYPE OF HTML MARKUP THAT THE USER HAS PROVIDED AND KEEP IT HTML ORIENTED.
AND DO NOT PROVIDE ANY EXTRA CONTEXT THAT THE USER HASENT PROVIDED IN ITS DESCRIPTION

`;

export const IndustryTrendsPrompt = ({
  industry,
  specialization,
  experience,
  currentSkills,
}: Omit<TrendsType, "nextUpdate">) => `
Make yourself as a expert industry analyzer who gives valuable industry statistics for recent date based on a industry and specialization .

Now check this preference of the user with the users skills - 

Industry: ${industry}
specialization: ${specialization}
experience: ${experience}
currentSkills: ${currentSkills}
currentDate: ${dayjs()}

Now based on this give me a Statistics of this Industry in this below JSON formate


Output format - 
{
    demandLevel:High | Medium | Low ,
    growthRate:{month:string,rate:number}[],
    recommendedSkills:["skill1","skill2"]
    topSkills:["skill1","skill2"],
    salaryRanges:[{ "role": string, "min": number, "max": number }],
}

explaination- 
demandLevel: demand level of that "specialization" of the user

growthRate: growth rate of this "specialization" of the user. give it for CURRENT MONTH OF CURRENT YEAR of "currentDate" and PREVIOUS 4 MONTHS from this CURRENT MONTH and give the rate in number (percentage). 
For example- if todays month is February of 2026 , then give data of Feb and 4 months before it (JAN 2026, DEC 2025, NOV 2025, OCT 2025) AND DONT GIVE VERY OLD YEARS DATA.

recommendedSkills: array of recommended skills for this "specialization" of the user. Total 5 Skills

topSkills: array of top skills for this "specialization" of the user. Total 5 Skills

salaryRanges: salary ranges of particular TOP 5 HIGH PAYING roles(in USD) inside of this "specialization" of the user and based on the users "experience". For example: like if User selects "Software Development" as 
specialization, You know it has lot of roles like Fullstack developer, Frontend developer



DO NOT PUT ANY OTHER EXTRA TEXT, JUST OUTPUT ONLY IN THIS PROVIDED FORMAT.

AND DO NOT PROVIDE ANY EXTRA CONTEXT THAT THE USER HASENT PROVIDED IN ITS PREFERENCE

`;
