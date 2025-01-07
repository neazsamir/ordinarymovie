import { useState } from "react";
import { Filter } from "../layout/Filter";
import { IoFilter } from "react-icons/io5";
export const Modal = ({setFilter, isLoading}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    console.log("Save clicked");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`text-2xl p-2 bg-white text-theme rounded-full hover:scale-90 transition duration-300 fixed right-[5%] bottom-[5%] shadow-3xl ease-in ${isLoading ? "hidden" : "block"}`}
        aria-label="Open Filter Modal"
      >
        <IoFilter />
      </button>
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          open ? "opacity-50 visible z-90" : "opacity-0 invisible"
        }`}
      />
      <div
        className={`fixed top-1/2 left-1/2 transform transition-transform duration-300 ${
          open ? "-translate-x-1/2 -translate-y-1/2 scale-100 visible z-100" : "-translate-x-1/2 -translate-y-1/2 scale-90 invisible z-100"
        } bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-md max-h-[800px] overflow-y-auto overflow-x-hidden`}
      >
        <div className="text-2xl text-black font-bold mb-4">
          Filter
        </div>
        <Filter setFilter={setFilter} />
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme-dark transition"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};