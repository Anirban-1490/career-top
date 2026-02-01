import { inngest } from "@/services/inngest/client";
import {
  trendsJob,
  updateIndustryTrendsCRON,
} from "@/services/inngest/functions/trends";

import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [trendsJob, updateIndustryTrendsCRON],
});
