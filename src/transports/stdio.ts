import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { NAME, VERSION } from "../common";

import setupServer from "../server_setup";

async function setupSSE(server: McpServer) {
  setupServer(server);

  let transport: StdioServerTransport;

  transport = new StdioServerTransport();
  await server.connect(transport);
}

export async function createStdioServer() {
  const server = new McpServer(
    {
      name: NAME,
      version: VERSION,
    },
    {
      capabilities: {
        resources: {},
      },
    }
  );

  setupSSE(server);
}
