import { getStoryblokApi } from "@storyblok/react"
import { Component } from "react";

export const BODY_TYPE_FORM = 'form';
export const BODY_TYPE_RAW = 'raw';

// Fired requests
var reqs = [];

/**
 * fetch helper
 */
export default class FetchService extends Component {
  async request(slug, callback) {
    // Set the version to 'published' to get to published version
    let contentVersion = "";

    switch(process.env.NEXT_PUBLIC_ENVIRONMENT) {
      case "dev":
        contentVersion = "draft";
        break;
      case "production":
        contentVersion = "published";
        break;
      default:
        contentVersion = "draft";
        break;
    }
    
    let sbParams = {
      version: contentVersion
    };

    let returnObj = [];

    const storyblokApi = getStoryblokApi();
    if(storyblokApi) {
      try{
        let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

        returnObj = {
          props: {
            story: data ? data.story : false,
            key: data ? data.story.id : false,
          },
          revalidate: 3600, // revalidate every hour
        }
      } catch(e) {
        console.log(e);
      }
    }

    return returnObj;
  }
}