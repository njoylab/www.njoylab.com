# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal landing page for njoylab.com built with Hugo static site generator. The site showcases projects, tools, and articles by Emiliano, a full-stack developer and entrepreneur.

## Key Commands

### Development
```bash
# Start local development server
hugo serve
# Site runs on http://localhost:1313

# Build static site
hugo

# Build with drafts
hugo -D
```

### Deployment
```bash
# Build for Cloudflare
hugo
```

### Theme Management
```bash
# Update theme submodule
git submodule update --remote themes/charlolamode
```

## Architecture

### Content Structure
- **config.yml**: Main site configuration with menu, profile mode settings, and social icons
- **content/**: All site content organized by type:
  - `projects/`: Project showcase pages (e.g., echoValue, Digital Defenders)
  - `tools/`: Developer utility pages (e.g., GeoIP Lookup, JSONLint)
  - `articles/`: Blog posts and articles
  - `privacy-policy/`: Privacy policy pages per project
  - `toc/`: Terms and conditions per project
  - `support/`: Support documentation per project
- **static/images/**: All images and assets
- **themes/charlolamode/**: Hugo theme (git submodule)

### Content Pages
All content uses Hugo frontmatter with these key fields:
- `title`: Page title
- `publishdate`: Publication date
- `description`: Page description
- `type`: Usually "page"
- `topic`: Either "project" or "tool"
- `tags`: Array of tags
- `link`: External URL
- `image`: Path to image in /images/

### Profile Mode
Site uses Hugo's profile mode (enabled in config.yml) which displays a landing page with:
- Profile title, description, and image
- Social icons (GitHub, LinkedIn, Instagram, Twitter)
- Featured buttons for key projects


