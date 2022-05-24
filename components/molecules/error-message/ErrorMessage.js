import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { Component } from "react";

export default class ErrorMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: [],
      menuData: []
    }
  }

  render() {
    return (
        <div className="m-error-message">
            <h1>{this.props.title}</h1>
            {this.props.content}
        </div>
    );
  }
};