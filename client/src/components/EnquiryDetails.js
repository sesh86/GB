import React, {Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import {mapDispatchCourseList} from '../reducers/actions'
import Authenticate from './Authenticate';
import axios from 'axios';
import env from './env.json';
class EnquiryDetails extends Component {
    constructor(props) {
      super(props);
      Authenticate(this);
      this.state={enquiry:{},comments:[{date:'21 Jan 2019',comment:'Call next week'},{'date':'25th Jan 2019',comment:'Will come tomorrow'}]}
      let curr=this;
      axios.post(env.img+'/getEnquiry/'+this.props.match.params.mobile)
      .then(res=>{
        console.log(res);
        curr.setState({enquiry:res.data[0]})
      });
      this.props.getCourses();
    }

  addComment=(ev)=>{
    ev.preventDefault();
    console.log(ev.target.comment.value);
    let comments=this.state.comments;
    comments.push({date:'',comment:ev.target.comment.value});
    this.setState({comments:comments})
  }
  render() {
    let enquiry=this.state.enquiry;
    let l_categories={};

    return(
      <div className="container body">
        <h4 className="col-sm-10 col-md-4 text mx-auto">Click on the course to Edit</h4>
        <br/>
          <table className="table table-striped">
          <thead><tr><td>Name</td><td>Email</td><td>Mobile</td><td>Course</td><td>Assigned To</td><td>Batch</td><td>Location</td><td>Plan To Start</td></tr></thead>
          <tbody>
            <tr><td>{enquiry.name}</td><td>{enquiry.email}</td><td>{enquiry.mobile}</td><td>{enquiry.course}</td><td>{enquiry.assignedTo}</td><td>{enquiry.batch}</td><td>{enquiry.location}</td><td>{enquiry.planToStart}</td></tr>
          </tbody>
          </table>
          {
            this.state.comments.map((comment)=>(
              <div>
                <div class="p-3 mb-2 bg-light border border-white">Posted At{comment.date}</div>
                <div class="p-3 mb-2 bg-light border border-white">{comment.comment}</div>
              </div>
            ))
          }
          <form onSubmit={this.addComment}>
            <input type="text" name="comment" className="input"/><br/><br/>
            <button className="form-control btn btn-success bg-darkblue">Add Comment</button>
          </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchCourseList)(EnquiryDetails);
