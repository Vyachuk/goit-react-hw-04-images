import React, { useState } from 'react';
import {
  SearchbarWrap,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChangeValue = e => {
    setValue(e.target.value);
  };
  const handleSubmitForm = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <SearchbarWrap>
      <SearchForm onSubmit={handleSubmitForm}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          onChange={handleChangeValue}
          value={value}
          autoFocus
          placeholder="Search images and photos"
          required={true}
        />
      </SearchForm>
    </SearchbarWrap>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
