import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GenresListView from './pages/admin/genres/GenresListView.jsx'
import { BrowserRouter } from 'react-router'
import { Route, Routes } from 'react-router'
import GenreCreateView from './pages/admin/GenreCreate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenresListView />} />
        <Route path="/admin/genre/create" element={<GenreCreateView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
