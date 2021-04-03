import React from "react";
import video1 from "./videos/1.webm";
import video2 from "./videos/2.webm";
import video3 from "./videos/3.webm";

export default function Video() {
  const videos = [video1, video2, video3];
  const length = videos.length;
  const currVideo = videos[parseInt(Math.random() * length)];
  return (
    <video
      autoPlay
      muted
      style={{
        pointerEvents: "none",
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: "100%",
        minHeight: "100%",
        zIndex: 0,
      }}
    >
      <source src={currVideo} type="video/mp4" />
    </video>
  );
}
