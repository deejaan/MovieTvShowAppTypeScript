import React, { useState, useEffect, useContext } from "react";
import Show from "./Show";
import Search from "./Search";
import "../styles/movies.scss";
import { AppContext } from "../context/AppContext";
import { MovieItemType } from "../types/types";

//Movies i TvShows se mogu spojiti u jednu komponentu, ali mislim
//da je ovako malo preglednije.

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieItemType[]>([]);
  const { searchQuery, searchItems, setSearchItems } = useContext(AppContext);

  useEffect(() => {
    fetchMovies();

    const fetchSearchedMovies = async () => {
      const dataSearch = await fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=f947a44d2a6e4d83597caac31844a6f7&query=" +
          searchQuery
      );
      const dataSearchJSON = await dataSearch.json();
      const searchedMovies: MovieItemType[] = dataSearchJSON.results;
      setSearchItems(searchedMovies);
    };

    //Dobavljanje search rezultata pozivamo kada je u search baru 3 ili više karaktera.
    //Da bismo zapamtili search query izmedju tabova pamtimo ga u localStorage-u browsera.
    if (searchQuery.length >= 3) {
      fetchSearchedMovies();
      localStorage.setItem("query", searchQuery);
    } else localStorage.removeItem("query");
  }, [searchQuery, setSearchItems]);

  const fetchMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=f947a44d2a6e4d83597caac31844a6f7"
    );
    const dataJSON = await data.json();
    const movies: MovieItemType[] = dataJSON.results.slice(0, 10);
    setMovies(movies);
  };

  return (
    <div>
      <Search></Search>
      <div className="gridContainer">
        {
          //Koristeci ternari operator provjeravamo da li je u search baru ukucano manje od 3 karaktera.
          //Ako jeste, renderamo top 10 filmova, a ako je ukucano više karaktera onda renderamo rezultate pretrage.
          searchQuery.length < 3
            ? movies.map((item: MovieItemType) => (
                <Show
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imagePath={item.poster_path}
                  rating={item.vote_average}
                  itemType="movies"
                ></Show>
              ))
            : (searchItems as MovieItemType[]).map((item: MovieItemType) => (
                <Show
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imagePath={item.poster_path}
                  rating={item.vote_average}
                  itemType="movies"
                ></Show>
              ))
        }
      </div>
    </div>
  );
};

export default Movies;
