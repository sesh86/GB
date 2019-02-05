import React, { Component } from 'react';



import './App.css';
import NavBar from './components/NavBar';
import CarouselComp from './components/Carousel'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle=() => {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
      <div className="App">
        <header className="bg-dark">
          <div className="bg-itrain">
            <div className="container"><pre className="text-light">Ph:984098840   info@itraintechnologies.com </pre></div>
          </div>
          <div className="container">
            <NavBar/>
          </div>
          <div className="d-block">
            <CarouselComp/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
