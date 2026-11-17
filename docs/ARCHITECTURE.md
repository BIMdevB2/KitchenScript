# KitchenScript — Architecture

## Overview

KitchenScript is a React frontend application for discovering, searching, creating, and preparing recipes.

The application is organized by **features**: each business domain contains the pages, components, hooks, and API calls specific to it. 
Truly cross-cutting elements are placed in `shared/`.

The backend and database are not available yet. 
Files in `api/` currently consume data from `src/mocks/` and will call the REST API once it is ready.
This document describes the frontend architecture in use now and the integration boundary for that future backend; the REST API, services, and database are not part of the current application.

## High-level architecture

```text
User
 │
 ▼
React Page
 │
 ▼
Feature hook
 │
 ▼
api/ file
 │
 ├── src/mocks/        # Today
 └── REST API backend  # Later
```

A page must not call mocks or the backend directly. It calls a hook, which calls a function from its feature’s `api/` file.

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
│   │   ├── providers.jsx
│   │   └── layouts/
│   │       ├── AuthLayout.jsx
│   │       ├── AppLayout.jsx
│   │       ├── AdminLayout.jsx
│   │       └── AppLayout.module.css
│   │
│   ├── features/
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
│   │   ├── layout/
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
│   ├── e2e/
│   └── unit/
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Application layer

The `src/app/` folder contains the global application assembly.

| Element | Responsibility |
|---|---|
| `main.jsx` | Vite entry point and React mounting |
| `App.jsx` | Composes providers and the router |
| `router.jsx` | Declares application routes |
| `providers.jsx` | Global providers: theme, session, queries, etc. |
| `layouts/` | Public, authenticated, and admin layouts |

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

## Features

Each feature is a self-contained module focused on a business domain.

| Feature | Responsibility |
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

### Standard feature layout

A feature may contain the following folders, only when needed:

```text
features/<feature>/
├── pages/              # Screens associated with a route
├── components/         # Domain-specific components
├── hooks/              # State, loading, and action logic
├── api/                # Calls to mocks today and the REST API later
└── index.js            # Public interface of the feature
```

## Shared layer

The `src/shared/` folder contains only truly reusable code.

| Folder | Content |
|---|---|
| `ui/` | `Button`, `Input`, `Select`, `Modal`, `Badge`, `Skeleton`, `EmptyState` |
| `layout/` | `Header`, `Footer`|
| `api/` | HTTP client and base configuration |
| `hooks/` | Generic hooks: debounce, localStorage, media queries |
| `styles/` | Design tokens and global styles |

`shared/` must never import a file from `features/`.

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

When the backend becomes available, each feature API module that uses mocks will be connected to the REST API through the shared HTTP client. Hooks and pages should remain independent of the data source as long as the mock and REST implementations honor the same data contracts. Authentication and shared error handling may also need to be connected to the backend.

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
    → recipes.api.js
      → mocks/recipes.js
```

The page displays a loading state while the recipe is being fetched, then displays a published recipe or an unavailable error if it does not exist or is not public.

### Create a recipe

```text
RecipeCreatePage
  → RecipeForm
    → useRecipeForm
      → recipes.api.js
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
| `shared/` | Its own files and npm dependencies | `features/`, `app/` |
| `features/<domain>/` | `shared/`, its own code | Internal files from another feature |
| `app/` | `features/`, `shared/` | Internal files from a feature |

### Rules

- A page assembles components; it does not contain all business logic.
- A component must not call an `api/` file directly.
- A hook calls an `api/` file.
- An `api/` file calls mocks or, later, the HTTP client.
- Imports between features go through their `index.js`.
- Generic components belong in `shared/ui/`.
- Domain components remain in their feature.
