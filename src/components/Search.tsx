import React, { useContext } from "react";
import "../styles/search.scss";
import { AppContext } from "../context/AppContext";

const Search: React.FC = () => {
  const { onSearchChange } = useContext(AppContext);
  const query = localStorage.getItem("query") || "";

  return (
    <div className="searchBar">
      <div className="searchIcon"></div>
      <input
        type="search"
        placeholder="Search..."
        onChange={onSearchChange}
        defaultValue={query}
      />
    </div>
  );
};

export default Search;
