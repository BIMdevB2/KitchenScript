import { render, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../../../src/app/App.jsx'

describe('App', () => {
    it('renders the home route', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        )

        expect(getByRole('heading', { name: 'Accueil' })).toBeTruthy()
    })

    it('renders the cooking route for a recipe', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/recipes/42/cook']}>
                <App />
            </MemoryRouter>,
        )

        expect(getByRole('heading', { name: 'Mode cuisine' })).toBeTruthy()
    })

    it('renders the shared header and footer', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        )
        const app = within(container)

        expect(app.getByRole('navigation', { name: 'Header navigation' })).toBeTruthy()
        expect(app.getByRole('link', { name: 'Home' })).toBeTruthy()
        expect(app.getByRole('navigation', { name: 'Footer navigation' })).toBeTruthy()
        expect(app.getByText('Good food. A little curiosity. Your next favorite.')).toBeTruthy()
    })

    it('renders a not-found page for unknown routes', () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/does-not-exist']}>
                <App />
            </MemoryRouter>,
        )

        expect(getByRole('heading', { name: 'Page introuvable' })).toBeTruthy()
    })
})