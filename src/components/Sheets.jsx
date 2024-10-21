// import { useNavigate } from "react-router-dom";

// const Sheet = ({ favorites, setFavorites, isSheetOpen, closeSheet }) => {
//   const navigate = useNavigate();

//   const removeFromFavorites = (movieId) => {
//     const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//     setFavorites(updatedFavorites);
//   };

//   return (
//     <div>
//       <div
//         className={`fixed top-0 right-[-400px] w-[400px] h-full bg-white transition-all duration-300 ease-in-out shadow-md ${
//           isSheetOpen ? "right-0" : ""
//         }`}
//       >
//         <div className="sheet-content">
//           <h2>Daftar Film Favorit</h2>
//           <button onClick={closeSheet}>Tutup</button>
//           <ul>
//             {Array.isArray(favorites) && favorites.length > 0 ? (
//               favorites.map((fav) => (
//                 <li key={fav.id} className="favorite-item">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${fav.poster_path}`}
//                     alt={fav.title}
//                     className="favorite-poster"
//                   />
//                   <div className="favorite-details">
//                     <h3>{fav.title}</h3>
//                     <button onClick={() => removeFromFavorites(fav.id)}>
//                       Hapus
//                     </button>
//                     <button onClick={() => navigate(`/movie/${fav.id}`)}>
//                       Lihat Detail
//                     </button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <li>Tidak ada film favorit.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sheet;
