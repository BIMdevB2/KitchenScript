import { Route, Routes } from 'react-router'

import HomePage from '../pages/discovery/HomePage.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'
import RecipesPage from '../pages/recipes/RecipesPage.jsx'
import CookingPage from '../pages/cooking/CookingPage.jsx'
import CategoriesPage from '../pages/categories/CategoriesPage.jsx'
import SearchPage from '../pages/search/SearchPage.jsx'
import FavoritesPage from '../pages/favorites/FavoritesPage.jsx'
import ProfilePage from '../pages/profile/ProfilePage.jsx'
import AdminPage from '../pages/admin/AdminPage.jsx'
import PageNotFound from '../pages/error/PageNotFound.jsx'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/recipes/:recipeId/cook" element={<CookingPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}