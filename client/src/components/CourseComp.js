import { NavLink} from 'react-router-dom';
import React, { Component } from 'react';
import {Collapse, Button,Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
import axios from 'axios';
import Enquiry from './Enquiry';
import { connect } from 'react-redux'
import {mapDispatchCourse} from '../reducers/actions'
import DocumentMeta from 'react-document-meta';
import env from './env.json';

class CourseComp extends Component {
  constructor(props) {
    super(props);
    let Questions=
    [
      {
        Q:'What if i miss a class?',
        A:'You will never miss a lecture! You can choose either of the two options:View the recorded session of the class available in your LMS.You can attend the missed session, in any other live batch.',
        show:false
      },
      {
        A:'To help you in this endeavor, we have added a resume builder tool in your LMS. Now, you will be able to create a winning resume in just 3 easy steps. You will have unlimited access to use these templates across different roles and designations. All you need to do is, log in to your LMS and click on the "create your resume" option.',
        Q:'Will I get placement assitance?',
        show:false
      }
    ];
    this.state = { Questions:Questions,course: true,title:true,details:true,syllabus:false,FAQ:false,batch:true,reviews:false,meta:{description: 'I am a description, and I can create multiple tags',canonical: 'http://example.com/path/to/page',meta: {charset: 'utf-8',name: {keywords: ''}}}};
  }
	componentDidMount(){this.getCourse();}
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.match.params.course!==this.props.match.params.course) this.getCourse();
  }
  meta = {description: 'I am a description, and I can create multiple tags',canonical: 'http://example.com/path/to/page',meta: {charset: 'utf-8',name: {keywords: ''}}};
  getCourse=()=>{
	  if('undefined'==this.props.match.params.course) return;
	  console.log(this.props.match.params.course);
    axios(env.img+'/getCourse/'+this.props.match.params.course)
    .then(res=>{
	    console.log(res);
    this.meta['title']=this.state.course.title;
    this.meta['meta'].name.keywords=this.state.course.keywords;
    this.meta['meta'].description=this.state.course.courseDetails;
    this.meta.description=res.data[0].description;

    this.setState({course:res.data[0],meta:this.meta});
    console.log(this.state.course.keywords);
    axios(env.img+'/getMeta/'+this.state.course.title)
    .then(res1=>{this.meta['meta'].name.keywords=res1.data;this.setState({meta:this.meta});});
  });
  }


  toggle=()=> {this.setState({modal: !this.state.modal});}

  toggleCourse=() =>{this.setState({ title: !this.state.title });}
  toggleDetails=() =>{this.setState({ details: !this.state.details });}
  toggleSyllabus=() =>{this.setState({ syllabus: !this.state.syllabus });}
  toggleBatch=() =>{this.setState({ batch: !this.state.batch });}
  toggleFAQ=() =>{this.setState({ FAQ: !this.state.FAQ });}
  toggleQuestions=(id) =>{let Q=this.state.Questions;Q[id].show=!Q[id].show;this.setState({ Questions: Q });console.log(Q)}
  toggleReviews=() =>{this.setState({ reviews: !this.state.reviews });}
  getCurrency=()=>{return this.props.state.country?this.props.state.country.Currency+' ':'';}
  getCourseFee=(fee)=>{return fee;return this.props.state.country?Math.round(Number(this.props.state.country.rate)*fee):''}
  render() {
      document.title =this.state.course.title;
      // document.getElementsByTagName("META")[2].content=this.state.course.keywords;

      let tod=new Date(),sat=new Date(),mon=new Date(),nMon=new Date(),nSat=new Date();

      let weDiff=6-tod.getDay()
      sat.setDate(tod.getDate()+weDiff)
      sat=new Date(sat.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })+' 8:30:00 PM GMT+0530')
      nSat.setDate(sat.getDate()+7)

      let weekend=sat.toString().split(' ')[4],satDay=sat.getDay();
      sat=sat.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      nSat=nSat.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      let wdDiff=1-tod.getDay()
      mon.setDate(tod.getDate()+wdDiff)
      mon=new Date(mon.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })+' 7:00:00 AM GMT+0530')
      nMon.setDate(mon.getDate()+7)
      let weekday=mon.toString().split(' ')[4],monDay=mon.getDay();
      let days={0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'}

      mon=mon.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      nMon=nMon.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

      let tz=/\((.*)\)/.exec(new Date().toString())[1];



      let course=this.state.course,title=this.state.title;
      if(!course) return (<div className="bg-site">Loading...</div>);
      return (
        <DocumentMeta {...this.meta}>
        <div className="bg-site">
          <div className="container p-3 text-center">
          <div className="text-left text">
            <span className="pr-1"><NavLink className="text fa_icon bg-nb" title="Home" to="/"><i className="p-1 fa fa-home" aria-hidden="true"></i></NavLink> <i className="fa fa-angle-right"></i></span>
            <span className="pr-1"><NavLink className="text bg-nb" title={course.category} to={"/Category/"+course.category}>{course.category}</NavLink></span><i className="fa fa-angle-right"></i><span className="pl-1">{course.courseName}</span></div>
          <br/>
          <Card>
          <CardHeader onClick={this.toggleCourse} className="bg-darkblue">
            <CardTitle>  <span className="p-1 h5">{course.courseName?course.courseName.replace(/-/g," "):''}</span><span className="float-right">{title?'-':'+'}</span></CardTitle>
          </CardHeader>
          <Collapse isOpen={title}>
          <CardBody>
            <br/>

            <div className="row">
            <div className="col-md-4">
              <div><img alt={course.courseName} src={env.img+course.logo} height="170"/></div>
            </div>
              <div className="col-md-4">
                  <div className="text-center">
	      	  {
		  course.demo?
                  <iframe title="Demo" width="300" height="170" src={course.demo+'?controls=0&modestbranding=1'} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe>
			  :''
		  }
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="bd-contrast text-center p-3">
                    <b>Learn in Live Classroom</b><br/><br/><span>INR</span>
                    <span className={course.disc?'strike':''}>{this.getCourseFee(course.fee)}</span> {course.disc?this.getCurrency()+this.getCourseFee(course.disc):''}
                    <br/>
                    <br/>
                    <Button color="darkblue" onClick={this.toggle}>Enroll Now</Button>
                  </div>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-3"><div className=" bg-darkblue m-1 p-3"><b>Course Duration:</b><br/>{course.duration} </div></div>
              <div className="col-md-3"><div className="bg-contrast m-1 p-3"><b>Learning Material:</b><br/>{course.lms}</div></div>
            <div className="col-md-3"><div className="bg-darkblue m-1 p-3"><b>Live Project:</b><br/>{course.liveProject}</div></div>
              <div className="col-md-3"><div className="bg-contrast m-1 p-3"><b>Pre Requisites:</b><br/>{course.preRequisites}</div></div>
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
                  <tr><td>Starting on {mon}</td><td>{days[monDay]} - {days[(monDay+4)%7]} (17 Days)</td><td>Timings : {weekday} Hrs ({tz})<br/>Duration: 2 Hours</td><td><Button className="btn btn-danger" onClick={this.toggle}>Filling Fast</Button></td></tr>
                  <tr><td>Starting on {sat}</td><td>{days[satDay]} - {days[(satDay+1)%7]} (5.5 Weeks)</td><td>Timings : {weekend} Hrs ({tz})<br/>Duration: 3 Hours</td><td><Button className="btn btn-danger" onClick={this.toggle}>Filling Fast</Button></td></tr>
                  <tr><td>Starting on {nMon}</td><td>{days[monDay]} - {days[(monDay+4)%7]} (17 Days)</td><td>Timings : {weekday} Hrs ({tz})<br/>Duration: 2 Hours</td><td><Button className="btn btn-success" onClick={this.toggle}>Book Now</Button></td></tr>
                  <tr><td>Starting on {nSat}</td><td>{days[satDay]} - {days[(satDay+1)%7]} (5.5 Weeks)</td><td>Timings : {weekend} Hrs ({tz})<br/>Duration: 3 Hours</td><td><Button className="btn btn-success" onClick={this.toggle}>Book Now</Button></td></tr>
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
            <CardBody className="text-justify"><div dangerouslySetInnerHTML={{ __html: course.courseDetails}} /></CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader onClick={this.toggleSyllabus} className="bg-darkblue">
              <CardTitle>Course Syllabus<span className="float-right">{this.state.syllabus?'-':'+'}</span></CardTitle>
            </CardHeader>
            <Collapse isOpen={this.state.syllabus}>
            <CardBody className="text-justify" dangerouslySetInnerHTML={{ __html: course.syllabus}} >

            </CardBody>
            </Collapse>
          </Card>
            <Card>
              <CardHeader onClick={()=>{this.toggleFAQ()}} className="bg-darkblue">
                <CardTitle>FAQ<span className="float-right">{this.state.FAQ?'-':'+'}</span></CardTitle>
              </CardHeader>
              <Collapse isOpen={this.state.FAQ}>
              <CardBody className="text-justify">
              {this.state.Questions.map((question,index) =>(
                <Card className="text">
                  <CardHeader onClick={()=>{this.toggleQuestions(index)}} className="">
                    <CardTitle>{question.Q}<span className="float-right">{question.show?'-':'+'}</span></CardTitle>
                  </CardHeader>
                  <Collapse isOpen={question.show}>
                  <CardBody className="text-justify">
                    {question.A}
                  </CardBody>
                  </Collapse>
                </Card>
              ))
            }

              </CardBody>
              </Collapse>
            </Card>

          </div>
          <Enquiry curr={this} countries={this.props.state.countries}/>
        </div>
      </DocumentMeta>)
      }
}

// const Qs=(props)=>{
//   return(
//     <Card>
//       <CardHeader onClick={()=>{this.toggleQuestions(1)}} className="">
//         <CardTitle>{this.state.Questions[1].Q}<span className="float-right">{this.state.Questions[1].show?'-':'+'}</span></CardTitle>
//       </CardHeader>
//       <Collapse isOpen={this.state.Questions[1].show}>
//       <CardBody className="text-justify">
//         {this.state.Questions[1].A}
//       </CardBody>
//       </Collapse>
//     </Card>)
// }




const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchCourse)(CourseComp);
