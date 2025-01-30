# Getting Started with RSSCopilot

## Introduction

RSSCopilot is a Zotero plugin that helps you discover relevant papers from your RSS feeds by analyzing the similarity between new papers and your existing library.

## Installation

### Prerequisites

- Zotero 7.0 or later
- Active RSS feeds in Zotero

### Installing RSSCopilot

1. Download the latest release from the [releases page](https://github.com/etShaw-zh/RSSCopilot/releases)
2. In Zotero, go to Tools → Add-ons
3. Click the gear icon and choose "Install Add-on From File..."
4. Select the downloaded .xpi file

## Initial Setup

### First-Time Configuration

1. After installation, you need to Zotero settings to complete the initial setup
2. Choose your preferred language model service
3. Configure relevance thresholds
4. Start and wait for initial library analysis to complete

### Language Model Selection

RSSCopilot supports various language models:

- Option 1: [Model Name] (Documentation is coming soon) # TODO
- Option 2: [Model Name]
- Option 3: [Model Name]

Choose based on your needs for:

- Accuracy
- Processing speed
- API costs (if applicable)

## Basic Usage

### Viewing Relevance Scores

- RSS items now show relevance scores (0-100%)
- Visual indicators:
  - 🔥 High relevance (90-100%)
  - 📈 Medium relevance (70-89%)
  - 📋 Low relevance (<70%)

### Sorting and Filtering

- Click the "Relevance" column to sort
- Use filters to show items above certain relevance thresholds

### Quick Actions

- Save: Add item to your library
- Save and Later: Add item to your library and also add tag to item and mark for future reading

## Tips and Best Practices

- Regularly update your RSS feeds
- Adjust thresholds based on your needs
- Consider rebuilding vectors after major library changes or when changing the language model

## Troubleshooting

- [Common Issue 1]
- [Common Issue 2]
- [Common Issue 3]

## Getting Help

- Visit our [GitHub Issues](https://github.com/etShaw-zh/RSSCopilot/issues)
- Check the [FAQ](./faq.md)
- Contact support via [et_shaw@126.com](mailto:et_shaw@126.com)
