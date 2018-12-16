import React, {Component } from 'react';
import { NavLink} from 'react-router-dom';
import axios from 'axios';
class Enquiries extends Component {
    constructor(props) {
      super(props);
      this.state = {courses:''}
      axios.post('/getEnquiries')
      .then(res=>{
        this.setState({courses:res.data})})
    }
  removeCourse(cid){
    return false;
    axios.post('/delEnquiry/'+cid)
    .then(res=>{
      let courses=this.state.courses;
      this.setState({courses:courses.filter(x=>x._id!==cid)})
  });
}
  render() {
    let courses=this.state.courses;
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
        <table className="table table-striped">
        <thead><tr><td>Name</td><td>Email</td><td>Country</td><td>Mobile</td><td>Course Interested</td><td>Delete</td></tr></thead>
        <tbody>
          {
            courses?
            courses.map(item => (
                <tr><td>{item.name}</td><td>{item.email}</td><td>{item.country}</td><td>{item.mobile}</td><td>{item.course}</td><td><NavLink className="text bg-nb" to="/Enquiries" onClick={() => { this.removeCourse(item._id)}}>X</NavLink></td></tr>
            ))
            :'Loading...'
          }
        </tbody>
        </table>
      </div>

    )
  }
}

export default Enquiries;
