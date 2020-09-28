import React, { useContext } from "react";
import "../styles/show.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ShowPropsType } from "../types/types";

//Najbolji zajednički naziv za filmove i tv serije što sam mogao smisliti
//je "show". Mislim da je prikladniji i opisniji pojam nego npr. "item".

const Show: React.FC<ShowPropsType> = ({
  title,
  imagePath,
  rating,
  id,
  itemType,
}) => {
  const poster = "https://image.tmdb.org/t/p/w200" + imagePath;
  const { setSelectedItemType } = useContext(AppContext);

  return (
    <Link
      to={itemType + "/details/" + id}
      className="gridElement nonLinkFont"
      onClick={() => {
        setSelectedItemType(itemType);
      }}
    >
      <img src={poster} alt=""></img>
      <h3>{title}</h3>
      <h4>{rating}</h4>
    </Link>
  );
};

export default Show;
