import {Button,Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
import React, {Component } from 'react';
import { NavLink} from 'react-router-dom';
import axios from 'axios';
class Category extends Component {
    constructor(props) {
      super(props);
      this.state = {courses:''}
      axios.post('/getCategory/'+this.props.match.params.cat)
      .then(res=>{this.setState({courses:res.data});console.log(res.data);})
    }

  render() {
    let courses=this.state.courses;
      return (
      <div className="container">
      <div className="text-left text">
        <span className="pr-1"><NavLink className="text fa_icon bg-nb" title="Home" to="/"><i className="p-1 fa fa-home" aria-hidden="true"></i></NavLink> <i className="fa fa-angle-right"></i></span>
        <span className="pr-1">{this.props.match.params.cat}</span>
      </div>
      <div className="cat">
      <div className="row justify-content-around justify-content-lg-start">
        {courses?this.state.courses.map((item,index) =>(
          <Card key={index} className="widget">
          <CardHeader className="">
            <CardTitle><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}><img alt={item.courseName} src={'http://localhost:8080'+item.logo} height="200"/></NavLink></CardTitle>
          </CardHeader>
          <CardBody>
            <div className="text-center text"><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}>{item.courseName}</NavLink></div>
            <Button className="btn form-control bg-darkblue"><span className={item.disc?'strike':''}>{'Rs.'+item.fee}</span> {item.disc?'Rs.'+item.disc:''}</Button>
          </CardBody>
          </Card>
        )):''}
      </div>
      </div>
      </div>
    )

  }
}

export default Category;
