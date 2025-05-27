import { SearchAPI } from '../api/SearchAPI'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";


export const Search = () => {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')
	const [history, setHistory] = useState(JSON.parse(localStorage.getItem("searchHistory")) || [])
	// Handle search form submission
	const handleSubmit = (e) => {
		e.preventDefault()
		navigate(`/s/${query}`)
	}
	
	const handleRemove = (rmItem, e) => {
		e.stopPropagation()
		const updatedHistory = history.filter(item => item !== rmItem)
		localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
		setHistory(updatedHistory)
	}


	
	



	return (
			<div className="my-5">
				<form onSubmit={handleSubmit}>
					<div className="flex items-center justify-center">
						<div className="flex items-center bg-gray-300 rounded-md max-w-[450px] w-full px-3">
							<input
								required
								type="search"
								className="bg-transparent outline-none flex-grow py-2 text-black"
								placeholder="Search..."
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<button
								className="text-gray-600 hover:text-gray-800"
								type="submit"
							>
								<FaMagnifyingGlass size={20} />
							</button>
						</div>
					</div>
				</form>
				<div className="mt-8">
					<div className="flex justify-center flex-col gap-5">
						{
							history.map(item => <div className=" flex items-center justify-between">
							<Link to={`/s/${item.replace(' ', '+')}`} className="font-semibold capitalize w-full" key={item + Math.random() * 999}>{item}</Link> <button onClick={(e) => handleRemove(item, e)}> <FaXmark className="text-lg" /></button>
							</div>)
						}
					</div>
				</div>
			</div>
	)
}