# RSSCopilot Requirements Specification

## Table of Contents

- [Overview](#overview)
- [Product Vision](#product-vision)
- [User Stories](#user-stories)
- [Functional Requirements](#functional-requirements)
- [Technical Requirements](#technical-requirements)
- [User Interface](#user-interface)
- [Data Architecture](#data-architecture)
- [Performance Requirements](#performance-requirements)
- [Security Requirements](#security-requirements)

## Overview

### Project Description

RSSCopilot is a Zotero plugin that enhances the built-in RSS functionality by providing intelligent relevance analysis of RSS feed items based on the user's existing library. It uses semantic analysis of paper titles to help researchers quickly identify the most relevant new publications.

### Target Users

- Academic researchers
- Graduate students
- Research professionals
- Anyone who uses Zotero's RSS feature for academic literature tracking

## Product Vision

### Mission Statement

To help researchers efficiently discover relevant academic papers from RSS feeds by providing intelligent, personalized relevance analysis based on their existing research interests.

### Core Values

- **Simplicity**: Focus on core functionality without overwhelming users
- **Integration**: Seamless integration with Zotero's existing RSS features
- **Intelligence**: Smart relevance analysis using modern language models
- **Efficiency**: Quick and accurate identification of relevant papers

## User Stories

### Core User Stories

1. As a researcher, I want to quickly identify papers relevant to my research so that I don't miss important publications.
2. As a user, I want to see relevance scores for RSS items so that I can prioritize my reading.
3. As a reader, I want to sort RSS items by relevance so that I can focus on the most important papers first.

### Configuration User Stories

1. As a user, I want to choose my preferred language model so that I can optimize the relevance analysis.
2. As a user, I want to set relevance thresholds so that I can customize what is considered highly relevant.

## Functional Requirements

### Core Features

#### 1. Relevance Analysis

- Calculate relevance scores (0-100%) for RSS items based on title similarity
- Support multiple language models for vector encoding
- Provide visual indicators for different relevance levels
  - 🔥 High relevance (90-100%)
  - 📈 Medium relevance (70-89%)
  - 📋 Low relevance (<70%)

#### 2. User Interface

- Add relevance column to RSS feed view
- Support sorting by relevance score
- Provide quick actions for item management
  - Save to library
  - Mark for later
  - Ignore

#### 3. Configuration

- Language model selection
- Relevance threshold customization
- Vector database management

### Optional Features

- Model comparison tools
- Relevance trend analysis
- Batch processing tools

## Technical Requirements

### System Architecture

#### Database Schema

```sql
-- papers: Store paper information
CREATE TABLE papers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    added_date INTEGER,
    last_updated INTEGER
);

-- paper_vectors: Store vectors for different models
CREATE TABLE paper_vectors (
    paper_id TEXT,
    model_id TEXT,
    vector BLOB NOT NULL,  -- dimension(384)
    created_date INTEGER,
    PRIMARY KEY (paper_id, model_id),
    FOREIGN KEY (paper_id) REFERENCES papers(id),
    FOREIGN KEY (model_id) REFERENCES models(id)
);

-- paper_vectors_index: Vector similarity search index
CREATE VIRTUAL TABLE paper_vectors_index USING vss0(
    vector(384)
);

-- rss_items: Store RSS items
CREATE TABLE rss_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    created_date INTEGER
);

-- rss_relevance: Store relevance scores and vectors
CREATE TABLE rss_relevance (
    item_id TEXT,
    model_id TEXT,
    vector BLOB NOT NULL,  -- dimension(384)
    history_vectors_space_svd_u BLOB NOT NULL,  -- dimension(384)
    recent_vectors_space_svd_u BLOB NOT NULL,  -- dimension(384)
    history_relevance_score REAL,
    recent_relevance_score REAL,
    updated_date INTEGER,
    PRIMARY KEY (item_id, model_id),
    FOREIGN KEY (item_id) REFERENCES rss_items(id),
    FOREIGN KEY (model_id) REFERENCES models(id)
);

-- rss_relevance_index: Vector similarity search index
CREATE VIRTUAL TABLE rss_relevance_index USING vss0(
    vector(384),
    history_vectors_space_svd_u(384),
    recent_vectors_space_svd_u(384)
);

-- models: Store model configurations
CREATE TABLE models (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    api_config TEXT,
    is_active BOOLEAN DEFAULT true,
    created_date INTEGER
);
```

### Core Processes

#### Initialization Process

1. Plugin installation and configuration
2. Language model selection
3. Initial library scan
4. Vector generation
5. LSA space construction

#### RSS Processing

1. Monitor Zotero RSS updates
2. Process new items
3. Calculate relevance scores
4. Update UI

### Multi-Model Support

- Independent vector storage per model
- Smooth model switching
- Parallel model operation
- Historical vector preservation

## User Interface

### RSS Feed View

```
[RSS Feed List]
Title                    Journal         Relevance    Actions
Deep Learning...        Nature          95% 🔥       [Save] [Later]
Neural Networks...      Science         75% 📈       [Save] [Later]
Quantum Computing...    Nature          45% 📋       [Save] [Later]
```

### Configuration Interface

```
[RSSCopilot Settings]
├─ Model Service
│  ├─ Provider: [Dropdown]
│  └─ API Settings: [Input]
│
├─ Relevance Thresholds
│  ├─ High: [90%] 🔥
│  ├─ Medium: [70%] 📈
│  └─ Low: [50%] 📋
│
└─ Data Management
   ├─ Rebuild Index
   └─ Clear Cache
```

## Data Architecture

## Performance Requirements

### Response Time

- UI updates: < 100ms
- Relevance calculation: < 500ms per item
- Batch processing: < 5s for 100 items

### Resource Usage

- Memory: < 200MB additional RAM usage
- Storage: < 1GB for vector database
- CPU: < 10% during normal operation

### Scalability

- Support up to 100,000 papers in library
- Handle up to 1,000 RSS items per feed
- Process up to 10 concurrent RSS updates

## Security Requirements

### Data Protection

- Secure storage of API keys
- Local-only processing of paper data
- Encrypted vector storage

### Privacy

- No data sharing with external services
- Optional telemetry collection
- Clear data retention policies

## Implementation Timeline

### Phase 1 (2 weeks)

- Database implementation
- Language model integration
- Basic vector processing

### Phase 2 (2 weeks)

- RSS monitoring system
- UI component development
- Relevance calculation

### Phase 3 (1 week)

- Performance optimization
- Configuration interface
- Error handling

## Success Metrics

- User adoption rate
- Relevance accuracy
- System performance
- User satisfaction

## Appendix

### Glossary

- **LSA**: Latent Semantic Analysis
- **Vector Encoding**: Process of converting text to numerical vectors
- **Relevance Score**: Numerical measure of content similarity

### References

- Zotero API Documentation
- Language Model Documentation
- SQLite Documentation
