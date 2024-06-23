import { useEffect } from "react";
import Modal from "react-modal";
import style from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={style.imageModalContent}
      overlayClassName={style.imageModalOverlay}
      onClick={handleOverlayClick}
    >
      {image && (
        <div>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={style.imageModalImage}
          />
          <div className={style.imageModalInfo}>
            <p>Author: {image.user.name}</p>
            <p>Likes: {image.likes}</p>
            {image.description && <p>Description: {image.description}</p>}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
