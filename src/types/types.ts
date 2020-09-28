export type AppContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedItemType: string;
  setSelectedItemType: (value: string) => void;
  searchItems: MovieItemType[] | TvShowItemType[];
  setSearchItems: (value: MovieItemType[] | TvShowItemType[]) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type MovieItemType = {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: string;
  release_date: string;
};

export type TvShowItemType = {
  id: string;
  name: string;
  poster_path: string;
  overview: string;
  vote_average: string;
  first_air_date: string;
};

export type ShowPropsType = {
  title: string;
  imagePath: string;
  rating: string;
  id: string;
  itemType: string;
};

export type ParamsType = { id: string };

export type VideoObjectType = {
  key: string;
  type: string;
};
