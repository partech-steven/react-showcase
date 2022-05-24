import React from "react";
import FetchService from "../FetchService";

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react"
import Head from "next/head";
import Link from 'next/link';
import ErrorMessage from "../components/molecules/error-message/ErrorMessage";

export default class Main extends FetchService {
  constructor(props) {
    super(props);

    this.state = {
      pageData: null,
      menuData: null
    }
  }

  async componentDidMount() {
    const pageData = await this.request("home");
    const menuData = await this.request("menu");
    this.setState({
      pageData: pageData.props,
      menuData: menuData.props
    }, () => {
      const path = window.location.hash;
      if (path && path.includes('#')) {
        const id = path.replace('#', '')
        const el = window.document.getElementById(id)
        if (el !== null) {
          const r = el.getBoundingClientRect()
          window.scrollTo({
            top: r.top,
            behavior: 'smooth'
          })
        }
      }
    });
  }

  render() {
    if(this.state.pageData === null) {
      return (
        <ErrorMessage 
          title={"Loading!"}
          content={
            <p>
              Hold on! We're working hard to get you your content!
            </p>
          }
        />
      );
    }

    //Only return conten if either the page or menu data is not empty
    if (this.state.pageData !== undefined && this.state.pageData.length !== 0) {
      return (
        <React.Fragment>
          <Head>
            <title>Minescrape</title>
            <meta property="og:title" content="Minescrape" key="title" />
          </Head>
          {this.state.menuData !== undefined && this.state.menuData.length !== 0 && <StoryblokComponent blok={this.state.menuData.story.content} />}
          {this.state.pageData.length !== 0 && <StoryblokComponent blok={this.state.pageData.story.content} />}
        </React.Fragment>
      );
    }

    return (
      <ErrorMessage 
        title={"Uh oh!"}
        content={
          <span>
          <p>
            It seems something went wrong whilst loading the page. Please try again later!
          </p>
          <p>
            If this error persists, please visit our 
            <Link href="https://discord.gg/NH9kvr9WnS">
              <a target="_blank">
                Discord server
              </a>
            </Link>
            and report the issue!
          </p>
        </span>
        }
      />
    );
  }
}