import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GoSearch } from "react-icons/go";
import css from "./SearchBar.module.css";
import { FC } from "react";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]*$/.test(query.trim())) {
      toast.error("❌ Please enter valid letters only.");
      return;
    }

    if (query.trim() === "") {
      toast.error("Please enter search image!");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.headerContainer}>
      <form className={css.formSearch} onSubmit={handleSubmit}>
        <input
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css.btnSearch} type="submit">
          Search
        </button>
      </form>
      <Toaster position={"top-right"} />
    </header>
  );
};

export default SearchBar;
