import { z } from "zod";
import { makeLinkdRequest } from "../utils";

export const initiateDeepResearchName = "initiate_deep_research";

export const initiateDeepResearchDescription = "Initiate a deep research job that combines multiple search variations with optional email enrichment. Each result costs 1 credit.";

export const initiateDeepResearchSchema = {
  query: z.string().describe("The search query to research"),
  limit: z.number().max(100).default(30).describe("Maximum number of results to return (default: 30, max: 100)"),
  school: z.array(z.string()).optional().describe("Filter results by school names"),
  enrich_emails: z.boolean().default(true).describe("Whether to enrich results with contact information (default: true)"),
  acceptance_threshold: z.number().min(0).max(100).default(60).describe("Acceptance score threshold (0-100) for a match (default: 60)"),
};

type InitiateDeepResearchParams = {
  query: string;
  limit?: number;
  school?: string[];
  enrich_emails?: boolean;
  acceptance_threshold?: number;
};

export const initiateDeepResearchTool = async ({
  query,
  limit = 30,
  school,
  enrich_emails = true,
  acceptance_threshold = 60,
}: InitiateDeepResearchParams) => {
  const apiUrl = new URL("https://search.linkd.inc/api/search/deep_research");
  const body = {
    query,
    limit: Math.min(limit, 100),
    school,
    enrich_emails,
    acceptance_threshold: Math.max(0, Math.min(100, acceptance_threshold)),
  };

  const response = await makeLinkdRequest(apiUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to initiate deep research: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `deep research job initiated: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
