import { useRef, useEffect } from "react";
import { useLocation } from "react-router";

const usePrevLocation = () => {
  const location = useLocation();
  const prevLocRef = useRef(location.pathname);

  useEffect(() => {
    // Update the ref after the render is complete
    prevLocRef.current = location.pathname;
  }, [location]);

  // Return the previous location's pathname
  // eslint-disable-next-line react-hooks/refs
  return prevLocRef.current;
};

export default usePrevLocation;