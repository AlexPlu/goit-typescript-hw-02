import React from "react";
import style from "./ImageCard.module.css";
import { UnsplashImage } from "../../types";

interface ImageCardProps {
  image: UnsplashImage;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={style.imageCard} onClick={onClick}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={style.imageCardImage}
      />
    </div>
  );
};

export default ImageCard;
