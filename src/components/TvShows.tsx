import React, { useState, useEffect, useContext } from "react";
import Show from "./Show";
import Search from "../components/Search";
import "../styles/movies.scss";
import { AppContext } from "../context/AppContext";
import { TvShowItemType } from "../types/types";

//Movies i TvShows se mogu spojiti u jednu komponentu, ali mislim
//da je ovako malo preglednije.

const TvShows: React.FC = () => {
  const [tvShows, setTvShows] = useState<TvShowItemType[]>([]);
  const { searchQuery, searchItems, setSearchItems } = useContext(AppContext);

  useEffect(() => {
    fetchTvShows();

    const fetchSearchedTvShows = async () => {
      const dataSearch = await fetch(
        "https://api.themoviedb.org/3/search/tv?api_key=f947a44d2a6e4d83597caac31844a6f7&query=" +
          searchQuery
      );
      const dataSearchJSON = await dataSearch.json();
      const searchedTvShows: TvShowItemType[] = dataSearchJSON.results;
      setSearchItems(searchedTvShows);
    };

    //Dobavljanje search rezultata pozivamo kada je u search baru 3 ili više karaktera.
    //Da bismo zapamtili search query izmedju tabova pamtimo ga u localStorage-u browsera.
    if (searchQuery.length >= 3) {
      fetchSearchedTvShows();
      localStorage.setItem("query", searchQuery);
    } else localStorage.setItem("query", "");
  }, [searchQuery, setSearchItems]);

  const fetchTvShows = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=f947a44d2a6e4d83597caac31844a6f7"
    );
    const dataJson = await data.json();
    const tvShows: TvShowItemType[] = dataJson.results.slice(0, 10);
    setTvShows(tvShows);
  };

  return (
    <div>
      <Search></Search>
      <div className="gridContainer">
        {
          //Koristeci ternari operator provjeravamo da li je u search baru ukucano manje od 3 karaktera.
          //Ako jeste, renderamo top 10 serija, a ako je ukucano više karaktera onda renderamo rezultate pretrage.
          searchQuery.length < 3
            ? tvShows.map((item: TvShowItemType) => (
                <Show
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  imagePath={item.poster_path}
                  rating={item.vote_average}
                  itemType="tvshows"
                ></Show>
              ))
            : (searchItems as TvShowItemType[]).map((item: TvShowItemType) => (
                <Show
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  imagePath={item.poster_path}
                  rating={item.vote_average}
                  itemType="tvshows"
                ></Show>
              ))
        }
      </div>
    </div>
  );
};

export default TvShows;
