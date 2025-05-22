import { z } from "zod";
import { makeLinkdRequest } from "../utils";

export const researchProfileName = "research_profile";

export const researchProfileDescription = "Combines profile enrichment with company data lookup in a single request. Takes an email or phone number as input and returns both the person's profile data and their current employer's company information.";

export const researchProfileSchema = {
  email: z.string().optional().describe("Email address to research. Exactly one of 'email' or 'phone' must be provided."),
  phone: z.string().optional().describe("Phone number to research. Exactly one of 'email' or 'phone' must be provided."),
};

type ResearchProfileParams = {
  email?: string;
  phone?: string;
};

export const researchProfileTool = async ({
  email,
  phone,
}: ResearchProfileParams) => {
  if (!email && !phone) {
    throw new Error("Either email or phone must be provided");
  }
  if (email && phone) {
    throw new Error("Only one of email or phone should be provided");
  }

  const apiUrl = new URL("https://search.linkd.inc/api/enrich/research");
  if (email) {
    apiUrl.searchParams.append("email", email);
  } else if (phone) {
    apiUrl.searchParams.append("phone", phone);
  }

  const response = await makeLinkdRequest(apiUrl.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to research profile: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `profile research completed successfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
