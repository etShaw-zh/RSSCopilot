# Frequently Asked Questions

## General Questions

### What is RSSCopilot?

RSSCopilot is a Zotero plugin that enhances the built-in RSS functionality by providing intelligent relevance analysis of RSS feed items based on your existing library.

### How does it work?

RSSCopilot analyzes the titles of papers in your library and new RSS items using semantic analysis to determine relevance scores.

## Installation

### Which Zotero version is required?

RSSCopilot requires Zotero 7.0 or later.

### How do I install RSSCopilot?

See our [Getting Started](getting-started.md) guide for installation instructions.

## Usage

### How are relevance scores calculated?

Relevance scores are calculated by projecting the title vector of a new RSS item onto the SVD-reduced LSA space of your existing library. The proportion of the vector that falls within the existing library's space is used as the relevance score. When you switch to a different language model service, the previously calculated vectors are preserved, and the new service is used to calculate the vectors for new RSS items.  
More details can be found in our another project [GCA Analyzer - Content Newness](https://gca-analyzer.readthedocs.io/en/latest/mathematics.html). [![Downloads](https://static.pepy.tech/personalized-badge/gca-analyzer?period=total&units=international_system&left_color=black&right_color=orange&left_text=Downloads)](https://pepy.tech/project/gca-analyzer)

### Can I use multiple language models?

Yes, RSSCopilot supports multiple language models and allows you to switch between them without losing data.

<!-- ## Troubleshooting

### Common Issues

1. **Plugin not loading**

   - Check Zotero version compatibility
   - Verify installation
   - Check error logs

2. **Low relevance scores**

   - Verify language model configuration
   - Check library size and content
   - Consider rebuilding vector index

3. **Performance issues**
   - Check cache settings
   - Verify database size
   - Consider cleanup options

### Error Messages

Common error messages and their solutions. -->

## Support

### Where can I get help?

1. Check this FAQ
2. Visit our [GitHub Issues](https://github.com/etShaw-zh/RSSCopilot/issues)
3. Contact support
