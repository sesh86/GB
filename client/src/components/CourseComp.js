import React, { Component } from 'react';
import {Collapse, Button,Card, CardImg, CardText, CardBody, CardLink,CardHeader,
  CardTitle, CardSubtitle} from 'reactstrap'

class CourseComp extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }
  toggle=() =>{
    this.setState({ collapse: !this.state.collapse });
  }
  render() {
      return (
        <div className="bg-lyellow opacity">
          <div className="container p-5 text-center">

          <Card className="hand" color="dark">
          <CardHeader onClick={this.toggle}>
            <CardTitle>  <h5 className="p-1 text-light">Node JS</h5></CardTitle>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <br/>
            <div className="row">
              <div className="col-md-4">
                  <div className="bg-info text-center text-light p-3 m-1">
                    <b>Where to Start?</b><br/><br/>
                  <Button color="secondary">Click Here to Watch Demo</Button>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="bg-green text-center text-light p-3 m-1">
                    <b>Learn in Live Classroom</b><br/><br/>
                  <Button color="danger">Enroll Now</Button>
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="bg-darkgrey text-center text-light p-3 m-1">
                    <b>Recorded Classes</b><br/>
                  <br/>
                <Button color="info">Enroll Now</Button>
                  </div>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-3"><div className="text-light bg-darkblue m-1 p-3"><b>Course Duration:</b><br/>30 Days</div></div>
              <div className="col-md-3"><div className="text-light bg-secondary m-1 p-3"><b>Learning Material:</b><br/>Supplied</div></div>
            <div className="col-md-3"><div className="text-light bg-purple m-1 p-3"><b>Live Project:</b><br/>30 Days</div></div>
              <div className="col-md-3"><div className="text-light bg-danger m-1 p-3"><b>Pre Requisites:</b><br/>30 Days</div></div>
            </div>

            </CardBody>
            </Collapse>
            </Card>
            <br/><br/>
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardBody className="text-justify">
              Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. Historically, JavaScript was used primarily for client-side scripting, in which scripts written in JavaScript are embedded in a webpage's HTML and run client-side by a JavaScript engine in the user's web browser. Node.js lets developers use JavaScript to write Command Line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm,[6] unifying web application development around a single programming language, rather than different languages for server side and client side scripts.
            </CardBody>
            </Card>
          </div>
        </div>)
      }
}

export default CourseComp;
