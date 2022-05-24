import Image from 'next/image';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import DivideLine from '../../atoms/divide-line/DivideLine';

const SplashBanner = ({ blok }) => {
  let id = null;

  if (blok.custom_id) {
    id = (
      (blok.custom_id.length !== 0)
        ? blok.custom_id.replace(/\s+/g, '-').toLowerCase()
        : (
          blok.title.length !== 0
            ? blok.title.replace(/\s+/g, '-').toLowerCase()
            : null
        )
    );
  } else {
    id = (
      (
        blok.title.length !== 0
          ? blok.title.replace(/\s+/g, '-').toLowerCase()
          : null
      )
    );
  }

  return (
    <div id={id} className="m-splash-banner" {...storyblokEditable(blok)}>
      {blok !== undefined &&
        <Image
          src={blok.background_image.filename}
          layout="fill"
          objectFit="cover"
          alt="Hero Image"
          priority={true}
        />
      }
      <div className="m-splash-banner__content">
        <h1>{blok !== undefined && blok.title}</h1>

        <DivideLine />

        <h2 className="h-center-text">{blok && blok.slogan}</h2>

        {blok !== undefined && blok.content.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </div>
  );
};

export default SplashBanner;