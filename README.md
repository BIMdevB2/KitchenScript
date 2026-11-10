# KitchenScript

KitchenScript is a recipe application built with React.

KitchenScript is an interactive recipe book built with React, designed specifically for hungry developers. 
Explore recipes structured like code, manage ingredients like dependencies, and cook bug-free !

Visitors can browse, search, and view recipes. 
Users can create and manage their own recipes, save favorites, and manage their profile. 
Administrators can manage categories, moderate recipes, and manage user accounts.

The frontend is built with React, JavaScript, and JSX. The backend and database will be integrated later; 
the application currently uses mocked data.

## Features

- Browse and view recipes.
- Search recipes by title, ingredients, and categories.
- Create, edit, and manage your own recipes.
- Save and view favorites.
- Follow a recipe in cooking mode.
- Manage your profile and dietary preferences.
- Administer categories, moderate recipes, and manage user accounts.

## Tech stack

- Vite / React: JavaScript / JSX
- Bootstrap CSS

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
