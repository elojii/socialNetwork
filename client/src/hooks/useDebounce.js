import { useRef, useCallback } from "react";

export const useDebounce = (callBack, delay) => {
  const timer = useRef();

  const debounce = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callBack();
    }, delay);
    
  }, [callBack, delay]);
  return debounce;
};
