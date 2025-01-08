import { useState, useEffect } from "react";
import { Filter } from "../layout/Filter";
import { IoFilter } from "react-icons/io5";

export const Modal = ({ filter, setFilter, isLoading }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={handleOpen}
        className={`text-2xl p-2 bg-white text-theme rounded-full hover:scale-90 transition duration-300 fixed right-[5%] bottom-[5%] shadow-3xl ease-in ${isLoading ? "hidden" : "block"}`}
        aria-label="Open Filter Modal"
      >
        <IoFilter />
      </button>
      {open && (
        <>
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black opacity-50 z-90"
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-100 bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-md max-h-[800px] overflow-y-auto overflow-x-hidden z-100">
            <div className="text-2xl text-black font-bold mb-4">
              Filter
            </div>
            <Filter handleClose={handleClose} filter={filter} setFilter={setFilter} />
          </div>
        </>
      )}
    </>
  );
};