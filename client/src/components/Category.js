import DocumentMeta from 'react-document-meta';
import {Button,Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
import React, {Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import {mapDispatchHome} from '../reducers/actions'
import axios from 'axios';
import env from './env.json';
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {courses:'',meta:{description: 'I am a description, and I can create multiple tags',canonical: 'http://example.com/path/to/page',meta: {charset: 'utf-8',name: {keywords: ''}}}}
    this.getCategory();
    var date = new Date('12/25/2018 4:52:48 PM GMT');
    console.log(date.toString());        
  }
  meta = {description: 'I am a description, and I can create multiple tags',canonical: 'http://example.com/path/to/page',meta: {charset: 'utf-8',name: {keywords: ''}}};
  getCurrency=()=>{return this.props.state.country?this.props.state.country.Currency+' ':'';}
  getCourseFee=(fee)=>{return 'INR '+fee;return this.props.state.country?Math.round(Number(this.props.state.country.rate)*fee):''}
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.match.params.cat!==this.props.match.params.cat) this.getCategory();
  }
  getCategory(){
    axios.post(env.img+'/getCategory/'+this.props.match.params.cat)
    .then(res=>{
      this.setState({courses:res.data});
      let cat=this.props.match.params.cat;
      cat=cat.replace(/-/g," ")
      this.meta['title']=cat;
      this.meta['meta'].name.keywords=cat;
      axios(env.img+'/getMeta/'+cat)
      .then(res1=>{this.meta['meta'].name.keywords=res1.data;this.setState({meta:this.meta});});
    })
  }
  render() {
    let courses=this.state.courses;
      return (
      <DocumentMeta {...this.meta}>
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
            <CardTitle><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}><img alt={item.courseName} src={env.img+item.logo} height="200"/></NavLink></CardTitle>
          </CardHeader>
          <CardBody>
            <div className="text-center text"><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}>{item.courseName}</NavLink></div>
            <Button className="btn form-control bg-darkblue">
              <span className={item.disc?'strike':''}>{this.getCurrency()+this.getCourseFee(item.fee)}</span>
                {item.disc?this.getCurrency()+this.getCourseFee(item.disc):''}
              </Button>
          </CardBody>
          </Card>
        )):''}
      </div>
      </div>
      </div>
    </DocumentMeta>
    )

  }
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchHome)(Category);
