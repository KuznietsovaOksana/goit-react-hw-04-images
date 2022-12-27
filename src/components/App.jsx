import { useState, useEffect } from 'react';
import { getImages } from '../services/api';

import css from './App.module.css';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const per_page = 12;

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    getImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(images => [...images, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / per_page));
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setLargeImgUrl('');
    setPage(1);
    setError('');
    setShowBtn(false);
    setIsEmpty(false);
    setIsLoading(false);
  };

  const onImageClick = largeImgUrl => {
    setLargeImgUrl(largeImgUrl);
  };

  const hasError = error.length > 0;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onFormSubmit} />
      {hasError && (
        <p>
          Oops, something went wrong... <b>{error}</b>! Please, try one more
          time...
        </p>
      )}
      {isEmpty && (
        <p>
          Oops, there is no such a query as <b>{query}</b>! Please, try one more
          time...
        </p>
      )}
      {isLoading && <Loader />}
      {Array.isArray(images) && (
        <ImageGallery list={images} onImageClick={onImageClick} />
      )}
      {showBtn && <Button onClick={loadMore} />}
      {largeImgUrl && (
        <Modal largeImgUrl={largeImgUrl} onImageClick={onImageClick} />
      )}
    </div>
  );
};
