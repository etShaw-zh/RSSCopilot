# Contributing to RSSCopilot

Thank you for your interest in contributing to RSSCopilot! This document provides guidelines and instructions for contributing.

## Code of Conduct

Our Code of Conduct is based on the Contributor Covenant. We expect all contributors to uphold these guidelines to ensure a welcoming and inclusive community.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Set up development environment (see [Getting Started](getting-started.md))

## Development Process

### 1. Choose an Issue

- Look for issues labeled "good first issue" or "help wanted"
- Comment on the issue to express your interest
- Wait for assignment or confirmation

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Development Guidelines

#### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier
- Keep functions small and focused
- Write meaningful comments

#### Testing

- Write unit tests for new features
- Ensure all tests pass
- Add integration tests when needed

#### Documentation

- Update relevant documentation
- Add JSDoc comments
- Update API reference if needed

### 4. Commit Guidelines

#### Commit Message Format

```
type(scope): subject

body

footer
```

#### Types

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

### 5. Pull Request Process

1. Update your branch with main

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Push your changes

   ```bash
   git push origin feature/your-feature-name
   ```

3. Create Pull Request

   - Use the PR template
   - Link related issues
   - Add description of changes

4. Code Review
   - Address review comments
   - Update PR as needed
   - Get approval

## Release Process

### Version Numbers

We use Semantic Versioning:

- MAJOR.MINOR.PATCH

### Release Steps

1. Version bump
2. Update changelog
3. Create release notes
4. Tag release
5. Publish

## Additional Resources

- [Development Guide](getting-started.md)
- [API Reference](api-reference.md)
- [Architecture Guide](architecture.md)

## Getting Help

- Create an issue
- Join discussions
- Contact maintainers
