import React, { Component } from 'react';
import {Collapse, Button,Card, CardImg, CardText, CardBody, CardLink,CardHeader,
  CardTitle, CardSubtitle} from 'reactstrap'
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class CourseComp extends Component {
  constructor(props) {
    super(props);
    this.state = { course: true,title:true,details:false,syllabus:false,FAQ:false,batch:false,reviews:false };
    axios('/getCourse/'+this.props.match.params.course)
    .then(res=>{console.log(res);this.setState({course:res.data[0]})});
  }
  toggleCourse=() =>{this.setState({ title: !this.state.title });}
  toggleDetails=() =>{this.setState({ details: !this.state.details });}
  toggleSyllabus=() =>{this.setState({ syllabus: !this.state.syllabus });}
  toggleBatch=() =>{this.setState({ batch: !this.state.batch });}
  toggleFAQ=() =>{this.setState({ FAQ: !this.state.FAQ });}
  toggleReviews=() =>{this.setState({ reviews: !this.state.reviews });}
  componentWillMount(){

  }
  render() {
    // var l_course=JSON.stringify(this.state.course[0]);
    console.log(this.state.course)
    // l_course=JSON.parse(l_course);
      if(!this.state.course) return (<div className="bg-site">Loading...</div>);
      return (
        <div className="bg-site">

          <div className="container p-5 text-center">
          <div className="text-left hash"><span className="pr-1">{this.state.course.category}</span>><span className="pl-1">{this.state.course.courseName}</span></div>
          <br/>
          <Card className="hand">
          <CardHeader onClick={this.toggleCourse} className="bg-darkblue">
            <CardTitle>  <span className="p-1 h5">{this.state.course.courseName}</span><span className="float-right">{this.state.title?'-':'+'}</span></CardTitle>
          </CardHeader>
          <Collapse isOpen={this.state.title}>
          <CardBody>
            <br/>

            <div className="row">
            <div className="col-md-4">
              <div><img src={'http://localhost:8080'+this.state.course.logo} height="150"/></div>
            </div>
              <div className="col-md-4">
                  <div className="bd-darkblue text-center p-3 m-1">
                    <b>Where to Start?</b><br/><br/>
                  <Button color="darkblue">Watch Demo</Button>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="bd-contrast text-center p-3 m-1">
                    <b>Learn in Live Classroom</b><br/><br/>
                  <Button color="darkblue">Enroll Now</Button>
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
            <CardHeader onClick={this.toggleBatch} className="bg-darkblue">
              <CardTitle>Batch<span className="float-right">{this.state.batch?'-':'+'}</span></CardTitle>
            </CardHeader>
            <Collapse isOpen={this.state.batch}>
            <CardBody className="text-justify" dangerouslySetInnerHTML={{ __html: this.state.course.batch}} >
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

        </div>)
      }
}

export default CourseComp;
