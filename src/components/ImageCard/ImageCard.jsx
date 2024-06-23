import style from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
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
