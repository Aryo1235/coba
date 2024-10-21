import { useEffect, useState } from "react";
import { getMovieVideos } from "./api"; // Import API untuk video

const VideoTrailer = ({ movieId }) => {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieVideos(movieId)
      .then((videoData) => {
        const trailerVideo = videoData.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerVideo[0]); // Simpan trailer pertama
        console.log(trailerVideo[0]); // Debug key
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading trailer...</p>;
  if (error) return <p>{error.message}</p>;

  if (!trailer) {
    return <p>Trailer tidak tersedia</p>;
  }

  return (
    <div className="w-full md:w-full  xl:w-3/5">
      <h2 className="text-lg font-semibold mb-4">Trailer</h2>
      <iframe
        className="w-full h-64 md:h-48 lg:h-64 xl:h-80"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Trailer"
      />
    </div>
  );
};

export default VideoTrailer;
