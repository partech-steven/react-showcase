import Image from 'next/image';
import { Component } from 'react';

export default class DivideLine extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <span className="a-divide-line">
        <div className="a-divide-line__left">
          <Image
            src={"/images/decoration/line-end-left.png"}
            layout="fill"
            alt="divide-line-left"
            priority={true}
          />
        </div>
        <div className="a-divide-line__center">
        </div>
        <div className="a-divide-line__right">
          <Image
            src={"/images/decoration/line-end-right.png"}
            layout="fill"
            alt="divide-line-right"
            priority={true}
          />
        </div>
      </span>
    );
  }
}