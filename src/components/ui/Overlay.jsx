import { useEffect } from 'react';
export const Overlay = ({onClick, isVisible}) => {
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
	return <div onClick={onClick} className={`${isVisible ? "block" : "hidden"} fixed left-0 right-0 top-0 bottom-0 bg-black opacity-50 z-10`}>
      </div>
}