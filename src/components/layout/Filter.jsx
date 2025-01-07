import { useState, useEffect } from "react";
import langs from '../../api/language.json'
import sortBys from '../../api/sortBy.json'
export const Filter = ({setFilter}) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFilter((p) => ({...p, [name]:value}))
	}
  return (
  <div>
  	<select className="text-black w-full bg-transparent border-1 border-solid border-gray-500 border rounded-2xl outline-none text-center font-bold py-1" name="language" onChange={(e) => handleChange(e)}>
  	<option value=''>
  	Language
  	</option>
  		{
  			langs.map(lang => {
  				const { name, native, code } = lang;
  			return <option key={code} value={code}>
  				{name} {name !== native ? `(${native})` : ''}
  			</option>
  			})
  		}
  	</select>
  	<select className="text-black w-full bg-transparent border-1 border-solid border-gray-500 border rounded-2xl outline-none text-center font-bold py-1 mt-2" name="sortBy" onChange={(e) => handleChange(e)}>
  	<option value=''>
  	Sort by
  	</option>
  	  	{
  			sortBys.map(sortby => {
  				const { name, value } = sortby;
  			return <option key={value} value={value}>
  				{name}
  			</option>
  			})
  		}
  	</select>
  </div>
  )
};