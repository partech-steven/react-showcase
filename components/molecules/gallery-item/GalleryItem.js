import Image from 'next/image';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

/*
As it is setup now, this component supports videos. 
The Simple React Lightbox however only supports videos on the PRO version, which we do not have (yet), hence why the code looks as it does now should we ever get it.
Adding videos to Gallery Items is disabled in Storyblok until that time comes.
*/
const GalleryItem = ({ blok }) => {
  function isImage(filename) {
    return (filename.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  let thumbnail = (isImage(blok.media.filename) ? blok.media.filename : (blok.media_thumbnail !== null) && blok.media_thumbnail.filename);

  return (
    <div className="m-gallery-item col-quart" {...storyblokEditable(blok)}>
      <div className="m-gallery-item__thumbnail">
        <Image
          src={thumbnail}
          layout="fill"
          objectFit="cover"
          alt={blok.description}
          priority={true}
          srl_gallery_image={isImage(blok.media.filename).toString()}
        />
        {!isImage(blok.media.filename) &&
          <div className="m-gallery-item__thumbnail-arrow"></div>
        }
      </div>
    </div>
  );
};

export default GalleryItem;