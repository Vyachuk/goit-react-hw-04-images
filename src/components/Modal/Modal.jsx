import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toogleModal();
    }
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.toogleModal();
    }
  };
  render() {
    const { photo } = this.props;
    return (
      <Overlay onClick={this.handleCloseModal}>
        <ModalWindow>
          <img src={photo} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}
