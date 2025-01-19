import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import { Header } from '../ui/Header';
import { Loader } from '../ui/Loader'
import { Footer } from '../ui/Footer'
export const AppLayout = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
    	<>
      <Header />
			<Loader />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="m-auto max-w-6xl px-5 text-white">
        <Outlet />
      </div>
    </>
  );
};