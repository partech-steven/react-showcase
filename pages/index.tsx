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
    const pageData = await this.request("landing");
    this.setState({
      pageData: pageData.props
    });
  }

  render() {
    if (this.state.pageData !== null && this.state.pageData !== undefined) {
      return (
        <React.Fragment>
          <Head>
            <title>Steven Nolles - A Portfolio Website</title>
            <meta property="og:title" content="Steven Nolles - A Portfolio Website" key="title" />
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