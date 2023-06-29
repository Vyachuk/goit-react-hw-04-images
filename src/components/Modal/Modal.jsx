import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ toogleModal, photo }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toogleModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toogleModal]);

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
