import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../App/App.type";

interface ImageGalleryProps {
  images: Image[];
  likes: number;
  create: number;
  onClick: (image: Image) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <div className={css.imageContainer}>
      <ul className={css.listImage}>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            imageUrl={image.small}
            alt={image.alt}
            likes={image.likes}
            create={image.create}
            onClick={() => onClick(image)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
