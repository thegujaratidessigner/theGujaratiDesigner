"use client";

import { useEffect } from "react";

/**
 * Start Project Builder page
 * Serves the prebuilt Vite SPA from public/start-project/
 */
export default function StartProjectPage() {
  useEffect(() => {
    // Dynamically load the Vite SPA entry point
    const script = document.createElement("script");
    script.src = "/start-project/assets/index-DTxwY_hm.js";
    script.type = "module";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Load the CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/start-project/assets/index-DJszeMJR.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div id="root" />
  );
}
