# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
project = 'RSSCopilot'
copyright = '2025, etShaw-zh'
author = 'etShaw-zh'
release = '0.0.1'

# -- General configuration ---------------------------------------------------
extensions = [
    'myst_parser',           # for Markdown support
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx_rtd_theme',      # Read the Docs theme
    'sphinxcontrib.mermaid'  # for Mermaid diagrams
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The suffix(es) of source filenames.
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']

# -- Options for MyST -------------------------------------------------
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "dollarmath",
    "fieldlist",
    "html_admonition",
    "html_image",
    "replacements",
    "smartquotes",
    "substitution",
    "tasklist",
]

# -- Options for Mermaid -------------------------------------------------
mermaid_version = "10.6.1"  # 指定具体版本
mermaid_output_format = 'raw'
mermaid_params = ['--theme', 'default']

# Additional configuration
myst_heading_anchors = 3  # Add anchors to headings up to level 3
html_theme_options = {
    'navigation_depth': 4,
    'collapse_navigation': False,
    'sticky_navigation': True,
    'includehidden': True,
    'titles_only': False
}

# Support for Mermaid diagrams

# Add custom CSS
html_css_files = [
    'custom.css',
]
