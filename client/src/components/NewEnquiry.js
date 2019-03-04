import React, { Component } from 'react';
import {Alert,Input,Modal,ModalHeader,ModalBody,Button,ModalFooter} from 'reactstrap';
import env from './env.json';
import axios from 'axios';
class NewEnquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {alert:''};
  }
  checkEmail=(ev)=>{
    if(/.+@.+\.[A-Za-z]+$/.test(ev)){return true;}
    else{this.setState({alert: 'Please enter a valid email'});return false;}
  }
  componentWillReceiveProps(){
    this.setState({modal:this.props.curr.state.modal});
  }
  onSubmit=(ev)=> {
    ev.preventDefault();

    let courseJSON={}
    let currentComponent = this;

    if(!this.checkEmail(ev.target.email.value)){return}

    for(let i in ev.target.elements){
      if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!=="")
        courseJSON[ev.target.elements[i].name]=ev.target.elements[i].value;
    }
    const data = new FormData();
    data.append('enquiry',JSON.stringify(courseJSON));
      axios.post(env.img+'/quickEnquiry', data)
        .then(function (response) {
          currentComponent.toggle();
          currentComponent.toggle1();
        })
        .catch(function (error) {console.log(error);});
    }
  toggle=()=> {this.setState({modal: !this.state.modal});}
  toggle1=()=> {this.setState({modal1: !this.state.modal1});}

  // toggle=()=> {this.setState({modal: !this.state.modal});}
  render(){
    let curr=this.props.curr;
    return(
       <div className="container">
                      <form onSubmit={this.onSubmit}>
                      Name<Input type="text" name="name"  className="form-control"/>
                      Email<Input type="email" name="email"   className="form-control"/>
                      Country <select name="country" className="form-control">
                      <option>India</option>
                      </select>
                      Mobile<Input type="number" name="mobile"  className="form-control"/>
                      Course Interested<Input type="text" name="course"  className="form-control"/>
                      Assigned To<Input type="text" name="assignedTo"  className="form-control"/>
                      Batch
                      <select name="batch" className="form-control">
                      <option></option>
                      <option>Weekdays</option>
                      <option>Weekends</option>
                      </select>
                      Location<Input type="text" name="location"  className="form-control"/>
                      Plan To Start
                      <select name="planToStart" className="form-control">
                      <option></option>
                      <option>Immediate</option>
                      <option>Within a Week</option>
                      <option>Within a Month</option>
                      </select>
                      <br/>
                      <Alert isOpen={this.state.alert} color="danger">{this.state.alert}</Alert>
                      <br/>
                      <button className="form-control btn btn-success bg-darkblue">Submit</button>
                      </form>
          </div>)
    }
}

const EnquirySent=(props)=>{
  return(
     <div>
          <Modal isOpen={props.curr.state.modal1} toggle={props.curr.toggle1} className={props.curr.props.className}>
            <ModalHeader toggle={props.curr.toggle1}>Quick Enquiry</ModalHeader>
            <ModalBody>
              Enquiry Submitted Succesfully
            </ModalBody>
            <ModalFooter>
            <button className="form-control btn bg-darkblue" onClick={props.curr.toggle1}>Done</button>
            </ModalFooter>
          </Modal>
        </div>)
}
export default NewEnquiry;
