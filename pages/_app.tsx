import '../styles/globals.scss'
import Layout from '../components/templates/Layout';

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from '../components/templates/Page';

const components = {
  page: Page,
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