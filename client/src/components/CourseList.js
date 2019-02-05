import React, {Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import {mapDispatchCourseList} from '../reducers/actions'
import Authenticate from './Authenticate';

class CourseList extends Component {
    constructor(props) {
      super(props);
      Authenticate(this);
      this.props.getCourses();
    }

  render() {
    let courses=this.props.state.courses;
    let l_categories={};
    if(courses){
      courses.map(function(course){
        if(l_categories[course.category]===undefined){l_categories[course.category]=[];}
        var temp={};temp[course.courseName]=course._id
        l_categories[course.category].push(temp);
        return 0;
      });
    }

    return(
      <div className="container body">
        <h4 className="col-sm-10 col-md-4 text mx-auto">Click on the course to Edit</h4>
        <br/>
        <ul className="list-group-mb5 text-left col-sm-10 col-md-4 mx-auto">
        {courses?
          courses.map(item => (
            <li className="list-group-item link" key={item.courseName}>
            <div className="row">
              <div className="col-10"><NavLink title={"Check "+item.courseName} className="text" to={"/UpdateCourse/"+item.courseName}>{item.courseName}</NavLink></div>
              <div className="col-2"><span className="text bg-nb" onClick={() => { this.props.delCourse(item._id)}}>X</span></div>
              </div>
            </li>
          ))
          :'Loading...'}
        </ul>
      </div>

    )
  }
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchCourseList)(CourseList);
