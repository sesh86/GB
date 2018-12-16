import { NavLink} from 'react-router-dom';
import React, { Component } from 'react';
import {Collapse, Button,Alert,Input,Card,CardHeader,CardTitle,CardBody,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import axios from 'axios';

class CourseComp extends Component {
  constructor(props) {
    super(props);
    this.state = { course: true,title:true,details:false,syllabus:false,FAQ:false,batch:true,reviews:false,modal1:false,modal:false,alert:''};
    axios('/getCourse/'+this.props.match.params.course)
    .then(res=>{this.setState({course:res.data[0]})});
  }

  checkEmail=(ev)=>{
    if(/.+@.+\.[A-Za-z]+$/.test(ev)){return true;}
    else{this.setState({alert: 'Please enter a valid email'});return false;}
  }
  onSubmit=(ev)=> {
    console.log('test');
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
      axios.post('/quickEnquiry', data)
        .then(function (response) {
          currentComponent.toggle();
          currentComponent.toggle1();
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  toggle=()=> {this.setState({modal: !this.state.modal});}
  toggle1=()=> {this.setState({modal1: !this.state.modal1});}
  toggleCourse=() =>{this.setState({ title: !this.state.title });}
  toggleDetails=() =>{this.setState({ details: !this.state.details });}
  toggleSyllabus=() =>{this.setState({ syllabus: !this.state.syllabus });}
  toggleBatch=() =>{this.setState({ batch: !this.state.batch });}
  toggleFAQ=() =>{this.setState({ FAQ: !this.state.FAQ });}
  toggleReviews=() =>{this.setState({ reviews: !this.state.reviews });}

  render() {
      let tod=new Date(),sat=new Date(),mon=new Date(),nMon=new Date(),nSat=new Date()
      let weDiff=6-tod.getDay()
      sat.setDate(tod.getDate()+weDiff)
      nSat.setDate(sat.getDate()+7)
      sat=sat.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      nSat=nSat.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      let wdDiff=1-tod.getDay()
      mon.setDate(tod.getDate()+wdDiff)
      nMon.setDate(mon.getDate()+7)
      mon=mon.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      nMon=nMon.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

      if(!this.state.course) return (<div className="bg-site">Loading...</div>);
      return (
        <div className="bg-site">
          <div className="container p-3 text-center">
          <div className="text-left text">
            <span className="pr-1"><NavLink className="text fa_icon bg-nb" title="Home" to="/"><i className="p-1 fa fa-home" aria-hidden="true"></i></NavLink> <i className="fa fa-angle-right"></i></span>
            <span className="pr-1"><NavLink className="text bg-nb" title={this.state.course.category} to={"/Category/"+this.state.course.category}>{this.state.course.category}</NavLink></span><i className="fa fa-angle-right"></i><span className="pl-1">{this.state.course.courseName}</span></div>
          <br/>
          <Card>
          <CardHeader onClick={this.toggleCourse} className="bg-darkblue">
            <CardTitle>  <span className="p-1 h5">{this.state.course.courseName}</span><span className="float-right">{this.state.title?'-':'+'}</span></CardTitle>
          </CardHeader>
          <Collapse isOpen={this.state.title}>
          <CardBody>
            <br/>

            <div className="row">
            <div className="col-md-4">
              <div><img alt={this.state.course.courseName} src={'http://localhost:8080'+this.state.course.logo} height="170"/></div>
            </div>
              <div className="col-md-4">
                  <div className="text-center">
                  <iframe title="Demo" width="300" height="170" src={this.state.course.demo+'?controls=0&modestbranding=1'} frameborder="0" allow="fullscreen"></iframe>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="bd-contrast text-center p-3">
                    <b>Learn in Live Classroom</b><br/><br/>
                    Buzz!!!Batches are filling out soon!!!
                    <br/>
                    <br/>
                    <Button color="darkblue" onClick={this.toggle}>Enroll Now</Button>
                  </div>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-3"><div className=" bg-darkblue m-1 p-3"><b>Course Duration:</b><br/>{this.state.course.duration} Days</div></div>
              <div className="col-md-3"><div className="bg-contrast m-1 p-3"><b>Learning Material:</b><br/>{this.state.course.lms}</div></div>
            <div className="col-md-3"><div className="bg-darkblue m-1 p-3"><b>Live Project:</b><br/>{this.state.course.liveProject}</div></div>
              <div className="col-md-3"><div className="bg-contrast m-1 p-3"><b>Pre Requisites:</b><br/>{this.state.course.preRequisites}</div></div>
            </div>

            </CardBody>
            </Collapse>
            </Card>
            <Card>
              <CardHeader onClick={this.toggleBatch} className="bg-darkblue">
                <CardTitle>Batch<span className="float-right">{this.state.batch?'-':'+'}</span></CardTitle>
              </CardHeader>
              <Collapse isOpen={this.state.batch}>
                <CardBody className="text-justify" >
                <table className="table">
                  <tbody>
                  <tr><td>{mon}</td><td>Mon - Fri (17 Days)</td><td>Timings : 07:00 AM - 09:00 AM (IST)</td><td><Button className="btn btn-danger" onClick={this.toggle}>Filling Fast</Button></td></tr>
                  <tr><td>{sat}</td><td>Sat & Sun (5.5 Weeks)<br/>Weekend Batch</td><td>Timings : 08:30 PM - 11:30 PM (IST)</td><td><Button className="btn btn-danger" onClick={this.toggle}>Filling Fast</Button></td></tr>
                  <tr><td>{nMon}</td><td>Mon - Fri (17 Days)</td><td>Timings : 07:00 AM - 09:00 AM (IST)</td><td><Button className="btn btn-success" onClick={this.toggle}>Book Now</Button></td></tr>
                  <tr><td>{nSat}</td><td>Sat & Sun (5.5 Weeks)<br/>Weekend Batch</td><td>Timings : 08:30 PM - 11:30 PM (IST)</td><td><Button className="btn btn-success" onClick={this.toggle}>Book Now</Button></td></tr>
                  </tbody>
                  </table>
              </CardBody>
              </Collapse>
            </Card>
          <Card>
            <CardHeader onClick={this.toggleDetails} className="bg-darkblue">
              <CardTitle>Course Details<span className="float-right">{this.state.details?'-':'+'}</span></CardTitle>
            </CardHeader>
            <Collapse isOpen={this.state.details}>
            <CardBody className="text-justify"><div dangerouslySetInnerHTML={{ __html: this.state.course.courseDetails}} /></CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader onClick={this.toggleSyllabus} className="bg-darkblue">
              <CardTitle>Course Syllabus<span className="float-right">{this.state.syllabus?'-':'+'}</span></CardTitle>
            </CardHeader>
            <Collapse isOpen={this.state.syllabus}>
            <CardBody className="text-justify" dangerouslySetInnerHTML={{ __html: this.state.course.syllabus}} >

            </CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader onClick={this.toggleFAQ} className="bg-darkblue">
              <CardTitle>FAQ<span className="float-right">{this.state.FAQ?'-':'+'}</span></CardTitle>
            </CardHeader>
            <Collapse isOpen={this.state.FAQ}>
            <CardBody className="text-justify" dangerouslySetInnerHTML={{ __html: this.state.course.FAQ}} >
            </CardBody>
            </Collapse>
          </Card>
          <Card>
            <CardHeader onClick={this.toggleReviews} className="bg-darkblue">
              <CardTitle>Reviews<span className="float-right">{this.state.reviews?'-':'+'}</span></CardTitle>
            </CardHeader>
            <Collapse isOpen={this.state.reviews}>
            <CardBody className="text-justify" dangerouslySetInnerHTML={{ __html: this.state.course.reviews}} >
            </CardBody>
            </Collapse>
          </Card>
          </div>
          <Enquiry curr={this}/>
          <EnquirySent curr={this}/>
        </div>)
      }
}
const Enquiry=(props)=>{
  return(
     <div>
          <Button color="info" onClick={props.curr.toggle}>Enquiry</Button>
          <Modal isOpen={props.curr.state.modal} toggle={props.curr.toggle} className={props.curr.props.className}>
            <ModalHeader toggle={props.curr.toggle}>Quick Enquiry</ModalHeader>
            <ModalBody>
                    <form onSubmit={props.curr.onSubmit}>
                    Name<Input type="text" name="name"  className="form-control"/>
                    Email<Input type="email" name="email"  className="form-control" onChange={props.curr.onChange}/>
                    Mobile<Input type="number" name="mobile"  className="form-control"/>
                    Course Interested<Input type="text" name="course"  className="form-control" defaultValue={props.curr.state.course.courseName}/>
                    <br/>
                    <Alert isOpen={props.curr.state.alert===''} color="danger">{props.curr.state.alert}</Alert>
                    <br/>
                    <button className="form-control btn btn-success bg-darkblue">Submit</button>
                    </form>
            </ModalBody>
          </Modal>
        </div>)
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
export default CourseComp;
