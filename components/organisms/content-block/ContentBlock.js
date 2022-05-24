import Image from 'next/image';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import DivideLine from '../../atoms/divide-line/DivideLine';

const ContentBlock = ({ blok }) => {
  let id = null;

  if (blok.custom_id) {
    id = (
      (blok.custom_id.length !== 0)
        ? blok.custom_id.replace(/\s+/g, '-').toLowerCase()
        : (
          blok.title.length !== 0
            ? blok.title.replace(/\s+/g, '-').toLowerCase()
            : (blok.content_title.length !== 0
              ? blok.content_title.replace(/\s+/g, '-').toLowerCase()
              : null
            )
        )
    );
  } else {
    id = (
      (
        blok.title.length !== 0
          ? blok.title.replace(/\s+/g, '-').toLowerCase()
          : (blok.content_title.length !== 0
            ? blok.content_title.replace(/\s+/g, '-').toLowerCase()
            : null
          )
      )
    );
  }

  return (
    <div id={id} className={`o-content-block o-content-block--${id}`} {...storyblokEditable(blok)}>
      {blok.title.length !== 0 &&
        <div className="o-content-block__header">
          {blok.title.length !== 0 &&
            <div className="o-content-block__header-content">
              <h2 className="o-content-block__title a-block-title">{blok.title}</h2>

              <DivideLine />

              <p className="o-content-block__leading-paragraph">{blok.leading_paragraph}</p>
            </div>
          }
        </div>
      }
      <div className="o-content-block__content">
        {blok.content_title &&
          <div className="o-content-block__content-title">
            <h4>{blok.content_title}</h4>

            <DivideLine />
          </div>
        }
        <div className="o-content-block__content-wrapper">
          {blok.content.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentBlock;