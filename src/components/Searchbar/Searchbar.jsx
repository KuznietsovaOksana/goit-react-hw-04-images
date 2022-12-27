// import { Component } from 'react';
import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const inputChange = event => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchValue);
    event.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={inputChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
