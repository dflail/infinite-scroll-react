import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import PhotoContext from './photoContext';
import reducer from './photoReducer';
import constants from '../../utils/constants';
import types from './photoTypes';

export const usePhoto = () => {
  const { state, dispatch } = useContext(PhotoContext);
  return [state, dispatch];
};

export const getPhotos = async (dispatch, page) => {
  dispatch({ type: types.GET_PHOTOS });

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${constants.LIMIT}`
  );

  const { data } = res;
  dispatch({ type: types.PHOTOS_LOADED, payload: data });
};

const PhotoState = props => {
  // NOTE: Set initial page to 1 - jsonplaceholder provides duplicate results
  // when getting photos from pages 0 and 1
  const initialState = {
    loading: false,
    hasMore: true,
    data: [],
    page: 1
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PhotoContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoState;
