import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const Pagination = ({ isLoading }) => {
  const { genre, page } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(Number(page) || 1); // Ensure currentPage is a number

  useEffect(() => {
    setCurrentPage(Number(page) || 1); // Update currentPage when the route changes
  }, [page]);

  const handlePageChange = (newPage) => {
    navigate(`/movies/${genre}/${newPage}`);
  };

  return (
    <div className={`${isLoading ? 'hidden' : 'mx-auto p-1 flex border-2 border-solid border-gray-500 w-[100px] rounded mt-4 grid grid-cols-3'}`}>
      <button 
        className="text-2xl text-left" 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage <= 1 || isLoading}
      >
        <FaAngleLeft />
      </button>

      <input
        type="number"
        className="bg-transparent font-bold outline-none text-center"
        value={currentPage}
        onChange={(e) => setCurrentPage(Number(e.target.value) || 1)} // Ensure input value is a number
        onBlur={() => handlePageChange(currentPage)} // Update page on blur
        disabled={isLoading}
      />

      <button 
        className="text-2xl text-right" 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={isLoading}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};