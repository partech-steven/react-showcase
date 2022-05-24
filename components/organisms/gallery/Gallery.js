import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from "react";  

const Gallery = ({ blok }) => {

  const srlOptions = {
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showFullscreenButton: false,
      showThumbnailsButton: false,
    }
  };

  return (
    <div className="o-gallery" {...storyblokEditable(blok)}>
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Gallery;