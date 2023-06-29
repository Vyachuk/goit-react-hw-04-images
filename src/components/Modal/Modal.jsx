import { useEffect, useCallback } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ toogleModal, photo }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        toogleModal();
      }
    },
    [toogleModal]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      toogleModal();
    }
  };
  return (
    <Overlay onClick={handleCloseModal}>
      <ModalWindow>
        <img src={photo} alt="" />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  toogleModal: PropTypes.func,
  photo: PropTypes.string,
};
