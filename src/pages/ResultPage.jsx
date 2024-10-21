import SearchResultsPages from "../components/SearchResults";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <div className="overflow-y-hidden pb-10">
        <Navbar
          showSearch={true}
          genreId={location.state?.genreId}
          genreName={location.state?.genreName}
        />

        <SearchResultsPages />
      </div>
    </>
  );
}
export default ResultsPage;
