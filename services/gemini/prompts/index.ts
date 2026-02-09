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

export const resumeOptimizerPrompt = `
Make Yourself a expert resume optimizer who analyzes resumes and gives tips on which part to improve and how to improve to be more
ATS friendly

Now take a look at this file content that is being shared. This is a resume.
and provide what optimizations need in this output JSON format:

Output - 
        {
            optimization:{
             // 1. Provide each section you see in resume here with what to improve in array of objects, skip education and personal infos
             // 2. IF A RESUME DONT HAVE A SECTION THAT IS PROVIDED HERE, THEN put Null and dont score, ex- if no projects in resume , then projects:null
            // 3. put all improvements in differnet points in the improvements array for each section, each point is a object which has a text field for
            // the actual improvement and status field to show if this perticular improvement is Urgent or Critical or Optional
            //4. The Max length of the improvements will be 3 , so at max 3 improvements can be provided

                experience:{
                    improvements:string[{text:string,status:URGENT | CRITICAL | OPTIONAL}], 
                    fixCount:{
                        urgent:number,optional:number,critical:number //this is evaluated from this improvements in this section 
                    }
                    status: Looks Good | Needs Fix //if only optional fixcount then - Looks good,if this section need critical/urgent fix- Needs Fix

                },
                projects:{
                    improvements:string[{text:string,status:URGENT | CRITICAL | OPTIONAL}],
                    fixCount:{
                        urgent:number,optional:number,critical:number //this is evaluated from this improvements in this section 
                    }
                    status: Looks Good | Needs Fix //if only optional fixcount then - Looks good,if this section need critical/urgent fix- Needs Fix

                },
                achievements:{
                    improvements:string[{text:string,status:URGENT | CRITICAL | OPTIONAL}],
                    fixCount:{
                        urgent:number,optional:number,critical:number //this is evaluated from this improvements in this section 
                    }
                    status: Looks Good | Needs Fix //if only optional fixcount then - Looks good,if this section need critical/urgent fix- Needs Fix

                },
                certifications:{
                    improvements:string[{text:string,status:URGENT | CRITICAL | OPTIONAL}],
                    fixCount:{
                        urgent:number,optional:number,critical:number //this is evaluated from this improvements in this section 
                    }
                    status: Looks Good | Needs Fix //if only optional fixcount then - Looks good,if this section need critical/urgent fix- Needs Fix

                },
                extracurricular:{
                    improvements:string[{text:string,status:URGENT | CRITICAL | OPTIONAL}],
                    fixCount:{
                        urgent:number,optional:number,critical:number //this is evaluated from this improvements in this section 
                    }
                    status: Looks Good | Needs Fix //if only optional fixcount then - Looks good,if this section need critical/urgent fix- Needs Fix

                },
                publications:{
                    improvements:string[{text:string,status:URGENT | CRITICAL | OPTIONAL}],
                    fixCount:{
                        urgent:number,optional:number,critical:number //this is evaluated from this improvements in this section 
                    }
                    status: Looks Good | Needs Fix //if only optional fixcount then - Looks good,if this section need critical/urgent fix- Needs Fix

                }
            } 
            score: {0-10} , in 1 digit fix after a decmal, like 9.5 etc
            grade: A | B+ | B | C+ | C | D+ | D | F // A being if score is 9 or 10 and F being 1-2
            totalFixCount:{
                            urgent:number,optional:number,critical:number
                        } //total fix counts across  all the sections above
        }

    
   OUTPUT WILL BE NULL, if you see the resume dont have ANY or even sections that are closely matching with the sections provided above 


    DO NOT PUT ANY OTHER EXTRA TEXT, JUST OUTPUT ONLY IN THIS PROVIDED FORMAT.

    AND DO NOT PROVIDE ANY EXTRA CONTEXT THAT THE USER HASENT PROVIDED IN ITS PREFERENCE
`;
