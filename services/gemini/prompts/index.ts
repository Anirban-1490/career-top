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
