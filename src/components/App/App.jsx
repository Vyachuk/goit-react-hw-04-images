import { useState, useEffect } from 'react';
import { getPhoto } from 'services/fetchData';
import { AppWrapper, Text } from './App.styled';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';

export const App = () => {
  const [q, setQ] = useState('Ukraine flag');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [largePhoto, setLargePhoto] = useState('');
  const [totalPhoto, setTotalPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const getData = await getPhoto({
          q,
          page,
        });
        setTotalPhoto(getData.totalHits);
        setPhotos(prev => [...prev, ...getData.hits]);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [q, page]);

  const handleSearchSubmit = text => {
    setPhotos([]);
    setQ(text);
    setPage(1);
  };
  const handleOpenModal = photo => {
    handleToogleModal();
    setLargePhoto(photo);
  };
  const handleToogleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
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
      {Math.ceil(totalPhoto / 12) !== page &&
      !isLoading &&
      photos.length > 0 ? (
        <Button onLoadMore={handleLoadMore} />
      ) : null}
      {isLoading ? <Loader /> : null}
    </AppWrapper>
  );
};
