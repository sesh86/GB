import React, { Component } from 'react';
import salesforce from '../img/salesforce.png';
import aws from '../img/aws.png';
import android from '../img/android.png';
import {Button ,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: aws,
    altText: 'Amazon Web Services is a cloud technology',
    caption: 'Amazon Web Services is a subsidiary of Amazon.com that provides on-demand cloud computing platforms to individuals, companies and governments, on a paid subscription basis'
  },
  {
    src:salesforce,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: android,
    altText: 'Slide 3',
    caption: 'Amazon Web Services is a cloud technology. Amazon Web Services is a cloud technology. Amazon Web Services is a cloud technology'
  }
];
class CarouselComp extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <div onTouchEnd={this.next}  className="container">


            <div className="row mx-auto p-5">
              <div className="col-12 text-center">
              <h6>  {item.caption}</h6>
              <Button  >Click to see details</Button >
            </div>
            <div className="row mx-auto">
              <div className="col-12">
                <img src={item.src}></img>
              </div>
            </div>

        </div>
        </div>

        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        className="bg-itrain"

      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default CarouselComp;
