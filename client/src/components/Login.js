import React, { Component } from 'react';
import env from './env.json';
import axios from 'axios';
import {Input,Alert} from 'reactstrap'
import { connect } from 'react-redux'
import {mapDispatchLogin} from '../reducers/actions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {alert:''};
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

      axios.post(env.img+'/login', data)
        .then(function (response) {
          if(response.data!=='User Name/Password Incorrect'){
            localStorage.setItem('token', response.data);
            currentComponent.props.login()
            // this.props.history.goBack
            // console.log(currentComponent.props.history)

            if(document.referrer.indexOf('localhost')>-1)
              currentComponent.props.history.goBack()
            else
              currentComponent.props.history.push('/')
            // currentComponent.props.history.push(currentComponent.props.history.goBack);
          }
          else
            currentComponent.setState({alert:response.data});
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
          <Alert isOpen={this.state.alert} color="danger">{this.state.alert}</Alert>
          <button className="form-control btn btn-darkblue">Login</button>
          </div>
        </form>
      </div>
)
}
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchLogin)(Login);
