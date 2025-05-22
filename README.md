# Linkd MCP Server
[![smithery badge](https://smithery.ai/badge/@automcp/linkd)](https://smithery.ai/server/@automcp/linkd)

This is Linkd's Model Context Protocol (MCP) Server. It provides tools to search and interact with LinkedIn data in a privacy-preserving way.

More information about Linkd can be found at [automcp.app](https://automcp.app).

More information about the Model Context Protocol can be found [here](https://modelcontextprotocol.io/introduction).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tools](#tools)
- [Configuration](#configuration)
- [License](#license)

## Installation

### Manual Installation
To install the server, run:

```bash
npx linkd-mcp <YOUR-LINKD-API-KEY>
```

## Running on Cursor
Add to `~/.cursor/mcp.json` like this:
```json
{
  "mcpServers": {
    "linkd": {
      "command": "npx",
      "args": ["-y", "linkd-mcp"],
      "env": {
        "LINKD_API_KEY": "YOUR-API-KEY"
      }
    }
  }
}
```

## Running on Windsurf
Add to your `./codeium/windsurf/model_config.json` like this:
```json
{
  "mcpServers": {
    "linkd": {
      "command": "npx",
      "args": ["-y", "linkd-mcp"],
      "env": {
        "LINKD_API_KEY": "YOUR-API-KEY"
      }
    }
  }
}
```

### Development

For development purposes, you can run the server directly from the source code.

1. Clone the repository:

   ```sh
   git clone git@github.com:automcp/linkd.git linkd-mcp
   cd linkd-mcp
   ```

2. Install dependencies:

   ```sh
   npm install # or yarn install
   npm run build
   ```

3. Run the server:

   ```sh
   node dist/server.js
   ```

## Claude Desktop app
This is an example config for the Linkd MCP server for the Claude Desktop client.

```json
{
  "mcpServers": {
    "linkd": {
      "command": "npx",
      "args": ["--yes", "linkd-mcp"],
      "env": {
        "LINKD_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Tools
* `search_for_users` - Search for LinkedIn users with filters like query, school, and match threshold

### Installing via Smithery

To install Linkd MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@automcp/linkd):

```bash
npx -y @smithery/cli install @automcp/linkd --client claude
```

## Resources

The server provides documentation about Linkd through the `resources` methods. Any client which can do discovery over resources has access to it.

## License

This project is licensed under the MIT License.
