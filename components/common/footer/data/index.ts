export type FooterLink = {
  id: string;
  label: string;
  url: string;
};

export type FooterSection = {
  id: string;
  title: string;
  links: FooterLink[];
};

export const footerData: FooterSection[] = [
  {
    id: "features",
    title: "Features",
    links: [
      { id: "linkedin-review", label: "LinkedIn Review", url: "" },
      { id: "whos-hiring", label: "Who's Hiring", url: "" },
      { id: "resume-review", label: "Resume Review", url: "" },
      { id: "job-tracker", label: "Job Tracker", url: "" },
      { id: "resume-builder", label: "Resume Builder", url: "" },
    ],
  },

  {
    id: "resources",
    title: "Resources",
    links: [
      { id: "blog", label: "Blog", url: "" },
      { id: "resume-templates", label: "Resume Templates", url: "" },
      { id: "community", label: "Community", url: "" },
      { id: "job-openings", label: "Job Openings", url: "" },
      { id: "gift-cards", label: "Gift Cards", url: "" },
    ],
  },
  {
    id: "information",
    title: "Information",
    links: [
      { id: "about", label: "About", url: "" },
      { id: "contact-us", label: "Contact Us", url: "" },
      { id: "privacy-policy", label: "Privacy Policy", url: "" },
      { id: "privacy-rights", label: "Your Privacy Rights", url: "" },
      { id: "terms-of-service", label: "Terms of Service", url: "" },
    ],
  },
];
