import { NavLink } from 'react-router-dom';
export const Button = ({text, addition, to, onClick}) => {
	return <NavLink to={to} onClick={onClick} className={`${addition} bg-theme font-bold px-5 py-2`}>
	{text}
	</NavLink>
}