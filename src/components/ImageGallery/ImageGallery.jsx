import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ photoList, showModal }) => {
  return (
    <ImageGalleryList>
      {photoList.map(photo => (
        <ImageGalleryItem
          key={photo.id + photo.imageSize / photo.likes}
          photoItem={photo}
          showModal={showModal}
        />
      ))}
    </ImageGalleryList>
  );
};
