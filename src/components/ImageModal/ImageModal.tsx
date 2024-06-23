import React, { useEffect } from "react";
import Modal from "react-modal";
import style from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  image: {
    urls: {
      regular: string,
    },
    alt_description: string,
    user: {
      name: string,
    },
    likes: number,
    description?: string,
  } | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
          <img src={image.urls.regular} alt={image.alt_description} className={style.imageModalImage} />
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
