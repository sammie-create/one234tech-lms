import { useEffect } from "react";

function useEscapeKey(enabled, callback) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, callback]);
}

export { useEscapeKey };
