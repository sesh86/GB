import React, { Component } from 'react';
import {Alert,Input,Modal,ModalHeader,ModalBody,Button,ModalFooter} from 'reactstrap';
import env from './env.json';
import axios from 'axios';
class Enquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {alert:'',modal:this.props.curr.state.modal,modal1:false};
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
       <div>
            <button className="btn btn-outline-darkblue white" onClick={curr.toggle}>Book a Demo with us</button>
	    <Modal isOpen={this.state.modal} toggle={curr.toggle} className={curr.props.className}>
              <ModalHeader toggle={curr.toggle}>Quick Enquiry</ModalHeader>
              <ModalBody>
                      <form onSubmit={this.onSubmit}>
                      Name<Input type="text" name="name"  className="form-control"/>
                      Email<Input type="email" name="email"   className="form-control" onChange={curr.onChange}/>
                      Country <select name="country" className="form-control">
                      <option></option>
                      {this.props.countries?this.props.countries.map((country,index) =>(
                        <option key={index}>{country.Country}</option>
                      )):''}
                      </select>
                      Mobile<Input type="number" name="mobile"  className="form-control"/>
                      Course Interested<Input type="text" name="course"  className="form-control" defaultValue={curr.state.course?curr.state.course.courseName:''}/>
                      <br/>
                      <Alert isOpen={this.state.alert} color="danger">{this.state.alert}</Alert>
                      <br/>
                      <button className="form-control btn btn-success bg-darkblue">Submit</button>
                      </form>
              </ModalBody>
            </Modal>
            <EnquirySent curr={this}/>
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
export default Enquiry;
