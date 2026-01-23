# CLAUDE.md - AI Assistant Guide for RCODEOUTLOOK

> This document provides guidance for AI assistants working with this codebase. Update this file as the project evolves.

## Project Overview

**Repository**: RCODEOUTLOOK
**Status**: New/Initializing
**Last Updated**: 2026-01-23

This repository is currently being initialized. As the project develops, this section should be updated with:
- Project purpose and goals
- Target users/audience
- Key features and functionality

## Codebase Structure

```
RCODEOUTLOOK/
├── CLAUDE.md           # This file - AI assistant guidance
└── .git/               # Git repository data
```

### Planned Structure (Update as project develops)

As files and directories are added, document them here:

```
RCODEOUTLOOK/
├── src/                # Source code (to be created)
├── tests/              # Test files (to be created)
├── docs/               # Documentation (to be created)
├── config/             # Configuration files (to be created)
├── package.json        # Project manifest (to be created)
├── README.md           # Project readme (to be created)
└── CLAUDE.md           # AI assistant guidance
```

## Development Workflow

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd RCODEOUTLOOK

# Install dependencies (when package.json exists)
npm install  # or yarn install, pnpm install

# Start development server (update with actual command)
npm run dev
```

### Branch Naming Convention

- `main` or `master` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `claude/*` - AI assistant working branches

### Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(auth): add user login functionality
fix(api): resolve timeout issue in data fetching
docs(readme): update installation instructions
```

## Code Conventions

### General Guidelines

1. **Keep it simple** - Prefer straightforward solutions over clever ones
2. **Follow existing patterns** - Match the style of surrounding code
3. **Document public APIs** - Add JSDoc/TSDoc for exported functions
4. **Write tests** - Include tests for new functionality
5. **Avoid over-engineering** - Only build what's needed now

### File Naming

- Use kebab-case for file names: `my-component.ts`
- Use PascalCase for React components: `MyComponent.tsx`
- Use lowercase for configuration files: `config.json`

### Code Style

(Update this section with specific linting rules and style guides once established)

- Use consistent indentation (2 or 4 spaces)
- Add trailing commas in multi-line structures
- Use meaningful variable and function names
- Keep functions focused and small

## Testing

### Running Tests

```bash
# Run all tests (update with actual commands)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test File Naming

- Place tests adjacent to source files: `component.test.ts`
- Or in a `__tests__` directory: `__tests__/component.test.ts`

### Testing Guidelines

1. Test behavior, not implementation
2. Use descriptive test names
3. Follow the Arrange-Act-Assert pattern
4. Mock external dependencies

## Building and Deployment

### Build Commands

```bash
# Development build (update with actual commands)
npm run build:dev

# Production build
npm run build

# Type checking (for TypeScript projects)
npm run typecheck
```

### Environment Variables

Document required environment variables here:

```bash
# Example (update as needed)
NODE_ENV=development
API_URL=http://localhost:3000
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant guidance (this file) |
| `package.json` | Project dependencies and scripts (TBD) |
| `README.md` | Project documentation (TBD) |
| `tsconfig.json` | TypeScript configuration (TBD) |
| `.eslintrc.*` | ESLint configuration (TBD) |
| `.prettierrc` | Prettier configuration (TBD) |

## Common Tasks for AI Assistants

### When Asked to Add a Feature

1. Read and understand related existing code first
2. Follow established patterns in the codebase
3. Write tests for new functionality
4. Update documentation if needed
5. Make focused, minimal changes

### When Asked to Fix a Bug

1. Reproduce and understand the bug
2. Identify the root cause
3. Implement the minimal fix
4. Add tests to prevent regression
5. Don't refactor unrelated code

### When Asked to Refactor

1. Ensure tests exist before refactoring
2. Make incremental changes
3. Verify tests pass after each change
4. Keep commits focused and atomic

## Important Notes for AI Assistants

### Do's

- ✅ Read files before modifying them
- ✅ Follow existing code patterns and conventions
- ✅ Make minimal, focused changes
- ✅ Write clear commit messages
- ✅ Ask for clarification when requirements are unclear

### Don'ts

- ❌ Make changes without reading existing code
- ❌ Add unnecessary features or "improvements"
- ❌ Introduce new patterns without justification
- ❌ Skip tests for new functionality
- ❌ Commit sensitive data (API keys, passwords, etc.)

## Troubleshooting

### Common Issues

(Document common issues and solutions as they arise)

| Issue | Solution |
|-------|----------|
| TBD | TBD |

## Resources

- Project Documentation: (Add links when available)
- API Documentation: (Add links when available)
- Design System: (Add links when available)
- Issue Tracker: (Add links when available)

---

## Changelog

### 2026-01-23
- Initial CLAUDE.md created for new repository
- Added template structure and guidelines

---

*This file should be updated as the project evolves. Keep it current with the actual codebase structure, conventions, and workflows.*
