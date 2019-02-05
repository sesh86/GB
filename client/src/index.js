import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';
import FooterComp from './components/FooterComp';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import NavBar from './components/NavBar';
import CarouselComp from './components/Carousel'
import CourseComp from './components/CourseComp'
import CreateCourse from './components/CreateCourse';
import CourseList from './components/CourseList';
import NewEnquiry from './components/NewEnquiry';
import Category from './components/Category';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Enquiries from './components/Enquiries';
import EnquiryDetails from './components/EnquiryDetails';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import DocumentMeta from 'react-document-meta';

const store = createStore(rootReducer);

ReactDOM.render(

    <BrowserRouter >
      <Provider store={store}>
      <div>
        <NavBar/>
        <Switch>
        <Route exact path="/" component={CarouselComp}/>
        <Route exact path="/Course/:course" component={CourseComp}/>
        <Route exact path="/CreateCourse" component={CreateCourse}/>
        <Route exact path="/UpdateCourse/:param" component={CreateCourse}/>
        <Route exact path="/CourseList" component={CourseList}/>
        <Route exact path="/Category/:cat" component={Category}/>
        <Route exact path="/CreateUser" component={CreateUser}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Enquiries" component={Enquiries}/>
        <Route exact path="/EnquiryDetails/:mobile" component={EnquiryDetails}/>
        <Route exact path="/NewEnquiry" component={NewEnquiry}/>
        </Switch>
      <FooterComp/>
      </div>
      </Provider>
    </BrowserRouter>


, document.getElementById('root'));

// ReactDOM.createPortal(child, container)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
