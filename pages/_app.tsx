import '../styles/globals.scss'
import Layout from '../components/templates/Layout';

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from '../components/templates/Page';
import HeroBanner from '../components/molecules/hero-banner/HeroBanner';
import ContentBlock from '../components/organisms/content-block/ContentBlock';
import GalleryItem from '../components/molecules/gallery-item/GalleryItem';
import Gallery from '../components/organisms/gallery/Gallery';

import MenuItem from '../components/molecules/menu-item/MenuItem';
import Menu from '../components/organisms/menu/Menu';

const components = {
  "Hero Banner": HeroBanner,
  "Content Block": ContentBlock,
  "Gallery": Gallery,
  "Gallery Item": GalleryItem,
  "Menu Item": MenuItem,
  menu: Menu,
  page: Page
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_KEY,
  use: [apiPlugin],
  components
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp