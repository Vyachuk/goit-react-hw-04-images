import { Component } from 'react';
import { getPhoto } from 'services/fetchData';
import { AppWrapper } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    q: '',
    page: 1,
    photos: [],
    isModalOpen: false,
    largePhoto: '',
    totalPhoto: null,
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ q: 'Ukraine flag' });
  }
  componentDidUpdate(prevProps, prevState) {
    const { q, page, isModalOpen } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      this.fetchPhotos();
    }
    if (prevState.isModalOpen !== isModalOpen) {
      window.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
          this.handleToogleModal();
        }
      });
    }
  }

  fetchPhotos = async () => {
    this.setState({ isLoading: true });
    try {
      const getData = await getPhoto({
        q: this.state.q,
        page: this.state.page,
      });
      this.setState(prevState => ({
        photos: [...prevState.photos, ...getData.hits],
        totalPhoto: getData.totalHits,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleSearchSubmit = text => {
    this.setState({
      q: text,
      page: 1,
      photos: [],
    });
  };
  handleOpenModal = photo => {
    this.handleToogleModal();
    this.setState({ largePhoto: photo });
  };
  handleToogleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: this.state.page + 1,
    }));
  };
  render() {
    const { photos, isModalOpen, largePhoto, totalPhoto, page, isLoading } =
      this.state;
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery photoList={photos} showModal={this.handleOpenModal} />
        {isModalOpen ? (
          <Modal photo={largePhoto} toogleModal={this.handleToogleModal} />
        ) : null}
        {Math.ceil(totalPhoto / 12) !== page && !isLoading && totalPhoto ? (
          <Button onLoadMore={this.handleLoadMore} />
        ) : null}
        {isLoading ? <Loader /> : null}
      </AppWrapper>
    );
  }
}
