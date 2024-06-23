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

interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: {
    small: string,
    regular: string,
  };
  user: {
    name: string,
  };
  likes: number;
  description?: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<UnsplashImage | null>(null);

  const handleSearchSubmit = async (searchQuery: string) => {
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

  const openModal = (image: UnsplashImage) => {
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
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMoreImages} />}
      {modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
