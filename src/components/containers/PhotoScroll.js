import React, { Fragment, useEffect, useRef, useState } from 'react';
import { getPhotos, usePhoto } from '../../context/photo/PhotoState';
import PhotoItem from './PhotoItem';

const PhotoScroll = () => {
  const [photoState, photoDispatch] = usePhoto();
  const { data, loading, hasMore, page } = photoState;

  const loader = useRef(getPhotos);
  const pager = useRef(page);
  const observer = useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current(photoDispatch, pager.current);
        }
      },
      { threshold: 1 }
    )
  );

  const [element, setElement] = useState(null);

  useEffect(() => {
    loader.current = getPhotos;
  }, []);

  useEffect(() => {
    pager.current = page;
  }, [page]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <Fragment>
      <ul>
        {data.map(photo => (
          <PhotoItem key={photo.id} photo={photo} />
          // <li>
          //   <img key={photo.id} src={photo.url} width='200px' height='200px' />
          //   <br />
          //   <span>
          //     <em>{photo.title}</em>
          //   </span>
          //   <h5>
          //     Album ID: {photo.albumId} Photo ID: {photo.id}
          //   </h5>
          //   <br />
          // </li>
        ))}
        {loading && <li>Loading...</li>}
        {!loading && hasMore && (
          <li ref={setElement} style={{ background: 'transparent' }}></li>
        )}
      </ul>
    </Fragment>
  );
};

export default PhotoScroll;
