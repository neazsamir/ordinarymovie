import { useState, useEffect } from "react";
import langs from '../../api/language.json'
import sortBys from '../../api/sortBy.json'

export const Filter = ({ filter, setFilter, handleClose }) => {
  const [editFilter, setEditFilter] = useState(filter);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFilter(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(prev => ({
      ...prev, 
      ...editFilter
    }));
    handleClose()
  };

  const basicStyle = "w-full bg-transparent border-1 border-solid border-gray-500 border rounded-2xl outline-none text-center font-bold py-1 mt-2";

  return (
    <div className="text-black">
      <form onSubmit={handleSubmit}>
        <P text="Basic" />
        <select 
          className={basicStyle} 
          name="language" 
          onChange={handleChange} 
          value={editFilter.language || ''}
        >
          <option value=''>Language</option>
          {langs.map(lang => {
            const { name, native, code } = lang;
            return (
              <option key={code} value={code}>
                {name} {name !== native ? `(${native})` : ''}
              </option>
            );
          })}
        </select>
        <select 
          className={basicStyle} 
          name="sortBy" 
          onChange={handleChange} 
          value={editFilter.sortBy || ''}
        >
          <option value=''>Sort by</option>
          {sortBys.map(sortby => {
            const { name, value } = sortby;
            return <option key={value} value={value}>{name}</option>;
          })}
        </select>

        <P text="Advanced" />
        <input 
          type="number" 
          className={`${basicStyle} placeholder:text-[14px]`}
          placeholder="Min rating (0-10)" 
          onChange={handleChange} 
          name="voteAvGte"
          value={editFilter.voteAvGte || ''}
        />
        <input 
          type="number" 
          className={`${basicStyle} placeholder:text-[14px]`} 
          onChange={handleChange} 
          placeholder="Max rating (0-10)" 
          name="voteAvLte"
          value={editFilter.voteAvLte || ''}
        />

        <div className="flex items-center grid grid-cols-2 gap-2 mt-1">
          <div>
            <Label text="Released after" htmlFor="releaseGte" />
            <input 
              type="date" 
              id="releaseGte"
              className={`${basicStyle} mt-0`} 
              onChange={handleChange} 
              name="releaseGte"
              value={editFilter.releaseGte || ''}
            />
          </div>
          <div>
            <Label text="Released before" htmlFor="releaseLte" />
            <input 
              type="date" 
              id="releaseLte"
              className={`${basicStyle} mt-0`} 
              onChange={handleChange} 
              name="releaseLte"
              value={editFilter.releaseLte || ''}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
          type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
          <button
          type="submit"
            className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme-dark transition" >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const P = ({ text }) => <p className="text-[14px] text-gray-500 font-bold mt-1 -my-1">{text}</p>;

const Label = ({ text, htmlFor }) => <label htmlFor={htmlFor} className="text-[14px] text-gray-500 font-bold"> {text} </label>;