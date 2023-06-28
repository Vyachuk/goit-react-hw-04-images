import React from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ photo, toogleModal }) => {
  return (
    <Overlay onClick={toogleModal}>
      <ModalWindow>
        <img src={photo} alt="" />
      </ModalWindow>
    </Overlay>
  );
};
