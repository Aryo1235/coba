import { createContext, useState } from "react";

// Membuat context untuk pagination
export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <PaginationContext.Provider
      value={{ currentPage, setCurrentPage, totalPages, setTotalPages }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
