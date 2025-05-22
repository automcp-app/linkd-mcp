import { z } from "zod";
import { makeLinkdRequest } from "../utils";

export const searchForCompaniesName = "search_for_companies";

export const searchForCompaniesDescription = "Search for companies on Linkd using filters like query and match threshold.";

export const searchForCompaniesSchema = {
  query: z.string().describe("The search query, e.g., 'Tech companies in California'"),
  limit: z.number().min(1).max(30).default(10).describe("Maximum number of results to return (1–30)"),
  acceptance_threshold: z
    .number()
    .min(0)
    .max(100)
    .default(60)
    .describe("Match score threshold between 0 and 100"),
};

type SearchForCompaniesParams = {
  query: string;
  limit?: number;
  acceptance_threshold?: number;
};

export const searchForCompaniesTool = async ({
  query,
  limit = 10,
  acceptance_threshold = 60,
}: SearchForCompaniesParams) => {
  const url = new URL("https://search.linkd.inc/api/search/companies");
  url.searchParams.append("query", query);
  url.searchParams.append("limit", String(Math.min(limit, 30)));
  url.searchParams.append("acceptance_threshold", String(Math.max(0, Math.min(100, acceptance_threshold))));

  const response = await makeLinkdRequest(url.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to search for companies: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `search completed successfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
