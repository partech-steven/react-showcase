import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from "react";
import { SRLWrapper } from "simple-react-lightbox";

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
      {/* Let the Lightbox do its thing */}
      <SRLWrapper options={srlOptions}>
        {blok.content.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </SRLWrapper>
    </div>
  );
};

export default Gallery;