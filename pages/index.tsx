import { useEffect, useState } from "react";
import HeadTitle from "../components/HeadTitle";

const API_KEY = "";

type movie = {
  id: number;
  original_title: string;
};

export default function Home() {
  const [movies, setMovies] = useState<movie[]>([]);

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div>
      <HeadTitle title="Home" />
      {movies ? (
        movies.map((movie) => (
          <div key={movie.id}>
            <h4>{movie.original_title}</h4>
          </div>
        ))
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}
