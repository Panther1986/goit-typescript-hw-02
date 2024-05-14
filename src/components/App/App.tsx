import { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Image, UnsplashImage } from "./App.type";
import { FC } from "react";

const App: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (query === "") return;
    async function fetchArticles() {
      try {
        setLoading(true);
        const MY_KEY = "3E1uqS10ft75HtW6n-WWxNngOMkfjOfuZz96c8u9lqU";
        const params = {
          client_id: MY_KEY,
          query: query,
          orientation: "landscape",
          page: page,
          per_page: 12,
        };
        const response = await axios.get(
          `https://api.unsplash.com/search/photos/`,
          {
            params: params,
            headers: {
              Authorization: `Client-ID ${MY_KEY}`,
            },
          }
        );
        const normalizadeData: Image[] = response.data.results.map(
          ({ alt_description, id, urls, likes, created_at }: any) => ({
            alt: alt_description,
            id,
            small: urls.small,
            regular: urls.regular,
            likes: likes,
            create: created_at,
          })
        );
        if (response.data.results.length === 0) {
          setHasMoreImages(false);
          return;
        }
        setHasMoreImages(true);
        setImages((prevImages) => [...prevImages, ...normalizadeData]);

        setError("");
      } catch (error) {
        setError(
          "Whoops, something went wrong! Please try reloading this page!"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [query, page]);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = (): void => {
    setPage(page + 1);
  };

  const handleImageClick = (image: Image): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={css.mainContainer}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {hasMoreImages && images.length > 0 && <LoadMoreBtn onClick={loadMore} />}
      {selectedImage && (
        <ImageModal
          images={selectedImage}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
