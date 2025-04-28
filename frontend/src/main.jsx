import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GenresListView from './pages/admin/genres/GenresListView.jsx'
import { BrowserRouter } from 'react-router'
import { Route, Routes } from 'react-router'
import GenreFormView from './pages/admin/genres/GenreForm.jsx'
import ArtistsListView from './pages/admin/artists/ArtistsListView.jsx'
import ArtistForm from './pages/admin/artists/ArtistForm.jsx'
import AlbumsListView from './pages/admin/albums/AlbumsListView.jsx'
import AlbumsForm from './pages/admin/albums/AlbumForm.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<GenresListView />} />
        <Route path="/admin/genres/form" element={<GenreFormView />} />
        <Route path="/admin/genres/form/:id" element={<GenreFormView />} />
        <Route path="/admin/artists" element={<ArtistsListView />} />
        <Route path="/admin/artists/form" element={<ArtistForm />} />
        <Route path="/admin/artists/form/:id" element={<ArtistForm />} />
        <Route path="/admin/albums" element={<AlbumsListView />} />
        <Route path="/admin/albums/form" element={<AlbumsForm />} />
        <Route path="/admin/albums/form/:id" element={<AlbumsForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
