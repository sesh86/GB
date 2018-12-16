import React, { Component } from 'react';

import axios from 'axios';
import {Input} from 'reactstrap'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {error:''};
  }

  onSubmit=(ev)=> {
    ev.preventDefault();
    let courseJSON={}
    let currentComponent = this;


    for(let i in ev.target.elements){
      if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!=="")
        courseJSON[ev.target.elements[i].name]=ev.target.elements[i].value;
    }
    var data = new FormData();
    // data.append('filename', this.fileName.value);
    data.append('courseJSON',JSON.stringify(courseJSON));
      axios.post('/login', data)
        .then(function (response) {
          if(response.data!=='User Name/Password Incorrect'){
            currentComponent.props.history.push('/');
          }
          else
            currentComponent.setState({error:response.data});
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
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          User Name<Input type="text" name="email" required className="form-control"/>
          Password   <Input type="Password" name="password"  required  className="form-control"/>
          <br/>
          {this.state.error?<span><div className="alert alert-danger">{this.state.error}</div><br/></span>:''}
          <button className="form-control btn btn-success">Login</button>
          </div>
        </form>
      </div>
)
}
}

export default Login;
