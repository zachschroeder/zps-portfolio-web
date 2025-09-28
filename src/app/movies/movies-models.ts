export type Movie = {
  id: string;
  title: string;
  director: string;
};

export type MovieListResponse = {
  status_code: string;
  movie_list: Movie[];
};
