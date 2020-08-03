import React, { Fragment } from 'react';
import PhotoState from './context/photo/PhotoState';
import PhotoScroll from './components/containers/PhotoScroll';

function App() {
  return (
    <PhotoState>
      <Fragment>
        <PhotoScroll />
      </Fragment>
    </PhotoState>
  );
}

export default App;
