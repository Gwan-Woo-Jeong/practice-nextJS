import Image from "next/image";
import { useEffect, useState } from "react";
import HeadTitle from "../components/HeadTitle";

type movie = {
  id: number;
  original_title: string;
  poster_path: string;
};

const API_KEY = process.env.API_KEY;

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
    <div className="container">
      <HeadTitle title="Home" />
      {movies ? (
        movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <Image
              alt="poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <h4>{movie.original_title}</h4>
          </div>
        ))
      ) : (
        <h4>Loading...</h4>
      )}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
