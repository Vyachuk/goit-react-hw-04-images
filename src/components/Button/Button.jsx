import React from 'react';
import { StyledButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return <StyledButton onClick={onLoadMore}>Load more</StyledButton>;
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
