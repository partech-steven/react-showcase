import Image from 'next/image';
import Link from 'next/link';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import DivideLine from '../../atoms/divide-line/DivideLine';

const MenuItem = ({ blok }) => {
  let idSelected = window.location.hash;
  let url = blok.url;
  if (idSelected.length === 0) idSelected = "#home";
  if (url === "#") url = idSelected;

  let className = "m-menu-item";
  if (idSelected === url) className += " " + className + "--selected";
  return (
    <Link href={url} scroll={false}>
      <a href={url} className={className} {...storyblokEditable(blok)}>
        <div className="m-menu-item__blip">
          <Image
            src={"/images/icons/blip.png"}
            layout="fill"
            alt="menu-icon"
            priority={true}
          />
        </div>
        <div className="m-menu-item__content">
          <div className="m-menu-item__icon">
            <Image
              src={blok.icon.filename}
              layout="fill"
              objectFit="cover"
              alt={blok.icon.alt}
              priority={true}
            />
          </div>
          <div className="m-menu-item__label">
            {blok.label}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default MenuItem;