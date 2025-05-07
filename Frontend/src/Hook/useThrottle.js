import { useRef } from "react";

export const useThrottle = () => {
  const lastCallRef = useRef(0); // persists across renders

  return (cb, delay) => {
    const now = new Date().getTime();
    const timeSinceLastCall = now - lastCallRef.current;

    console.log(timeSinceLastCall, delay);

    if (timeSinceLastCall >= delay) {
      lastCallRef.current = now;
      cb(); // run the callback
    }
  };
};

export default useThrottle;