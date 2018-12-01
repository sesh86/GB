import React, { Component } from 'react';
import {Link , NavLink,withRouter} from 'react-router-dom';
import axios from 'axios';
import salesforce from '../img/salesforce.png';
import aws from '../img/aws.png';
import android from '../img/android.png';
import {Button ,Card,CardHeader,CardTitle,CardBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


class CarouselComp extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0,search:[]};
  }

  componentDidMount= () => {
    let currentComponent = this;
    axios.post('http://localhost:8080/getWidget', '')
      .then(function (response) {
        console.log(response.data);
        currentComponent.setState({item: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
      axios.post('http://localhost:8080/getCategories', '')
        .then(function (response) {
          console.log(response.data);
          currentComponent.setState({category: response.data});
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.post('http://localhost:8080/getCourses', '')
          .then(function (response) {
            console.log(response.data);
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
  console.log(event.target.value,courses);
}
  render() {

    if(!this.state.item) return('');
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
            <span className="input-group-addon">Search</span>
        </div>
        <div className="container">
        <ul className="list-group" id="myUL">
          {courses?courses.map((course) =>(
          <li className="list-group-item"><a href="#">{course}</a></li>)):''
        }
        </ul>
        </div>
        <div className="text text-center m-3"><span>Top Categories:</span>
        {category?this.state.category.map((cat) =>(
          <span className="category" key="">{cat}</span>
        )):''}
        </div>
      </div>
      <div className="container">
      <div className="row">
        {item?this.state.item.map((item) =>(
          <Card className="widget">
          <CardHeader className="">
            <CardTitle><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}><img src={'http://localhost:8080'+item.logo} height="150"/></NavLink></CardTitle>
          </CardHeader>
          <CardBody>
            <span>{item.courseName}</span>
          </CardBody>
          </Card>
        )):''}
      </div>
      </div>
      </div>);}
  }
}

export default CarouselComp;
