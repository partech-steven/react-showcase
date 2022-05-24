import Image from 'next/image';
import { Component } from 'react';

export default class HeroBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="hero-banner">
        {this.props.img &&
          <Image
            src={this.props.img}
            layout="fill" 
            objectFit="cover" 
            alt="Hero Image"
            priority={true}
          />
        }
        { this.props.label && 
            <label className="hero-banner__label">
              {this.props.label}
            </label>
        }
      </div>
    );
  }
}