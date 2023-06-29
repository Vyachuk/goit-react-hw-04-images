import { useCallback, useReducer, useEffect } from 'react';
import { getPhoto } from 'services/fetchData';
import { AppWrapper, Text } from './App.styled';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';
import { photoReducer } from 'services/photoReducer';

const INITIAL_STATE = {
  q: 'Ukraine flag',
  page: 1,
  photos: [],
  largePhoto: '',
  totalPhoto: null,
  isLoading: false,
  isModalOpen: false,
};

export const App = () => {
  const [state, dispatch] = useReducer(photoReducer, INITIAL_STATE);
  const { q, photos, isModalOpen, largePhoto, totalPhoto, page, isLoading } =
    state;

  const fetchPhotos = useCallback(async () => {
    dispatch({ type: 'setIsLoading', payload: true });
    try {
      const getData = await getPhoto({
        q,
        page,
      });
      dispatch({ type: 'setTotalPhoto', payload: getData.totalHits });
      dispatch({ type: 'setPhotos', payload: getData.hits });
    } catch (error) {
    } finally {
      dispatch({ type: 'setIsLoading', payload: false });
    }
  }, [page, q]);

  useEffect(() => {
    fetchPhotos();
  }, [q, page, fetchPhotos]);

  const handleSearchSubmit = text => {
    dispatch({ type: 'setPhotos', payload: [] });
    dispatch({ type: 'setQ', payload: text });
    dispatch({ type: 'setPage', payload: 1 });
  };
  const handleOpenModal = photo => {
    handleToogleModal();
    dispatch({ type: 'setLargePhoto', payload: photo });
  };
  const handleToogleModal = () => {
    dispatch({ type: 'setIsModalOpen' });
  };

  const handleLoadMore = () => {
    dispatch({ type: 'setPage', payload: 1 });
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSearchSubmit} />
      {photos.length > 0 ? (
        <ImageGallery photoList={photos} showModal={handleOpenModal} />
      ) : null}
      {photos.length === 0 && !isLoading && (
        <Text>We can't find photo of {q} request! Please try again!</Text>
      )}

      {isModalOpen ? (
        <Modal photo={largePhoto} toogleModal={handleToogleModal} />
      ) : null}
      {Math.ceil(totalPhoto / 12) !== page && !isLoading && totalPhoto ? (
        <Button onLoadMore={handleLoadMore} />
      ) : null}
      {isLoading ? <Loader /> : null}
    </AppWrapper>
  );
};
