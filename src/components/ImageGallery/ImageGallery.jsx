import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ list, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {list.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            onImageClick={onImageClick}
            largeImageURL={largeImageURL}
            alt={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  onImageClick: PropTypes.func,
};
