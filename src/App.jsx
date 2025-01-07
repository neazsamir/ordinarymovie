import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout.jsx';
import { Home } from './pages/Home';
import { Genre } from './pages/Genre';
import { Movies } from './pages/Movies';
import { MovieDetails } from './pages/MovieDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { trendingMovies } from './api/TrendingMovies'
import { fullDetails } from './api/FullDetails'
export const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
		element: <AppLayout />,
		children: [
			{
			path: '/',
			element: <Home />,
			loader: trendingMovies,
			},
			{
			path: '/home',
			element: <Home />,
			loader: trendingMovies,
			},
			{
			path: '/genre',
			element: <Genre />,
			},
			{
			path: '/movies',
			element: <Genre />,
			},
			{
			path: '/movies/:genre',
			element: <Movies />,
			},
			{
			path: '/movies/:genre/:page',
			element: <Movies />,
			},
			{
			path: '/details/:movieID',
			element: <MovieDetails />,
			loader: fullDetails,
			},
			{
			path: '/details',
			element: <Genre />,
			},
			{
			path: '/about',
			element: <About />,
			},
			{
			path: '/contact',
			element: <Contact />,
			},
			]
		}
		])
		return <RouterProvider router={router} />
}