import React, { memo } from 'react';

const PhotoItem = memo(({ photo: { id, albumId, url, title } }) => {
  // const PhotoItem = ({ photo: { id, albumId, url, title } }) => {
  console.log(`Photo ${id} from Album ${albumId} rendered...`);
  return (
    <li>
      <img src={url} alt='User Profile' width='200px' height='200px' />
      <br />
      <span>
        <em>{title}</em>
      </span>
      <h5>
        Album ID: {albumId} Photo ID: {id}
      </h5>
      <br />
    </li>
  );
  // };
});

export default PhotoItem;
