import React from "react";
import FetchService from "../FetchService";

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react"
import Head from "next/head";

export default class Main extends FetchService {
  constructor(props) {
    super(props);

    this.state = {
      pageData: null
    }
  }

  async componentDidMount() {
    const pageData = await this.request("home");
    this.setState({
      pageData: pageData.props
    });
  }

  render() {
    if (this.state.pageData !== null && this.state.pageData !== undefined) {
      return (
        <React.Fragment>
          <Head>
            <title>Steven Nolles - A Human Digital Showcase</title>
            <meta property="og:title" content="A showcase website made my Steven Nolles, employee of Human Digital" key="title" />
          </Head>
          {this.state.pageData.length !== 0 && <StoryblokComponent blok={this.state.pageData.story.content} />}
        </React.Fragment>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}