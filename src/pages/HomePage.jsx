import HeroSection from "../components/HeroSection";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Homepages() {
  return (
    <>
      {/* Gunakan flex container untuk layout */}
      <div className="flex">
        {/* Sidebar, sembunyikan di tampilan mobile */}
        <Sidebar />

        {/* Konten utama yang diberi margin-left di tampilan besar */}
        <div className="lg:ml-[18%] lg:w-[83%] w-full">
          <Navbar showSearch={true} />
          <div className="p-4 mx-2">
            {/* HeroSection lebih kecil */}
            <HeroSection />
            <MovieList />
            <aiFlawise />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepages;
