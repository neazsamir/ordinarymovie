import { NavLink, useNavigate } from 'react-router-dom'
import { Overlay } from './Overlay'
import { FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from 'react';
export const Header = () => {
	const navigate = useNavigate();
  const navLink = [
    { name: 'Home', to: '/' },
    { name: 'Movies', to: '/movies' },
    { name: 'Watchlist', to: '/watchlist' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const handleVisiblity = () => {
    setIsVisible(!isVisible);
  };
  return (
    <header className="bg-theme shadow-3xl py-3">
    {/*md*/}
      <nav className="hidden md:flex justify-between items-center max-w-6xl px-5 mx-auto text-white">
      <NavLink to="/" className="font-bold text-2xl">MOVIEsPHERE</NavLink>
      <div className="flex items-center gap-3">
      {
      navLink.map(link =>  <NavLink to={link.to} key={link.to} className={({isActive}) => {
      	return isActive ? "font-bold text-[18px] scale-95 transition duration-200 ease-in text-gray-400" : "font-bold text-[18px]";
      }
      }>{link.name}</NavLink>)
      }
      </div>
      {/* < md */}
      </nav>
      <nav className="md:hidden flex justify-between items-center max-w-6xl px-5 mx-auto text-white">
      <NavLink to="/" className="text-2xl font-bold" >
      MOVIEsPHERE
      </NavLink >
      <button className="text-2xl md:hidden" onClick={handleVisiblity}>
       <GiHamburgerMenu />
      </button>
      </nav>
			<Overlay onClick={handleVisiblity} isVisible={isVisible} />
      <div className={`${!isVisible ? "-left-[250px]" : "left-0"} bg-gray-700 text-white pt-2 pl-3 fixed top-0 z-20 h-screen w-[200px] transition-all duration-300 ease-in`} >
      <h2 className="text-2xl font-bold"> NAV-MENU </h2>
      <ul className="flex flex-col gap-y-3 mt-3 ml-2">
      {
      	navLink.map(link =>  <li key={link.to}><NavLink onClick={handleVisiblity} to={link.to}  className={({isActive}) => {
      	return isActive ? "font-bold text-[18px]  transition duration-200 ease-in text-theme" : "font-bold text-[18px] active:text-theme md:hover:text-theme transition-all duration-300 ease-in ";
      }
      }>{link.name}</NavLink></li>)
      }
      </ul>
      </div>
    </header>
  );
};