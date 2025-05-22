import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchForUsersName, searchForUsersDescription, searchForUsersSchema, searchForUsersTool } from "./tools/search-for-users";
import { searchForCompaniesName, searchForCompaniesDescription, searchForCompaniesSchema, searchForCompaniesTool } from "./tools/search-for-companies";
import { enrichLinkedinName, enrichLinkedinDescription, enrichLinkedinSchema, enrichLinkedinTool } from "./tools/enrich-linkedin";
import { retrieveContactsName, retrieveContactsDescription, retrieveContactsSchema, retrieveContactsTool } from "./tools/retrieve-contacts";
import { scrapeLinkedinName, scrapeLinkedinDescription, scrapeLinkedinSchema, scrapeLinkedinTool } from "./tools/scrape-linkedin";
import { initiateDeepResearchName, initiateDeepResearchDescription, initiateDeepResearchSchema, initiateDeepResearchTool } from "./tools/initiate-deep-research";
import { checkDeepResearchStatusName, checkDeepResearchStatusDescription, checkDeepResearchStatusSchema, checkDeepResearchStatusTool } from "./tools/check-deep-research-status";

function setupServer(server: McpServer) {
  // Register all tools
  server.tool(
    searchForUsersName,
    searchForUsersDescription,
    searchForUsersSchema,
    searchForUsersTool
  );

  server.tool(
    searchForCompaniesName,
    searchForCompaniesDescription,
    searchForCompaniesSchema,
    searchForCompaniesTool
  );

  server.tool(
    enrichLinkedinName,
    enrichLinkedinDescription,
    enrichLinkedinSchema,
    enrichLinkedinTool
  );

  server.tool(
    retrieveContactsName,
    retrieveContactsDescription,
    retrieveContactsSchema,
    retrieveContactsTool
  );

  server.tool(
    scrapeLinkedinName,
    scrapeLinkedinDescription,
    scrapeLinkedinSchema,
    scrapeLinkedinTool
  );

  server.tool(
    initiateDeepResearchName,
    initiateDeepResearchDescription,
    initiateDeepResearchSchema,
    initiateDeepResearchTool
  );

  server.tool(
    checkDeepResearchStatusName,
    checkDeepResearchStatusDescription,
    checkDeepResearchStatusSchema,
    checkDeepResearchStatusTool
  );
}

export default setupServer;
