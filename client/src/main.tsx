import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './routes/homePage/HomePage'
import CreatePage from './routes/createPage/CreatePage'
import AuthPage from './routes/authPage/AuthPage'
import PostPage from './routes/postPage/PostPage'
import ProfilePage from './routes/profilePage/ProfilePage'
import SearchPage from './routes/searchPage/SearchPage'
import MainLayout from './routes/layouts/MainLayout'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
} else {
  console.error('Failed to find the root element')
}
