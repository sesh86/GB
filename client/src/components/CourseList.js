import React, {ReactDOM, Component } from 'react';
import {Link , NavLink,withRouter} from 'react-router-dom';
import axios from 'axios';
class CourseList extends Component {
    constructor(props) {
      super(props);
      this.state = {courses:''}
      axios('/getCourses')
      .then(res=>{console.log(res);
        this.setState({courses:res.data})
      })
    }
  removeCourse(cid){
    axios('/delCourse/'+cid)
    .then(res=>{
      let courses=this.state.courses;
      this.setState({courses:courses.filter(x=>x._id!=cid)})
  });
}
  render() {
    let courses=this.state.courses;
    let l_categories={};
    if(courses){
      courses.map(function(course){if(l_categories[course.category]==undefined){l_categories[course.category]=[];}
      var temp={};temp[course.courseName]=course._id
      l_categories[course.category].push(temp);});
      console.log(l_categories)
    }

    return(
      <div className="container body">
        <h4 className="col-sm-10 col-md-4 text mx-auto">Click on the course to Edit</h4>
        <br/>
        <ul className="list-group-mb5 text-left col-sm-10 col-md-4 mx-auto">
        {courses?
          courses.map(item => (
            <li className="list-group-item link">
            <div className="row">
              <div className="col-10"><NavLink title={"Check "+item.courseName} className="text" to={"/UpdateCourse/"+item.courseName}>{item.courseName}</NavLink></div>
              <div className="col-2"><a className="text" onClick={() => { this.removeCourse(item._id)}}>X</a></div>
              </div>
            </li>
          ))
          :'Loading...'}
        </ul>
      </div>

    )
  }
}

export default CourseList;
