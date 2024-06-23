import { useState } from "react";
import { toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../apiService/api.js";
import style from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const handleSearchSubmit = async (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term.");
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchImages(searchQuery, 1);
      setImages(data.results);
    } catch (err) {
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
    } catch (err) {
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className={style.wrapper}>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
