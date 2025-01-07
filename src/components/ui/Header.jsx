import { NavLink, useNavigate } from 'react-router-dom'
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

  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible]);

  return (
    <header className="bg-theme shadow-3xl py-3">
      <nav className="flex justify-between items-center max-w-6xl px-5 mx-auto text-white">
      	<FaArrowLeft className="text-2xl" onClick={() => window.history.back()} />
        <div>
          <h3 className="text-[20px] font-bold">MOVIEsPHERE</h3>
        </div>
        <div
          className={`${isVisible ? 'left-[0]' : ''} z-50 duration-500 md:static absolute h-full top-0 md:h-fit left-[-100%] md:w-auto bg-gray-900 md:bg-transparent w-[80%] flex px-5`}>
          <ul className="flex font-bold md:flex-row flex-col md:items-center gap-3 ">
            <h2 className={`${isVisible ? 'block' : 'hidden'} md:hidden text-3xl mt-2`}> Menu </h2>
            {
              navLink.map(link => {
                const { to, name } = link;
                return <li key={to} onClick={handleVisiblity}>
                  <NavLink className="md:hover:scale-110 md:hover:text-white xxs:active:text-theme" to={to}>
                    {name}
                  </NavLink>
                </li>
              })
            }
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button>
            <GiHamburgerMenu onClick={handleVisiblity} name="close" className="text-3xl cursor-pointer md:hidden" />
          </button>
        </div>
        <div onClick={handleVisiblity} className={`${isVisible ? 'block opacity-50' : 'hidden opacity-0'} bg-black md:hidden z-40 opacity-0 fixed left-0 top-0 right-0 bottom-0`}>
        </div>
      </nav>
    </header>
  );
};