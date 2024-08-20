import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  favourites: [],
};

const FAVOURITE_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

const favouriteReducer = (state, action) => {
  switch (action.type) {
    case FAVOURITE_ACTIONS.ADD:
      return { ...state, favourites: [...state.favourites, action.payload] };
    case FAVOURITE_ACTIONS.REMOVE:
      return { ...state, favourites: state.favourites.filter(movie => movie._id !== action.payload._id) };
    default:
      return state;
  }
};

const FavouriteMoviesContext = createContext();

export const FavouriteMoviesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouriteReducer, initialState);

  return (
    <FavouriteMoviesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavouriteMoviesContext.Provider>
  );
};

export const useFavouriteMovies = () => useContext(FavouriteMoviesContext);

