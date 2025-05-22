# Linkd MCP Server

This is an unofficial Model Context Protocol (MCP) Server for Linkd..

More information about automcp can be found at [automcp.app](https://automcp.app).

For detailed API documentation and usage examples, visit the [official Linkd documentation](https://docs.linkd.inc/).

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
* `search_for_companies` - Search for companies on Linkd using filters like query and match threshold
* `enrich_linkedin` - Retrieves detailed profile information for a specific LinkedIn URL (1 credit per lookup)
* `retrieve_contacts` - Retrieves email addresses and phone numbers for a LinkedIn profile (1 credit per lookup)
* `scrape_linkedin` - Retrieves detailed profile data and posts with comments from a LinkedIn profile URL (2 credits per request)
* `research_profile` - Research a profile using email or phone number
* `initiate_deep_research` - Start a deep research job for comprehensive LinkedIn data gathering
* `check_deep_research_status` - Check the status of an ongoing deep research job


## License

This project is licensed under the MIT License.
