import { FC } from "react";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  imageUrl: string;
  alt: string;
  likes: number;
  create: number;
  onClick: () => void;
}

const ImageCard: FC<ImageCardProps> = ({
  imageUrl,
  alt,
  onClick,
  likes,
  create,
}) => {
  return (
    <li>
      <div>
        <img
          src={imageUrl}
          alt={alt}
          onClick={onClick}
          width="320"
          height="200"
        />
        <p className={css.imageText}>Data of create: {create}</p>
        <p className={css.imageText}>Likes: {likes}</p>
      </div>
    </li>
  );
};

export default ImageCard;
