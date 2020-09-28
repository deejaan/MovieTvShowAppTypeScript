import React, { useState, useEffect, useContext } from "react";
import "../styles/details.scss";
import { AppContext } from "../context/AppContext";
import ReactPlayer from "react-player";
import { useHistory, RouteComponentProps } from "react-router-dom";
import {
  ParamsType,
  MovieItemType,
  TvShowItemType,
  VideoObjectType,
} from "../types/types";

const Details: React.FC<RouteComponentProps<ParamsType>> = ({ match }) => {
  const [detailsMovie, setDetailsMovie] = useState<MovieItemType>();
  const [detailsTvShow, setDetailsTvShow] = useState<TvShowItemType>();
  const [trailer, setTrailer] = useState("");
  const { activeTab } = useContext(AppContext);
  const id = match.params.id;
  const history = useHistory();

  useEffect(() => {
    const fetchDetails = async () => {
      if (activeTab === "movies") {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            id +
            "?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const details: MovieItemType = await data.json();
        setDetailsMovie(details);

        //dobavljanje youtube linka za trailer
        const dataVideos = await fetch(
          "http://api.themoviedb.org/3/movie/" +
            id +
            "/videos?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const videosJSON = await dataVideos.json();
        const videos: VideoObjectType[] = videosJSON.results;
        const trailerVideo: VideoObjectType | undefined = videos.find(
          (video: VideoObjectType) => {
            return video.type === "Trailer";
          }
        );
        if (trailerVideo) {
          const youtubeLink =
            "https://www.youtube.com/watch?v=" + trailerVideo.key;
          setTrailer(youtubeLink);
        }
      }

      if (activeTab === "tvshows") {
        const data = await fetch(
          "https://api.themoviedb.org/3/tv/" +
            id +
            "?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const details: TvShowItemType = await data.json();
        setDetailsTvShow(details);

        //dobavljanje youtube linka za trailer
        const dataVideos = await fetch(
          "http://api.themoviedb.org/3/tv/" +
            id +
            "/videos?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const videosJSON = await dataVideos.json();
        const videos: VideoObjectType[] = videosJSON.results;
        const trailerVideo: VideoObjectType | undefined = videos.find(
          (video: VideoObjectType) => {
            return video.type === "Trailer";
          }
        );
        if (trailerVideo) {
          const youtubeLink =
            "https://www.youtube.com/watch?v=" + trailerVideo.key;
          setTrailer(youtubeLink);
        }
      }
    };
    fetchDetails();
  }, [id, activeTab]);

  let poster = "";
  let releaseDate = "";
  let title = "";
  let rating = "";
  let overview = "";

  if (activeTab === "movies" && detailsMovie !== undefined) {
    releaseDate = detailsMovie.release_date;
    title = detailsMovie.title;
    rating = detailsMovie.vote_average;
    overview = detailsMovie.overview;
    poster = "https://image.tmdb.org/t/p/w200" + detailsMovie.poster_path;
  } else if (activeTab === "tvshows" && detailsTvShow !== undefined) {
    releaseDate = detailsTvShow.first_air_date;
    title = detailsTvShow.name;
    rating = detailsTvShow.vote_average;
    overview = detailsTvShow.overview;
    poster = "https://image.tmdb.org/t/p/w200" + detailsTvShow.poster_path;
  }

  return (
    <div className="detailsContainer">
      <div
        className="backBtn"
        onClick={() => {
          history.goBack();
        }}
      >
        <div className="backIcon"></div> <h4>Back</h4>
      </div>
      {
        //Koristeci ternari operator provjeravamo da li postoji trailer za dati film.
        //Ako postoji renderamo video, u suprotnom renderamo cover sliku.
        trailer ? (
          <ReactPlayer url={trailer} />
        ) : (
          <img src={poster} alt=""></img>
        )
      }
      <h2>{title}</h2>
      <h4>Rating: {rating}</h4>
      <h4>Release Date: {releaseDate}</h4>
      <h4>Overview:</h4>
      <p>{overview}</p>
    </div>
  );
};

export default Details;
