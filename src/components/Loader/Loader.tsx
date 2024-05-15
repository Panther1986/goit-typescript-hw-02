import { FC } from "react";
import { Comment } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={css.loaderStyle}>
      <Comment
        color="SlateBlue"
        visible={true}
        width={100}
        height={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
