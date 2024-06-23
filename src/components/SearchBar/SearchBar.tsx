import React, { useState, ChangeEvent, FormEvent } from "react";
import style from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
