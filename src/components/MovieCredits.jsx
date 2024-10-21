import { useEffect, useState } from "react";
import { getMovieCredits } from "./api"; // Import API untuk aktor & sutradara

const MovieCredits = ({ movieId }) => {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieCredits(movieId)
      .then((creditsData) => {
        setCredits(creditsData); // Simpan data credits
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p className="text-center">Loading credits...</p>;
  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  return (
    <>
      <div className="mt-2 max-w-xxl break-words">
        <p className="text-lg mb-2">
          <span className="font-semibold">Aktor:</span>{" "}
          {credits?.cast?.slice(0, 10).map((actor, index) => (
            <span key={actor.id}>
              {actor.name}
              {index < 9 && ", "}
            </span>
          ))}
        </p>
      </div>
      <div>
        <p className="text-lg mb-2">
          <span className="font-semibold">Sutradara:</span>{" "}
          {credits?.crew
            ?.filter((crewMember) => crewMember.job === "Director")
            .map((director) => (
              <span key={director.id}>{director.name}</span>
            ))}
        </p>
      </div>
    </>
  );
};

export default MovieCredits;
