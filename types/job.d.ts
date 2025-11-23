export interface IJobDataProps {
  job_id: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  employer_company_type: string | null;
  employer_linkedin: string | null;
  job_publisher: string | null;
  job_employment_type: string;
  job_employment_types: string[];
  job_employment_type_text: string;
  job_title: string;
  job_apply_link: string;
  job_apply_is_direct: boolean;
  job_apply_quality_score: string | null;
  apply_options: {
    publisher: string;
    apply_link: string;
    is_direct: boolean;
  }[];

  job_description: string;
  job_is_remote: boolean;
  job_posted_human_readable: string;
  job_posted_at: string;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_location: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string[] | null;
  job_google_link: string;
  job_offer_expiration_datetime_utc: string | null;
  job_offer_expiration_timestamp: number | null;
  job_required_experience: {
    no_experience_required: boolean;
    required_experience_in_months: number | null;
    experience_mentioned: boolean;
    experience_preferred: boolean;
  };

  job_salary: number | null;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_highlights: { Qualifications: string[]; Responsibilities: string[] };
  job_job_title: string | null;
  job_posting_language: string | null;
  job_onet_soc: number;
  job_onet_job_zone: string;
  job_occupational_categories: string | null;
  job_naics_code: number | null;
  job_naics_name: string | null;
}

export interface IJobsResponseProps {
  status: string;
  request_id: string;
  parameters: {
    query: string;
    page: number;
    num_pages: number;
    country: string;
    language: string;
  };
  data: IJobDataProps[];
}
