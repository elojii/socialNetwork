import { useEffect } from "react";

export const reloadScrollToTop = () => {
    useEffect(() => {
        const handleBeforeUnload = () => {
          window.scrollTo(0, 0);
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, []);
}