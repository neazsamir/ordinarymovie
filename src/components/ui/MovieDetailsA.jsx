import { H3 } from './H3'
import { Overlay } from './Overlay'
import { FaStar } from "react-icons/fa";
import { useState } from 'react'
export const MovieDetailsA = ({loader, genreList}) => {
	const {poster_path, title, runtime, original_language, vote_average, overview} = loader()
	const language = new Intl.DisplayNames(['en'], { type: 'language' }).of(original_language) || 'Unknown';
	const imgUrl = `https://image.tmdb.org/t/p/original`;
	const [isFullscreen, setIsFullscreen] = useState(false)
	return (
		      <div className="mt-5 max-w-[650px] mx-auto grid grid-cols-1 gap-3 md:gap-5 xs:grid-cols-2 mb-10">
        <img onClick={() => setIsFullscreen((p) => !p)} className="rounded-2xl" src={`${imgUrl}${poster_path}`} alt={title} onError={(e) => e.target.src = 'https://i.imgur.com/sYhwMdk.jpeg'} alt={title} />
        <div className="flex flex-col justify-center">
          <h2 className="text-[130%] md:text-2xl font-bold mb-2">{title}</h2>
          <H3 label="Runtime" value={runtime} />
          <H3 label="Lang" value={language} />
          <h3 className="text-[18px] font-bold flex gap-1 items-center">
            Rating: <span className="font-normal">{vote_average.toFixed(1)}</span>
            <FaStar className="text-yellow-400" />
          </h3>
          <p className="font-bold mt-2 hidden md:block">{overview}</p>
          <H3 label="Genre" value={genreList} cls="hidden md:block" />
        </div>
        {
        isFullscreen && <div onClick={() => setIsFullscreen((p) => !p)} className="fixed left-0 top-0 right-0 bottom-0 z-[90] flex items-center justify-center px-3 xs:px-5 lg:px-10">
        <img className="h-auto  w-auto  rounded-2xl" src={`${imgUrl}${poster_path}`} />
        </div>
        }
        <Overlay onClick={() => setIsFullscreen((p) => !p)} isVisible={isFullscreen} />
      </div>
	)
}