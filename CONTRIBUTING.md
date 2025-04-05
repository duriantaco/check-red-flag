
# Contributing Guidelines

## How to Contribute

First off, thanks for taking the time to contribute! Even though our project is satirical, we take code quality seriously (unlike our relationship advice).

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/duriantaco/check-red-flag`
3. Create a branch: `git checkout -b your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes following our [commit message guidelines](#commit-messages)
7. Push to your branch: `git push origin your-feature-name`
8. Open a Pull Request

### Development Environment

Make sure you have:
- Node.js 16+
- npm or yarn

Run `npm install` to set up all dependencies.

## Types of Contributions

### 🐛 Bug Fixes
Found something that's not working as expected? Open an issue first to discuss it, then submit a PR with the fix.

### ✨ New Features
Have an idea for a hilarious new feature? Open an issue to discuss it first!

### 📝 Documentation
Improvements to README, comments, or other documentation are always welcome.

### 🚩 New Red Flags
Want to add more red flags to our database? We're always looking for more terrible relationship advice to satirize!

## Commit Messages

Format your commit messages like this:
```
type(scope): Brief description

Longer description if necessary
```

Types include:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting changes
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to build process, tools, etc.

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update any relevant documentation
3. The PR should work in development environment
4. Ensure code passes all tests and linting
5. Get at least one approving review from a maintainer

## Code Style

We follow a few simple rules:
- Use TypeScript for type safety
- Follow ESLint rules in the project
- Use Prettier for formatting
- Use Tailwind classes for styling
- Keep components modular and reusable
- Include comments for complex logic