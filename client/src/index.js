import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import FooterComp from './components/FooterComp';
import {BrowserRouter, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import CarouselComp from './components/Carousel'
import CourseComp from './components/CourseComp'
import CreateCourse from './components/CreateCourse';
import CourseList from './components/CourseList';


ReactDOM.render(
<BrowserRouter>
  <div>
    <NavBar/>
    <Route exact path="/" component={CarouselComp}/>
    <Route exact path="/Course/:course" component={CourseComp}/>
    <Route exact path="/CreateCourse" component={CreateCourse}/>
    <Route exact path="/UpdateCourse/:param" component={CreateCourse}/>
    <Route exact path="/CourseList" component={CourseList}/>
  <FooterComp/>
  </div>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
