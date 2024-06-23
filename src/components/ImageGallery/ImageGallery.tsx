import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import style from "./ImageGallery.module.css";
import { UnsplashImage } from "../../types";

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={style.imageGallery}>
      {images.map((image) => (
        <li key={image.id} className={style.imageGalleryItem}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
