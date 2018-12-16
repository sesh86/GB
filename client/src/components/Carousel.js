/* eslint no-eval: 0 */
import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {Alert,Input,Card,CardHeader,CardTitle,CardBody,Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';


class CarouselComp extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0,search:[],currentCat:'All',modal:false,modal1:false,alert:''};
    axios.post('/getCountries')
    .then(res=>{this.setState({countries:res.data});})
  }

  checkEmail=(ev)=>{
    if(/.+@.+\.[A-Za-z]+$/.test(ev)){return true;}
    else{this.setState({alert: 'Please enter a valid email'});return false;}
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
  getCategory=(p_cat)=>{
    console.log('check');
    let currentComponent = this;
    axios.post('/getCategory/'+p_cat)
      .then(function (response) {
        let l_pages=Array.from(Array(Math.ceil(response.data.length/4)).keys())
        currentComponent.setState({item: response.data,widgetPages:l_pages,currentCat:p_cat});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount= () => {
    let currentComponent = this;
    axios.post('/getWidget', '')
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        let l_pages=Array.from(Array(Math.ceil(response.data.length/4)).keys())
        console.log(l_pages);
        currentComponent.setState({item: response.data,widgetPages:l_pages});
      })
      .catch(function (error) {
        console.log(error);
      });
      axios.post('/getCategories', '')
        .then(function (response) {
          currentComponent.setState({category: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.post('/getCourses', '')
          .then(function (response) {
            currentComponent.setState({courses: response.data});
          })
          .catch(function (error) {
            console.log(error);
          });
  }
handleKeyPress = (event) => {
  let courses=this.state.courses;
  if(event.target.value.length<1) courses=[];
  else{
    var patt = "/"+event.target.value+"/ig";
    courses=courses.filter(course=>eval(patt).test(course));
  }
  this.setState({search: courses});
}
toggle1=()=> {
   this.setState({
     modal1: !this.state.modal1
   });
 }
toggle=()=> {
   this.setState({
     modal: !this.state.modal
   });
 }
  getItems = (page) => {console.log(page);return this.state.item.filter(function(x,i) { return (i>=((page-1)*4) && i<page*4) })}
  render() {

    if(!this.state.item) return(<div><div className="loading text-center">Loading...</div></div>);
    if (this.state.item){
      let item=this.state.item;
      let category=this.state.category;
      let courses=this.state.search;
      return (
      <div>
      <div className="search">
        <h1 className="text-center text">Dont just learn it, Master it</h1>
        <div className="text text-center">The most effective learning system. World’s highest course completion rate.</div>
        <br/>
        <div className="input-group container">
            <input type="text" className="form-control" placeholder="Search" onKeyUp={this.handleKeyPress} />
            <span className="input-group-addon hand"><i className="fa fa-search"></i></span>
        </div>
        <div className="container">
        <ul className="list-group" id="myUL">
          {courses?courses.map((course) =>(
          <li className="list-group-item"><NavLink title={"Check "+course} className="text" to={"/Course/"+course}>{course}</NavLink></li>)):''
        }
        </ul>
        </div>
        <div>
          <div className="text text-center m-3"><span>Top Categories:</span>
          {category?this.state.category.map((cat,index) =>(
            <NavLink className="text" to={"/Category/"+cat} key={index}><div className="d-lg-inline-block category" > {cat}</div></NavLink>
          )):''}
          </div>
        </div>
      </div>
      <div className="container">
      <ul className="nav nav-tabs">
      <li key='All' className="nav-item"><a className={this.state.currentCat=='All'?'nav-link active':'nav-link'} onClick={() => { this.getCategory('All')}}>All</a></li>
      {category?this.state.category.map((page,index) =>(

        <li key={index} className="nav-item">
          <a className={this.state.currentCat==page?'nav-link active':'nav-link'} onClick={() => { this.getCategory(page)}}>{page}</a>
        </li>)):''}

      </ul>
      </div>

      <div className="container">
        <div id="slider2" className="carousel slide mb-5" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
          {item?this.state.widgetPages.map((page,index) =>(
            <div className={(page==0)?'carousel-item active bg-carousel':'carousel-item bg-carousel'}>
            <div className="row justify-content-center">
            <Course item={this.getItems(page+1)} key={index}></Course>
            </div>
            </div>
          )):''}
          </div>
          <a href="#slider2" className="carousel-control-prev" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a href="#slider2" className="carousel-control-next" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>

      </div>
      <Enquiry curr={this}/>
      <EnquirySent curr={this}/>

      </div>);}
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
const Enquiry=(props)=>{
  return(
     <div>
          <Button color="info" onClick={props.curr.toggle}>Enquiry</Button>
          <Modal isOpen={props.curr.state.modal} toggle={props.curr.toggle} className={props.curr.props.className}>
            <ModalHeader toggle={props.curr.toggle}>Quick Enquiry</ModalHeader>
            <ModalBody>
                    <form onSubmit={props.curr.onSubmit}>
                    Name<Input type="text" name="name"  className="form-control"/>
                    Email<Input type="email" name="email"   className="form-control" onChange={props.curr.onChange}/>
                    Country <select name="country" className="form-control">
                    <option></option>
                    {props.curr.state.countries?props.curr.state.countries.map((country,index) =>(
                      <option>{country.name}</option>
                    )):''}
                    </select>
                    Mobile<Input type="number" name="mobile"  className="form-control"/>
                    Course Interested<Input type="text" name="course"  className="form-control"/>
                    <br/>
                    <Alert isOpen={props.curr.state.alert} color="danger">{props.curr.state.alert}</Alert>
                    <br/>
                    <button className="form-control btn btn-success bg-darkblue">Submit</button>
                    </form>
            </ModalBody>
          </Modal>
        </div>)
}
const Course=(props)=>{
  return (
  props.item.map((item,index) =>(
  <Card className="widget">
            <CardHeader className="">
              <CardTitle><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}><img alt={item.courseName} src={'http://localhost:8080'+item.logo} height="200"/></NavLink></CardTitle>
            </CardHeader>
            <CardBody>
            <NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}>
              <div className="text-center text"><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}>{item.courseName}</NavLink></div>
              <Button className="btn form-control bg-darkblue"><span className={item.disc?'strike':''}>{'Rs.'+item.fee}</span> {item.disc?'Rs.'+item.disc:''}</Button>
              </NavLink>
            </CardBody>
          </Card>)))
}

export default CarouselComp;
