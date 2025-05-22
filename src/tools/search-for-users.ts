import { z } from "zod";
import { makeLinkdRequest } from "../utils";

export const searchForUsersName = "search_for_users";

export const searchForUsersDescription = "Search for users on Linkd using filters like query, school, and match threshold.";

export const searchForUsersSchema = {
  query: z.string().describe("The search query, e.g., 'People working on AI at FAANG'"),
  limit: z.number().min(1).max(30).default(10).describe("Maximum number of results to return (1–30)"),
  school: z.array(z.string()).optional().describe("Filter by school name(s), e.g., ['Stanford', 'MIT']"),
  acceptance_threshold: z
    .number()
    .min(0)
    .max(100)
    .default(60)
    .describe("Match score threshold between 0 and 100"),
};

type SearchForUsersParams = {
  query: string;
  limit?: number;
  school?: string[];
  acceptance_threshold?: number;
};

export const searchForUsersTool = async ({
  query,
  limit = 10,
  school,
  acceptance_threshold = 60,
}: SearchForUsersParams) => {

  const url = new URL("https://search.linkd.inc/api/search/users");
  url.searchParams.append("query", query);
  url.searchParams.append("limit", String(Math.min(limit, 30)));
  url.searchParams.append("acceptance_threshold", String(Math.max(0, Math.min(100, acceptance_threshold))));

  if (school && school.length > 0) {
    school.forEach((s: string) => url.searchParams.append("school", s));
  }

  const response = await makeLinkdRequest(url.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to search for users: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `search completed succesfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
