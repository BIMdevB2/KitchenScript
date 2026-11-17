# KitchenScript

KitchenScript is an interactive recipe-book application designed specifically for hungry developers.

Explore recipes structured like code, manage ingredients like dependencies, and cook bug-free !

## Project status

The frontend is currently under development. The backend and database have not been integrated yet, and some features may be incomplete.

## Features

The following features are planned or under development:

- Browse and view recipes.
- Search recipes by title, ingredients, and categories.
- Create, edit, and manage your own recipes.
- Save and view favorites.
- Follow a recipe in cooking mode.
- Manage your profile and dietary preferences.
- Administer categories, moderate recipes, and manage user accounts.

## Getting started

### Prerequisites

- Node.js
- npm

### Run locally

```bash
npm install
npm run dev
```

## Tech stack

- Vite / React: JavaScript / JSX
- CSS / Bootstrap CSS

## Project organization

The project uses a **feature-based** structure. Each business domain contains its own pages, components, hooks, and API calls.

```text
src/
├── app/        # Entry point, routes, providers, and layouts
├── features/   # Business domains: recipes, search, favorites, etc.
├── shared/     # Reusable UI components, hooks, utilities, and API client
├── mocks/      # Mocked data before the backend is available
├── assets/     # Images, icons, and static assets
└── styles/     # Global styles and design tokens
```

For the detailed folder organization, naming conventions, and dependency rules, see the [ARCHITECTURE](docs/ARCHITECTURE.md) file.

## Git workflow

- Create a short-lived branch for each task: `feat/recipe-list`, `fix/login-error`, etc.
- Submit every change through a pull request.
- Have changes reviewed before merging into `main`.
- Announce changes that affect `shared/` or routes.

## Contributing

Contributions are welcome. Please read the [CONTRIBUTING](CONTRIBUTING.md) file before opening an issue or pull request.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).
