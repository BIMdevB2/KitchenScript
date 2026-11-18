# KitchenScript — Architecture

## Overview

KitchenScript is a React frontend application for discovering, searching, creating, and preparing recipes.

The application is organized by **layer**: pages, components, hooks, and API modules are grouped in their own top-level folders.
Within each layer, domain subfolders keep related code easy to find. Truly cross-cutting elements are placed in `shared/`.

The backend and database are not available yet. 
API modules are the boundary between the frontend and its data sources. They can use mock data while the backend is unavailable and be connected to the REST API when it is ready.
This document describes the frontend structure and the integration boundary for that future backend; the REST API, services, and database are not part of the current application.

## High-level architecture

```text
User
 │
 ▼
React Page
 │
 ▼
Domain hook
 │
 ▼
Domain API module
 │
 ├── src/mocks/        # Today
 └── REST API backend  # Later
```

A page must not call mocks or the backend directly. It calls a hook, which calls the corresponding domain API module.

## Project structure

```text
kitchenscript/
├── public/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── providers.jsx
│   │
│   ├── context/
│   │
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   ├── AppLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── discovery/
│   │   ├── recipes/
│   │   ├── search/
│   │   ├── cooking/
│   │   ├── favorites/
│   │   ├── categories/
│   │   ├── profile/
│   │   └── admin/
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── discovery/
│   │   ├── recipes/
│   │   ├── search/
│   │   ├── cooking/
│   │   ├── favorites/
│   │   ├── categories/
│   │   ├── profile/
│   │   └── admin/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── discovery/
│   │   ├── recipes/
│   │   ├── search/
│   │   ├── cooking/
│   │   ├── favorites/
│   │   ├── categories/
│   │   ├── profile/
│   │   ├── admin/
│   │   └── error/
│   │
│   ├── hooks/
│   │   ├── auth/
│   │   ├── discovery/
│   │   ├── recipes/
│   │   ├── search/
│   │   ├── cooking/
│   │   ├── favorites/
│   │   ├── categories/
│   │   ├── profile/
│   │   └── admin/
│   │
│   ├── shared/
│   │   ├── ui/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── styles/
│   │
│   ├── mocks/
│   │   ├── users.js
│   │   ├── recipes.js
│   │   ├── ingredients.js
│   │   ├── categories.js
│   │   └── favorites.js
│   │
│   ├── assets/
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── tests/
│   ├── setup.js
│   ├── e2e/             # Reserved for end-to-end tests
│   └── unit/
│       └── app/
│           └── App.test.jsx
│
├── .github/
│   └── workflows/
│       └── ci.yml
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Tests

Unit and component tests use Vitest, jsdom, and React Testing Library. Place them in `tests/unit/`,
organized by domain or application area. The shared `tests/setup.js` file loads the Testing Library matchers
and is configured in `vite.config.js`.

The `tests/e2e/` directory is reserved for end-to-end tests; an end-to-end test runner is not configured yet.

The GitHub Actions workflow at `.github/workflows/ci.yml` runs the lint, test, and production build checks for pushes
to `main` and pull requests targeting `main`.

## Application layer

The `src/app/` folder contains the global application assembly.

| Element | Responsibility |
|---|---|
| `main.jsx` | Vite entry point and React mounting |
| `App.jsx` | Composes providers and the router |
| `router.jsx` | Declares application routes |
| `providers.jsx` | Global providers: theme, session, queries, etc. |
| `src/layouts/` | Public, authenticated, and admin layouts |

### Routes

| Route | Page | Access |
|---|---|---|
| `/` | `HomePage` | Public |
| `/register` | `RegisterPage` | Public |
| `/login` | `LoginPage` | Public |
| `/recipes` | `RecipeListPage` | Public |
| `/recipes/:recipeId` | `RecipeDetailPage` | Public |
| `/recipes/new` | `RecipeCreatePage` | Authenticated |
| `/recipes/:recipeId/edit` | `RecipeEditPage` | Author or admin |
| `/my-recipes` | `MyRecipesPage` | Authenticated |
| `/search` | `SearchPage` | Public |
| `/recipes/:recipeId/cook` | `CookingPage` | Public |
| `/favorites` | `FavoritesPage` | Authenticated |
| `/categories` | `CategoriesPage` | Public |
| `/profile` | `ProfilePage` | Authenticated |
| `/admin` | `AdminDashboardPage` | Admin |
| `/admin/users` | `AdminUsersPage` | Admin |
| `/admin/recipes` | `AdminRecipesPage` | Admin |
| `/admin/categories` | `AdminCategoriesPage` | Admin |

Routes are declared in `app/router.jsx`. Protected routes use `AuthGuard` or `AdminRoute` to verify the user’s session and role.

## Domain areas

Domain areas are represented consistently across `components/`, `pages/`, `hooks/`, and `api/`. A domain folder contains only files for that layer.

| Domain | Responsibility |
|---|---|
| `auth` | Registration, login, logout, session, and route guards |
| `discovery` | Home page, featured recipes, and suggestions |
| `recipes` | Recipe list, detail, creation, editing, and management |
| `search` | Search by title, ingredients, categories, and filters |
| `cooking` | Cooking mode, steps, timers, and portion adjustment |
| `favorites` | Adding, removing, and viewing favorites |
| `categories` | Browsing categories and administrative management |
| `profile` | User profile and dietary preferences |
| `admin` | Dashboard, moderation, users, and categories |

### Domain folders

Create a domain subfolder only in the layers it needs:

```text
src/
├── pages/<domain>/      # Screens associated with routes
├── components/<domain>/ # Domain-specific UI components
├── hooks/<domain>/      # State, loading, and action logic
└── api/<domain>/        # Data access for the domain
```

## Shared layer

The `src/shared/` folder contains only truly reusable code.

| Folder | Content |
|---|---|
| `ui/` | `Button`, `Input`, `Select`, `Modal`, `Badge`, `Skeleton`, `EmptyState` |
| `api/` | HTTP client and base configuration |
| `hooks/` | Generic hooks: debounce, localStorage, media queries |
| `styles/` | Design tokens and global styles |

`shared/` must not depend on domain-specific code or the application layer.

## Mock data

While the backend is unavailable, data comes from `src/mocks/`.

| File | Mocked data |
|---|---|
| `users.js` | Accounts, roles, statuses, and profiles |
| `recipes.js` | Recipes, statuses, times, servings, and images |
| `ingredients.js` | Ingredients, quantities, units, and positions |
| `categories.js` | Categories and slugs |
| `favorites.js` | Favorites linked to a user and a recipe |

Only `api/` files are allowed to import mocks.

When the backend becomes available, each domain API module that uses mocks will be connected to the REST API through the shared HTTP client. Hooks and pages should remain independent of the data source as long as the mock and REST implementations honor the same data contracts. Authentication and shared error handling may also need to be connected to the backend.

### Data contracts

API modules return plain JavaScript objects that follow the domain model.

| Entity | Fields |
|---|---|
| `User` | `id`, `username`, `email`, `role`, `status`, `createdAt` |
| `Recipe` | `id`, `authorId`, `title`, `description`, `prepTimeMinutes`, `cookTimeMinutes`, `servings`, `imageUrl`, `status`, `createdAt`, `updatedAt` |
| `Ingredient` | `id`, `name` |
| `IngredientLine` | `id`, `recipeId`, `ingredientId`, `quantity`, `unit`, `position` |
| `Step` | `id`, `recipeId`, `position`, `instruction` |
| `Category` | `id`, `name`, `slug` |
| `Favorite` | `id`, `userId`, `recipeId`, `addedAt` |

### Error handling

The shared HTTP client normalizes API errors before they reach hooks and pages.

| HTTP status | Frontend behavior |
|---|---|
| `400 Bad Request` | Display a validation or request error |
| `401 Unauthorized` | Redirect the user to `/login` |
| `403 Forbidden` | Display an access-denied message |
| `404 Not Found` | Display a “not found” state |
| `422 Unprocessable Content` | Display field-level validation errors |
| `500 Internal Server Error` | Display a generic error message and allow a retry |

### Rules

- Pages display loading, error, empty, and success states.
- Hooks expose `isLoading`, `error`, and action-specific states.
- The HTTP client transforms HTTP errors into a normalized error object.
- Field errors returned by the API are displayed next to the relevant form fields.
- Do not expose technical error details to end users.

## Data flow

### View a recipe

```text
RecipeDetailPage
  → useRecipe(recipeId)
    → api/recipes/
      → mocks/recipes.js
```

The page displays a loading state while the recipe is being fetched, then displays a published recipe or an unavailable error if it does not exist or is not public.

### Create a recipe

```text
RecipeCreatePage
  → RecipeForm
    → useRecipeForm
      → api/recipes/
        → mocks/recipes.js
```

The form first performs client-side validation for immediate feedback. Then, the hook calls the API to create the recipe. 
The API returns the created recipe and its status. When the backend is available, the frontend must handle the following errors.

### Error handling

- `401 Unauthorized`: redirect the user to `/login`.
- `403 Forbidden`: display an access-denied message.
- `422 Unprocessable Content`: display field-level validation errors.
- `404 Not Found`: display a “not found” state.
- `500 Internal Server Error`: display a generic error message and allow retry.

## Domain rules

The following rules must be respected in forms and frontend validation.

- A user’s email address and username are unique. Passwords are stored as hashes on the backend; the frontend must not be responsible for password hashing or enforcing uniqueness.
- A recipe belongs to its author and contains one or more ingredient lines and steps.
- An ingredient line belongs to a recipe and references an ingredient.
- Ingredient quantities must be positive.
- An ingredient line’s position is unique within a recipe.
- Recipe steps are ordered starting from 1.
- A category slug is unique.
- The user-recipe pair is unique in favorites; the favorite records its date of addition.
- A recipe submitted by a member starts in `PENDING_MODERATION`. An administrator may publish or refuse it; a published recipe may be hidden. The recipe statuses are `PENDING_MODERATION`, `PUBLISHED` and `REJECTED`.
- A user can be active or suspended.

## Dependency rules

| Layer | Can import | Must not import |
|---|---|---|
| `shared/` | Its own files and npm dependencies | Domain folders, `app/` |
| `api/<domain>/` | Its domain data and `shared/api/` | Pages, components, hooks |
| `hooks/<domain>/` | Its domain API and `shared/` | Pages and components |
| `components/<domain>/` | Its domain components and `shared/ui/` | API modules |
| `pages/<domain>/` | Its domain components/hooks and `shared/` | API modules and mocks |
| `app/` | Pages, layouts, `context/`, and `shared/` | Domain components, hooks, and API modules directly |

### Rules

- A page assembles components; it does not contain all business logic.
- A component must not call an `api/` file directly.
- A hook calls an `api/` file.
- An `api/` file calls mocks or, later, the HTTP client.
- Keep imports within a domain where practical; move genuinely reusable behavior to `shared/`.
- Generic components belong in `shared/ui/`.
- Domain components remain in `components/<domain>/`.
