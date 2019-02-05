
import React, {Component } from 'react';
import { connect } from 'react-redux'
import {mapDispatchEnquiries} from '../reducers/actions'
import Authenticate from './Authenticate';

class Enquiries extends Component {

  constructor(props) {
    super(props);
    Authenticate(this);
  }

  componentDidMount(){this.props.updEnquiries();}

  render() {
    let enquiries=this.props.state.enquiries,l_categories={};
    if(enquiries){
      enquiries.map(function(enquiries){
        if(l_categories[enquiries.category]===undefined){l_categories[enquiries.category]=[];}
        var temp={};temp[enquiries.enquiriesName]=enquiries._id
        l_categories[enquiries.category].push(temp);
        return 0;
      });
    }

    return(
      <div className="container body">
        <h4 className="col-sm-10 col-md-4 text mx-auto">Click on the enquiries to Edit</h4>
        <br/>
        <table className="table table-striped">
        <thead><tr><td>Name</td><td>Email</td><td>Country</td><td>Mobile</td><td>Course Interested</td><td>Delete</td></tr></thead>
        <tbody>
          {
            enquiries?
            enquiries.map((enquiries,index) => (
                <tr key={index}><td>{enquiries.name}</td><td>{enquiries.email}</td><td>{enquiries.country}</td><td>{enquiries.mobile}</td><td>{enquiries.course}</td><td><span className="text bg-nb hand" onClick={() => { this.props.delEnquiries(enquiries._id)}}>X</span></td></tr>
            ))
            :'Loading...'
          }
        </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchEnquiries)(Enquiries);
