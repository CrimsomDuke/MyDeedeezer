import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GenresListView from './pages/admin/genres/GenresListView.jsx'
import { BrowserRouter } from 'react-router'
import { Route, Routes } from 'react-router'
import GenreFormView from './pages/admin/genres/GenreForm.jsx'
import ArtistsListView from './pages/admin/artists/ArtistsListView.jsx'
import ArtistForm from './pages/admin/artists/ArtistForm.jsx'
import AlbumsListView from './pages/admin/albums/AlbumsListView.jsx'
import AlbumsForm from './pages/admin/albums/AlbumForm.jsx';
import SongsListView from './pages/admin/songs/SongsListView.jsx';
import SongsForm from './pages/admin/songs/SongsForm.jsx';
import MainPage from './pages/main/MainPage.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainPage />} />
        
        <Route path="/admin" element={<GenresListView />} />
        <Route path="/admin/genres/form" element={<GenreFormView />} />
        <Route path="/admin/genres/form/:id" element={<GenreFormView />} />
        <Route path="/admin/artists" element={<ArtistsListView />} />
        <Route path="/admin/artists/form" element={<ArtistForm />} />
        <Route path="/admin/artists/form/:id" element={<ArtistForm />} />
        <Route path="/admin/albums" element={<AlbumsListView />} />
        <Route path="/admin/albums/form" element={<AlbumsForm />} />
        <Route path="/admin/albums/form/:id" element={<AlbumsForm />} />
        <Route path="/admin/songs" element={<SongsListView />} />
        <Route path="/admin/songs/form" element={<SongsForm />} />
        <Route path="/admin/songs/form/:id" element={<SongsForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
