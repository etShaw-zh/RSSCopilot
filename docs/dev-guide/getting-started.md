# Getting Started with Development

## Development Environment Setup

### Prerequisites

- Node.js (v18 or later)
- Python 3.12
- Zotero 7.0 or later

### Setting up the Development Environment

1. Clone the repository:

   ```bash
   git clone https://github.com/etShaw-zh/RSSCopilot.git
   cd RSSCopilot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

## Project Structure

```
RSSCopilot/
├── src/              # Source code
├── addon/            # Plugin resources
├── typings/         # TypeScript type definitions
├── docs/            # Documentation
```

## Development Workflow

### Building the Plugin

```bash
npm run build
```

### Development Mode

```bash
npm run start
```

### Linting

```bash
npm run lint:check
npm run lint:fix
```

## Debugging

### Debug Tools

- Zotero Debug Output
- Browser Console
- VS Code Debugger

### Common Issues

- Build errors
- Runtime issues
- Testing problems

## Contributing

### Code Style

- ESLint configuration
- Prettier settings
- TypeScript guidelines

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit PR
