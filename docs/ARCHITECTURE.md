# KitchenScript — Architecture

## 1. Overview

KitchenScript is a React frontend application for discovering, searching, creating, and preparing recipes.

The application is organized by **features**: each business domain contains the pages, components, hooks, and API calls specific to it. 
Truly cross-cutting elements are placed in `shared/`.

The backend and database are not available yet. 
Files in `api/` currently consume data from `src/mocks/` and will call the REST API once it is ready.

## 2. High-level architecture

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

## 3. Project structure

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
│   │   ├── utils/
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

## 4. Application layer

The `src/app/` folder contains the global application assembly.

| Element | Responsibility |
|---|---|
| `main.jsx` | Vite entry point and React mounting |
| `App.jsx` | Composes providers and the router |
| `router.jsx` | Declares application routes |
| `providers.jsx` | Global providers: theme, session, queries, etc. |
| `layouts/` | Public, authenticated, and admin layouts |

Routes are declared in `app/router.jsx`. Protected routes use `AuthGuard` or `AdminRoute` to verify the user’s session and role.

## 5. Features

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
├── pages/
├── components/
├── hooks/
├── api/
└── index.js
```

| Folder | Content |
|---|---|
| `pages/` | Screens associated with a route |
| `components/` | Domain-specific components |
| `hooks/` | State, loading, and action logic |
| `api/` | Calls to mocks today and the REST API later |
| `index.js` | Public interface of the feature |

### Recipes feature

`recipes` is KitchenScript’s core feature.

```text
features/recipes/
├── pages/
│   ├── RecipeListPage.jsx
│   ├── RecipeDetailPage.jsx
│   ├── RecipeCreatePage.jsx
│   ├── RecipeEditPage.jsx
│   └── MyRecipesPage.jsx
├── components/
│   ├── RecipeCard.jsx
│   ├── RecipeGrid.jsx
│   ├── RecipeFilters.jsx
│   ├── RecipeForm.jsx
│   ├── IngredientList.jsx
│   ├── IngredientRow.jsx
│   ├── StepList.jsx
│   ├── StepEditor.jsx
│   └── RecipeStatusBadge.jsx
├── hooks/
│   ├── useRecipes.js
│   ├── useRecipe.js
│   ├── useRecipeFilters.js
│   ├── useRecipeForm.js
│   └── useMyRecipes.js
├── api/
│   └── recipes.api.js
└── index.js
```

`RecipeCard` remains in `recipes/`, even when displayed in favorites or on the home page. Another feature can import it through the public entry point:

```js
import { RecipeCard } from "@/features/recipes";
```

## 6. Shared layer

The `src/shared/` folder contains only truly reusable code.

| Folder | Content |
|---|---|
| `ui/` | `Button`, `Input`, `Select`, `Modal`, `Badge`, `Skeleton`, `EmptyState` |
| `layout/` | `Header`, `Footer`, `Sidebar` |
| `api/` | HTTP client and base configuration |
| `hooks/` | Generic hooks: debounce, localStorage, media queries |
| `utils/` | Formatting, conditional classes, and generic validation |
| `styles/` | Design tokens and global styles |

`shared/` must never import a file from `features/`.

## 7. Mock data

While the backend is unavailable, data comes from `src/mocks/`.

| File | Mocked data |
|---|---|
| `users.js` | Accounts, roles, statuses, and profiles |
| `recipes.js` | Recipes, statuses, times, servings, and images |
| `ingredients.js` | Ingredients, quantities, units, and positions |
| `categories.js` | Categories and slugs |
| `favorites.js` | Favorites linked to a user and a recipe |

Only `api/` files are allowed to import mocks.

```js
// src/features/recipes/api/recipes.api.js
import { recipes } from "@/mocks/recipes.js";

export async function getRecipes() {
  return recipes;
}

export async function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id) ?? null;
}
```

When the backend becomes available, only the implementation in `recipes.api.js` will change.

## 8. Data flow

### View a recipe

```text
RecipeDetailPage
  → useRecipe(recipeId)
    → recipes.api.js
      → mocks/recipes.js
```

The page displays a loading state while the recipe is being fetched, then displays the recipe or an error if it cannot be found or is hidden.

### Create a recipe

```text
RecipeCreatePage
  → RecipeForm
    → useRecipeForm
      → recipes.api.js
        → mocks/recipes.js
```

The form first validates fields on the client. Then, the hook calls the API to create the recipe. When the backend is available, it must handle `401`, `403`, `422`, and `500` errors.

## 9. Domain rules

The following rules must be respected in forms and frontend validation.

- A user’s email address and username are unique.
- Passwords are stored as hashes on the backend.
- An ingredient line belongs to a recipe and references an ingredient.
- Ingredient quantities must be positive.
- An ingredient line’s position is unique within a recipe.
- Recipe steps are ordered starting from 1.
- The user-recipe pair is unique in favorites.
- A recipe can be published or hidden.
- A user can be active or suspended.

## 10. Dependency rules

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

## 12. Git workflow

### Branches

```text
main
├── feat/auth-pages
├── feat/home-discovery
├── feat/recipe-list
├── feat/recipe-detail
├── feat/recipe-form
├── feat/search
├── feat/favorites
├── feat/cooking-mode
├── feat/profile
└── feat/admin-dashboard
```

### Pull requests

Each pull request should cover a limited task. Prefer several small pull requests over one large pull request.

```text
Goal*:
Affected page or feature*:

Changes*:
- ...

Screenshot: (optional)
Remaining work: (optional)
```

### Example: recipe creation

Avoid one pull request for the entire recipe creation flow. Prefer:

1. Visual structure of the form.
2. Basic fields: title, description, time, servings, and image.
3. Dynamic ingredient management.
4. Dynamic step management.
5. Client-side validation.
6. Submission through the mocked API.
7. Error handling and redirection to the created recipe.