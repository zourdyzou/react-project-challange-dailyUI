import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import { reducer } from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  numberPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNews = async (url) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await fetch(url);

      if (!response.ok && response.status >= 400 && response.status <= 504) {
        throw new Error(
          "Sorry, we are not be able to provide the data. please check your connection!"
        );
      }

      const data = await response.json();

      dispatch({
        type: SET_STORIES,
        payload: {
          hits: data.hits,
          numberPages: data.nbPages,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchNews(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.page, state.query]);

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        removeStory,
        handleSearch,
        handlePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
