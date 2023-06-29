import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ photoList, showModal }) => {
  return (
    <ImageGalleryList>
      {photoList.map(photo => (
        <ImageGalleryItem
          key={Number(photo.id) + Number(photo.likes)}
          photoItem={photo}
          showModal={showModal}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  photoList: PropTypes.array,
};
