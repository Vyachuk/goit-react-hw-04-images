import { Component } from 'react';
import { getPhoto } from 'services/fetchData';
import { AppWrapper, Text } from './App.styled';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    q: '',
    page: 1,
    photos: [],
    largePhoto: '',
    totalPhoto: null,
    isLoading: false,
    isModalOpen: false,
  };
  componentDidMount() {
    this.setState({ q: 'Ukraine flag' });
  }
  componentDidUpdate(prevProps, prevState) {
    const { q, page } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      this.fetchPhotos();
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
    const { q, photos, isModalOpen, largePhoto, totalPhoto, page, isLoading } =
      this.state;
    console.log(this.state.photos);
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {photos.length > 0 ? (
          <ImageGallery photoList={photos} showModal={this.handleOpenModal} />
        ) : (
          <Text>We can't find photo of {q} request! Please try again!</Text>
        )}

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
