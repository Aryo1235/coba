import React from "react";
import SearchComponent from "./Search";
import ViewFavoritesButton from "./ViewFavoritesButton";
import { useNavigate } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import ButtonChat from "./ButtonChat";

const Navbar = ({ genreId, genreName, showSearch }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-yellow-500 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Bagian kiri: Logo */}
        <div className="lg:text-2xl text-xl font-bold">
          <a
            onClick={(e) => {
              e.preventDefault();
              handleHomeClick();
            }}
            className="cursor-pointer"
          >
            MovieSite
          </a>
        </div>

        {/* Bagian tengah: Search Component */}
        <div className="flex-grow px-2 md:px-6 md:ml-48">
          {showSearch && (
            <SearchComponent genreId={genreId} genreName={genreName} />
          )}
        </div>

        {/* Bagian kanan: Watchlist, ChatBot Button, dan Dropdown User */}
        <div className="flex space-x-2 items-center ">
          <ButtonChat />
          <ViewFavoritesButton />
          <DropdownUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
