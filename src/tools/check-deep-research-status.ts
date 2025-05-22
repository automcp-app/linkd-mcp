import { z } from "zod";
import { makeLinkdRequest } from "../utils";

export const checkDeepResearchStatusName = "check_deep_research_status";

export const checkDeepResearchStatusDescription = "Check the status of an ongoing deep research job.";

export const checkDeepResearchStatusSchema = {
  job_id: z.string().describe("The job ID to check status for"),
};

type CheckDeepResearchStatusParams = {
  job_id: string;
};

export const checkDeepResearchStatusTool = async ({
  job_id,
}: CheckDeepResearchStatusParams) => {
  const statusUrl = new URL(`https://search.linkd.inc/api/search/deep_research/${job_id}`);
  const response = await makeLinkdRequest(statusUrl.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to check deep research status: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `deep research status: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
