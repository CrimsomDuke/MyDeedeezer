import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GenresListView from './pages/admin/genres/GenresListView.jsx'
import { BrowserRouter } from 'react-router'
import { Route, Routes } from 'react-router'
import GenreFormView from './pages/admin/genres/GenreForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenresListView />} />
        <Route path="/admin/genres/form" element={<GenreFormView />} />
        <Route path="/admin/genres/form/:id" element={<GenreFormView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
