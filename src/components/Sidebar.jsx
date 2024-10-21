import { useEffect, useState } from "react";
import { genreList, getLanguages } from "./api";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Sidebar = () => {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([genreList(), getLanguages()])
      .then(([genreData, languageData]) => {
        console.log("Language Data:", genreData);
        setGenres(genreData.genres);
        setLanguages(languageData);
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.iso_639_1 === "en" ||
      lang.iso_639_1 === "id" ||
      lang.iso_639_1 === "hi"
  );

  const handleGenreClick = (genreId, genreName) => {
    navigate(`/genre?id=${genreId}`, {
      state: { genreName },
    });
  };

  return (
    <>
      {/* Sidebar for Desktop */}
      <aside className="fixed top-0 left-0 hidden lg:block w-[18%] h-full py-20 bg-slate-900 my-10 p-4 overflow-y-scroll">
        <div className="space-y-6">
          <div>
            <p className="text-xl font-semibold text-yellow-400 mb-2">Genre</p>
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color="#FBBF24" loading={true} size={50} />
              </div>
            ) : (
              genres.map((genre) => (
                <a
                  key={genre.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleGenreClick(genre.id, genre.name);
                  }}
                  className="block py-2 px-4 rounded-md text-white hover:bg-yellow-500 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  {genre.name}
                </a>
              ))
            )}
          </div>

          <div>
            <p className="text-xl font-semibold text-yellow-400 mb-2">
              Country
            </p>
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color="#FBBF24" loading={true} size={50} />
              </div>
            ) : (
              filteredLanguages.map((lang) => (
                <a
                  href="#"
                  key={lang.iso_639_1}
                  className="block py-2 px-4 rounded-md text-white hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
                >
                  {lang.english_name}
                </a>
              ))
            )}
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-400">© 2023 MovieSite</p>
            <img
              src="./assets/images/tmdb-logo.png"
              alt="TMDB Logo"
              width="130"
              height="17"
              className="mt-4"
            />
          </div>
        </div>
      </aside>

      {/* Sidebar for Mobile (as Tab Bar) */}
      <aside className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-yellow-500 flex flex-col z-10">
        <div className="flex justify-around overflow-x-scroll">
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#FBBF24" loading={true} size={50} />
            </div>
          ) : (
            genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id, genre.name)}
                className="text-sm text-center block py-2 px-3 text-white hover:text-yellow-400"
              >
                {genre.name}
              </button>
            ))
          )}
        </div>

        <div className="flex justify-around overflow-x-scroll mt-2">
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#FBBF24" loading={true} size={50} />
            </div>
          ) : (
            filteredLanguages.map((lang) => (
              <button
                key={lang.iso_639_1}
                className="text-sm text-center block py-2 px-3 text-white hover:text-yellow-400"
              >
                {lang.english_name}
              </button>
            ))
          )}
        </div>

        <div className="text-center text-sm text-gray-400 py-2 border-t border-gray-700">
          © 2023 MovieSite
          <div className="mt-1">
            <img
              src="./assets/images/tmdb-logo.png"
              alt="TMDB Logo"
              width="130"
              height="17"
              className="inline"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
