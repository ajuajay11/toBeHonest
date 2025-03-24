"use client";
import { useState, useEffect } from "react";

export default function Preloader({ children }) {
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
 
    const hidePreloaderTimer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Hide preloader after 4 seconds

    return () => {
       clearTimeout(hidePreloaderTimer);
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#FFF",
          display: "grid",
          zIndex: 9999, // Keeps preloader on top
         }}
      >
        {/* Four videos covering the screen */}

        <video
          src="/butterfly.mp4" // Path to video in public folder
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: "20%",
            left: "25%",
            right: 0,
            bottom: 0,
            width: "50%",
            height: "50%",
            objectFit: "contain",
            
            transition: "transform 1s ease-in-out", // Smooth zoom animation
          }}
        />
      </div>
    );
  }

  return children;
}
