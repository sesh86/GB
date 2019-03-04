import React, { Component } from 'react';
import env from './env.json';
import axios from 'axios';
import {Input,Alert} from 'reactstrap'
import { connect } from 'react-redux'
import {mapDispatchUsers} from '../reducers/actions'

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {alert:''};
  }

  onSubmit=(ev)=> {
    ev.preventDefault();
    let courseJSON={}
    for(let i in ev.target.elements){
      if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!=="")
        courseJSON[ev.target.elements[i].name]=ev.target.elements[i].value;
    }
    courseJSON['role']=1;
    var data = new FormData();
    // data.append('filename', this.fileName.value);
    data.append('courseJSON',JSON.stringify(courseJSON));

      axios.post(env.img+'/createUser', data)
        .then(function (response) {
            console.log(response.data)
          }
        )
        .catch(function (error) {
          console.log(error);
        });

  }
  render() {
    // if(!this.state.course) return <div className="body container">Loading...</div>;
    return (
      <div className="container cat">
        <br/>
        <br/>
        <h1>Create User</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Email<Input type="text" name="email" required className="form-control"/>
          Password   <Input type="Password" name="password"  required  className="form-control"/>
          Confirm Password   <Input type="Password" name="confirmPassword"  required  className="form-control"/>
          Gender   <Input type="text" name="gender"  required  className="form-control"/>
          Country <select name="country" className="form-control">
          <option></option>
          {this.props.state.countries?this.props.state.countries.map((country,index) =>(
            <option key={index}>{country.name}</option>
          )):''}
          </select>
          Mobile   <Input type="number" name="mobile"  required  className="form-control"/>
          Course Interested   <Input type="text" name="courseIntersted"  required  className="form-control"/>
          <br/>
          <Alert isOpen={this.state.alert} color="danger">{this.state.alert}</Alert>
          <button className="form-control btn btn-darkblue">Login</button>
          </div>
        </form>
      </div>
)
}
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchUsers)(CreateUser);
