# API Reference

## Core APIs

### Plugin Manager

```typescript
interface PluginManager {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getService<T>(serviceId: string): T;
}
```

### Vector Service

```typescript
interface VectorService {
  generateVector(text: string): Promise<Float32Array>;
  calculateRelevance(vector1: Float32Array, vector2: Float32Array): number;
  updateLSASpace(vectors: Float32Array[]): void;
}
```

### Database Service

```typescript
interface DatabaseService {
  // Paper Management
  addPaper(paper: Paper): Promise<void>;
  getPaper(id: string): Promise<Paper>;
  updatePaper(paper: Paper): Promise<void>;
  deletePaper(id: string): Promise<void>;

  // Vector Management
  addVector(vector: PaperVector): Promise<void>;
  getVectors(paperId: string): Promise<PaperVector[]>;
  rebuildVectorIndex(): Promise<void>;

  // RSS Management
  addRSSItem(item: RSSItem): Promise<void>;
  updateRelevance(relevance: RSSRelevance): Promise<void>;
  rebuildRelevanceIndex(): Promise<void>;
}
```

### UI Manager

```typescript
interface UIManager {
  renderRelevanceColumn(): void;
  updateRelevanceScores(scores: Map<string, number>): void;
  showSettings(): void;
}
```

## Data Types

### Paper

```typescript
interface Paper {
  id: string;
  title: string;
  addedDate: number;
  lastUpdated: number;
}
```

### PaperVector

```typescript
interface PaperVector {
  paperId: string;
  modelId: string;
  vector: Float32Array;
  createdDate: number;
}
```

### RSSItem

```typescript
interface RSSItem {
  id: string;
  title: string;
  createdDate: number;
}
```

### Model

```typescript
interface Model {
  id: string;
  name: string;
  apiConfig: string;
  isActive: boolean;
  createdDate: number;
}
```

### RSSRelevance

```typescript
interface RSSRelevance {
  itemId: string;
  modelId: string;
  vector: Float32Array; // dimension(384)
  historyVectorsSpaceSvdU: Float32Array; // dimension(384)
  recentVectorsSpaceSvdU: Float32Array; // dimension(384)
  historyRelevanceScore: number;
  recentRelevanceScore: number;
  updatedDate: number;
}
```

## Events

### System Events

```typescript
enum SystemEvent {
  INITIALIZED = "system:initialized",
  SHUTDOWN = "system:shutdown",
  ERROR = "system:error",
}
```

### RSS Events

```typescript
enum RSSEvent {
  ITEM_ADDED = "rss:item_added",
  RELEVANCE_UPDATED = "rss:relevance_updated",
  FEED_UPDATED = "rss:feed_updated",
}
```

## Error Handling

### Error Types

```typescript
enum ErrorType {
  DATABASE_ERROR = "database_error",
  VECTOR_ERROR = "vector_error",
  API_ERROR = "api_error",
  UI_ERROR = "ui_error",
}
```

### Error Response

```typescript
interface ErrorResponse {
  type: ErrorType;
  message: string;
  details?: any;
  timestamp: number;
}
```

## Configuration

### Plugin Configuration

```typescript
interface PluginConfig {
  modelSettings: ModelSettings;
  relevanceThresholds: RelevanceThresholds;
  databaseSettings: DatabaseSettings;
}
```

### Model Settings

```typescript
interface ModelSettings {
  activeModelId: string;
  apiKey?: string;
  batchSize: number;
  timeout: number;
}
```
