import { Component } from 'react';
import { getImages } from '../services/api';

import css from './App.module.css';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    largeImgUrl: '',
    page: 1,
    per_page: 12,
    error: '',
    showBtn: false,
    isEmpty: false,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, per_page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(totalHits / per_page),
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onFormSubmit = query => {
    this.setState({
      query,
      images: [],
      largeImgUrl: '',
      page: 1,
      error: '',
      showBtn: false,
      isEmpty: false,
      isLoading: false,
    });
  };

  onImageClick = largeImgUrl => {
    this.setState({ largeImgUrl });
  };

  render() {
    const { images, showBtn, error, query, isEmpty, isLoading, largeImgUrl } =
      this.state;
    const hasError = error.length > 0;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {hasError && (
          <p>
            Oops, something went wrong... <b>{error}</b>! Please, try one more
            time...
          </p>
        )}
        {isEmpty && (
          <p>
            Oops, there is no such a query as <b>{query}</b>! Please, try one
            more time...
          </p>
        )}
        {isLoading && <Loader />}
        {Array.isArray(images) && (
          <ImageGallery list={images} onImageClick={this.onImageClick} />
        )}
        {showBtn && <Button onClick={this.loadMore} />}
        {largeImgUrl && (
          <Modal largeImgUrl={largeImgUrl} onImageClick={this.onImageClick} />
        )}
      </div>
    );
  }
}
