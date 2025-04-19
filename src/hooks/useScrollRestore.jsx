// useScrollRestore.js
import { useEffect } from "react";

const useScrollRestore = (isDataAvailable) => {
  useEffect(() => {
    if (isDataAvailable) {
      const savedScroll = sessionStorage.getItem("scroll");
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll));
          sessionStorage.removeItem("scroll");
        }, 0.0001);
      }
    }
  }, [isDataAvailable]);
};

export default useScrollRestore;