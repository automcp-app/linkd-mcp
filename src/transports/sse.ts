import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { requireBearerAuth } from "@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js";

import { NAME, VERSION } from "../common";
import setupServer from "../server_setup";

function setupSSE(app: express.Application, server: McpServer) {
  setupServer(server);

  console.log("Setting up SSE server");

  let transport: SSEServerTransport;

  app.get("/sse", async (req, res) => {
    transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
  });

  app.post("/messages", async (req, res) => {
    if (!transport) {
      res.status(400).send("No transport found");
      return;
    }
    await transport.handlePostMessage(req, res);
  });
}

export async function createSSEServer() {
  const app = express();
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

  setupSSE(app, server);

  return app;
}
