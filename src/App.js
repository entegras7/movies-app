import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { usePromiseTracker } from 'react-promise-tracker'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FavouriteMoviesProvider } from './context/favouriteMovieContext'

const HomePage = lazy(() => import('./pages/home'))
const FavouriteMoviesPage = lazy(() => import('./pages/favouriteMovies'))

function App() {

  const { promiseInProgress } = usePromiseTracker();

  const Spinner = () => {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <FavouriteMoviesProvider>
      <div className="app-container">
        {
          promiseInProgress && (
            <div className="loading-spinner">
              <Spinner />
            </div>
          )
        }
        <BrowserRouter basename='/moviebrowser'>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favourites" element={<FavouriteMoviesPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </FavouriteMoviesProvider>
  );
}

export default App;
