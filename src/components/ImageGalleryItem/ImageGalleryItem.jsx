import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  onImageClick,
  largeImageURL,
  alt,
}) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => onImageClick(largeImageURL)}
    >
      <img src={webformatURL} alt={alt} className={css.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImageClick: PropTypes.func,
  alt: PropTypes.string,
};
