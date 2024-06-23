import { useState } from "react";
import style from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <header className={style.searchBar}>
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={style.searchFormInput}
        />
        <button type="submit" className={style.searchFormButton}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
