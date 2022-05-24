import Image from 'next/image';
import { useEffect, useState } from "react";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Menu = ({ blok }) => {
  useEffect(() => {
      const handleScroll = () => {

      //TODO: Get the whole 'document.getElementsByTagName("main")[0].children' thing into a state without it fucking up...
      //Go through each main-page element
      if(blok.menu_items !== undefined && blok.menu_items.length > 1) {
        for(let i = 0; i < document.getElementsByTagName("main")[0].children.length; i++) {
          let el = document.getElementsByTagName("main")[0].children[i];
          let id = el.id;
          let top = el.offsetTop;
          let height = el.offsetHeight;
          let offset = 240;
          
          //If a user has scrolled to a certain element
          if(window.scrollY >= (top - offset) && window.scrollY < ((top+height) - offset)) {
            let menuItems = document.getElementsByClassName("o-menu__items")[0].children;
            
            for(let j = 0; j < menuItems.length; j++) {
              let menuItem = menuItems[j];
              let href = menuItem.href;

              if(href.includes(id)) {
                menuItem.classList.add("m-menu-item--selected");
              } else {
                menuItem.classList.remove("m-menu-item--selected");
              }
            }
          }
        }
      }
    };

    // just trigger this so that the initial state 
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(blok.menu_items !== undefined && blok.menu_items.length > 1) {
    return (
      <div className="o-menu" {...storyblokEditable(blok)}>
        <div className="o-menu__line o-menu__line--top">
          <div className="o-menu__line-inner"></div>

          <Image
            src={"/images/decoration/vertical_line_end.png"}
            layout="fill"
            alt="divide-line-left"
            priority={true}
          />
        </div>
        <div className="o-menu__items">
          {blok.menu_items.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
        <div className="o-menu__line o-menu__line--bottom">
          <Image
            src={"/images/decoration/vertical_line_end.png"}
            layout="fill"
            alt="divide-line-left"
            priority={true}
          />

          <div className="o-menu__line-inner"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Menu;