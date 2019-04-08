import axios from 'axios';
import {NavLink as NL,NavLink} from 'react-router-dom';
import React, { Component } from 'react';
import env from './env.json';
import { connect } from 'react-redux'
import {mapDispatchCountries} from '../reducers/actions'
class NavBar extends Component {
  componentDidMount(){this.props.getCountries();this.props.getCategories();}

  constructor(props) {
    super(props);
    let curr=this;
    this.props.getCourses();
    if(localStorage.getItem('token')){this.props.login()}
    this.state = {
      isOpen: false
    };
    axios('http://ip-api.com/json')
    .then(
        function success(response) {
            console.log('User\'s Country', response.data.country);
            axios(env.img+'/getCountry/'+response.data.country)
                .then(function success(res) {
                  curr.props.setCountry(res.data[0])
		// curr.props.setCurrencyRate(res.data[0].Currency)
            })
        });
  }

  logout=()=> {localStorage.clear();this.props.logout();window.location.href = '/';}
  toggle=() => {
    this.setState({isOpen: !this.state.isOpen});
  }
  render() {
    let courses=this.props.state.courses,categories=this.props.state.category;
    let role;
    if(localStorage.token){role=localStorage.token[localStorage.token.length-1];}
    console.log(this.meta);
    return (
      <header>
        <nav className="navbar navbar-expand-sm bg-darkblue mb-3">
              <NL to="/"><img height="80" src={env.img+'/static/img/itrain.png'} className="logo" alt="logo"></img></NL>
              <div className="container justify-content-end">
                  <ul className="navbar-nav ">
                      {Number(role)===0?
                      (<li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Admin</a>
                        <div className="dropdown-menu">
                          <NavLink title="CreateCourse" className="dropdown-item" to="/CreateCourse">CreateCourse</NavLink>
                          <NavLink title="Course List" className="dropdown-item" to="/CourseList">Course List</NavLink>
                          <NavLink title="Enquiries" className="dropdown-item" to="/Enquiries">Enquiries</NavLink>
                        </div>
                      </li>):''}
                      <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Categories</a>
                        <div className="dropdown-menu">
                          {categories?categories.map((category,index) =>(<NavLink key={index} title="CreateCourse" className="dropdown-item" to={"/category/"+category}>{category}</NavLink>)):''}
                        </div>
                      </li>
                      <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Courses</a>
                        <div className="dropdown-menu">
                          {courses?courses.map((course,index) =>(<NavLink key={index} title="CreateCourse" className="dropdown-item" to={"/course/"+course.courseName}>{course.courseName}</NavLink>)):''}
                        </div>
                      </li>
                  </ul>
                  {this.props.state.login?<button className="btn" onClick={()=>this.logout()}>Logout</button>:<NL title="Login" onClick={()=>this.props.goto('')} className="btn btn-light text" to="/login">Login</NL>}
              </div>
        </nav>

      </header>
  )
}
}
const mapStateToProps = (state) => {return {state:state}}
export default connect(mapStateToProps,mapDispatchCountries)(NavBar);
