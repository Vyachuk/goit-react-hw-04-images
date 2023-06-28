import React from 'react';
import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ photoItem, showModal }) => {
  const { tags, webformatURL, largeImageURL } = photoItem;
  return (
    <GalleryItem>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => showModal(largeImageURL)}
      />
    </GalleryItem>
  );
};
