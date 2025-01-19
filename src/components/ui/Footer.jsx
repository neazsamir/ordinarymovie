import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black relative text-white py-8 mt-32 md:mt-64">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between md:flex-row md:justify-evenly items-center">
          {/* Left section */}
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Ordinary Movie</p>
          </div>

          {/* Links section */}
          <div className="flex space-x-2 md:space-x-4 text-[12px]  font-bold mb-4 md:mb-0">
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <a
              href="https://www.termsfeed.com/live/1bcbf453-8994-45dc-aeba-d180356d0f4b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Privacy Policy
            </a>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/share/19kmyBzuej/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com/@ordinaryanimes?si=T79spFL_o0TibPfL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-red-600"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

          <p className="text-sm text-center">
            Made with ❤️ by Neaz Mahmud Samir
          </p>

      </div>
    </footer>
  );
};