# CI/CD Pipeline Setup

## Overview
This project includes a comprehensive CI/CD pipeline with automated quality checks, security scanning, and deployment workflows.

## Pipeline Stages

### 1. **Code Quality & Security Checks** 🔍
- **TypeScript Type Check**: Ensures type safety
- **ESLint**: Identifies and fixes code issues
- **Prettier**: Enforces consistent code formatting
- **npm audit**: Security vulnerability scanning
- **Snyk**: Advanced dependency vulnerability detection

### 2. **Build** 🏗️
- Installs dependencies
- Builds Next.js production bundle
- Uploads build artifacts for deployment

### 3. **Testing** 🧪
- Runs project tests (configure in package.json)
- Reports test coverage

### 4. **Security Scanning** 🔐
- **Trivy**: Filesystem vulnerability scanning
- Uploads results to GitHub Security

### 5. **Performance Audit** ⚡
- **Lighthouse CI**: Web performance auditing
- Tracks performance metrics

### 6. **Deployment** 🚀
- Runs on main branch pushes only
- Requires all checks to pass
- Prepares production artifacts

## Triggers

| Branch | Event | Action |
|--------|-------|--------|
| main | push | Full pipeline + Deploy |
| develop | push | Quality & Build checks |
| feature/* | push | Quality & Build checks |
| main | PR | Quality & Build checks |
| develop | PR | Quality & Build checks |

## Local Development Setup

### Install Dependencies
```bash
npm install
npm install --save-dev husky prettier eslint eslint-config-prettier
```

### Setup Pre-commit Hooks
```bash
npx husky install
chmod +x .husky/pre-commit
```

### Run Quality Checks Locally
```bash
# TypeScript check
npx tsc --noEmit

# ESLint
npm run lint

# Prettier format check
npx prettier --check "src/**/*.{ts,tsx,json,css}"

# Format code
npx prettier --write "src/**/*.{ts,tsx,json,css}"

# Security audit
npm audit
```

### Build & Test
```bash
# Build
npm run build

# Start production build
npm start
```

## Configuration Files

### `.eslintrc.json`
ESLint configuration with Next.js and Prettier integration

### `.prettierrc`
Code formatting standards

### `.github/workflows/ci-cd.yml`
Main GitHub Actions workflow

### `.husky/pre-commit`
Git pre-commit hook for automatic checks

## Environment Variables

For Snyk security scanning, add to GitHub Secrets:
- `SNYK_TOKEN`: Your Snyk API token

## Required GitHub Settings

1. **Branch Protection Rules** (Settings > Branches > Main):
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Dismiss stale pull request approvals when new commits are pushed

2. **Actions Permissions** (Settings > Actions):
   - ✅ Allow all actions and reusable workflows

## Status Badges

Add these to your README:

```markdown
[![CI/CD Pipeline](https://github.com/delix4/delix4_companyWeb/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/delix4/delix4_companyWeb/actions/workflows/ci-cd.yml)
```

## Troubleshooting

### ESLint Errors
```bash
npm run lint -- --fix
```

### Prettier Formatting Issues
```bash
npx prettier --write .
```

### TypeScript Errors
```bash
npx tsc --noEmit
```

### Clear Build Cache
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Security Best Practices

1. **Never commit secrets**: Use GitHub Secrets for sensitive data
2. **Keep dependencies updated**: Regularly run `npm audit`
3. **Review security scan results**: Check GitHub Security tab
4. **Use branch protection**: Require PR reviews before merging

## Performance Benchmarks

Track Lighthouse scores:
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- Performance: 80+ (depends on deployment region)

## Next Steps

1. Enable GitHub branch protection for `main`
2. Add `SNYK_TOKEN` to GitHub Secrets
3. Configure deployment target (Vercel, AWS, Azure, etc.)
4. Set up monitoring and alerts
5. Document deployment process

---

**Last Updated**: February 1, 2026
**Status**: ✅ Active & Operational
