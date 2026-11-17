# Contributing to KitchenScript

Thank you for your interest in contributing to KitchenScript.

This document explains how to set up the project, propose changes, and submit pull requests. 
For the project overview and setup instructions, see [`README.md`](README.md). 
For the folder organization and frontend conventions, see [`ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Getting started

1. Fork the repository.
2. Clone your fork, replacing `<your-github-username>` with your GitHub username:

```bash
git clone https://github.com/<your-github-username>/KitchenScript.git
cd KitchenScript
```

3. Create a branch for your change:

```bash
git checkout -b feat/feature-name
```

4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

## Branch naming

Use short-lived branches with a clear prefix:

| Prefix | Use |
|---|---|
| `feat/` | New feature or user-facing improvement |
| `fix/` | Bug fix |
| `docs/` | Documentation update |
| `refactor/` | Code improvement without changing behavior |
| `test/` | Test addition or improvement |
| `chore/` | Tooling, dependencies, or repository maintenance |

Examples:

```text
feat/recipe-detail-page
fix/favorite-button-state
docs/update-architecture
refactor/recipe-form-validation
```

## Commit messages

Use concise, imperative commit messages. Conventional Commits are recommended:

```text
feat: add recipe detail page
fix: prevent duplicate favorite submission
docs: update frontend architecture
refactor: extract recipe validation helpers
test: add RecipeCard component tests
chore: configure ESLint
```

## Code guidelines

- Use JavaScript and JSX, following the existing project style.
- Keep components focused on presentation and user interaction.
- Put business logic and data access in hooks and `api/` files.
- Keep reusable UI components in `src/shared/ui/`.
- Keep domain-specific components inside their feature.
- Do not import internal files from another feature; use its `index.js` public entry point when needed.
- Add loading, error, and empty states for data-driven screens.
- Update documentation when adding a new feature, route, or shared component.

## Tests and checks

Unit and component tests use Vitest and React Testing Library. Add focused tests for new behavior and bug fixes in 
`tests/unit/`, organized by feature or application area. The `tests/e2e/` directory is reserved for end-to-end tests; 
no end-to-end test runner is configured yet.

Run the automated checks locally before opening a pull request:

```bash
npm run lint
npm test
npm run build
```

To run tests in watch mode while developing:

```bash
npm run test:watch
```

## Pull requests

1. Create a branch from `main`.
2. Make small, focused changes.
3. Run the checks described in [Tests and checks](#tests-and-checks).
4. Update the relevant documentation.
5. Push your branch to your fork and open a pull request against `BIMdevB2/KitchenScript`'s `main` branch, 
    using the template below.
6. Request a review from another contributor.
7. Address feedback and update the pull request if needed.

### Pull request template

```md
## Goal

<!-- Example: What problem does this pull request solve? -->

## Affected page or feature

<!-- Example: recipes, search, favorites, auth -->

## Changes

- ...

## Screenshots

<!-- Optional: add screenshots for UI changes -->

## Remaining work

<!-- Optional: list follow-up tasks -->
```

## Reporting bugs

Before opening an issue, check whether it has already been reported.

Include:

- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected behavior.
- Actual behavior.
- Browser, operating system, and Node.js version, when relevant.
- Screenshots or screen recordings, when helpful.

## Suggesting features

Open an issue and describe:

- The user problem or need.
- The proposed solution.
- Alternatives considered.
- Any impact on existing features or shared components.

## License

By contributing to KitchenScript, you agree that your contributions will be licensed under the project’s [Apache 2.0 License](LICENSE).
