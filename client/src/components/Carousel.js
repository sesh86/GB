/* eslint no-eval: 0 */
import React, { Component } from 'react';
import env from './env.json';
import {NavLink} from 'react-router-dom';
import Enquiry from './Enquiry';
import { connect } from 'react-redux'
import {mapDispatchHome} from '../reducers/actions'
import DocumentMeta from 'react-document-meta';
import {Card,CardHeader,CardTitle,CardBody,Button} from 'reactstrap';


class CarouselComp extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0,search:[],currentCat:'All',modal:false};
    this.props.getCategory('All');
  }

  meta = {
    title: 'i-Train Technologies',
    description: 'I am a description, and I can create multiple tags',
    canonical: 'http://example.com/path/to/page',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      }
    }
  };

  handleKeyPress = (event) => {
    let courses=this.props.state.courses;
    if(event.target.value.length<1) courses=[];
    else{
      var patt = "/"+event.target.value+"/ig";
      console.log(courses)
      courses=courses.filter(course=>eval(patt).test(course.courseName));
    }
    this.setState({search: courses});
  }

  toggle=()=> {this.setState({modal: !this.state.modal});}

  getItems = (page) => {return this.props.state.item.filter(function(x,i) { return (i>=((page-1)*4) && i<page*4) })}
  getCurrency=()=>{return this.props.state.country?this.props.state.country.Currency+' ':'';}


  render() {
    let currency=this.getCurrency();
    const getCourseFee=(fee)=>{return 'INR '+ fee;return this.props.state.country?(Math.round(Number(this.props.state.country.rate)*fee)):''}
    const Course=(props)=>{
      let currency=props.currency
      return (
      props.item.map((item,index) =>(
      <Card key={index} className="widget">
        <CardHeader className="">
          <CardTitle><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}><img alt={item.courseName} src={env.img+item.logo} height="200"/></NavLink></CardTitle>
        </CardHeader>
        <CardBody>
        <NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}>
          <div className="text-center text"><NavLink title={"Check "+item.courseName} className="text" to={"/Course/"+item.courseName}>{item.courseName}</NavLink></div>
          <Button className="btn form-control bg-darkblue"><span className={item.disc?'strike':''}>{currency+getCourseFee(item.fee)}</span> {item.disc?currency+getCourseFee(item.disc):''}</Button>
        </NavLink>
        </CardBody>
      </Card>)))
    }

    if(!this.props.state.item) return(<div><div className="loading text-center">Loading...</div></div>);
    if (this.props.state.item){
      let item=this.props.state.item;
      let category=this.props.state.category;
      let courses=this.state.search;
      return (
        <DocumentMeta {...this.meta}>
          <div>
            <div className="search">
              <h1 className="text-center text">Dont just learn it, Master it</h1>
              <div className="text text-center">The most effective learning system. World’s highest course completion rate.</div>
              <br />
              <div className="input-group container">
                <input type="text" className="form-control" placeholder="Search" onKeyUp={this.handleKeyPress} />
                <span className="input-group-addon hand"><i className="fa fa-search"></i></span>
              </div>
              <div className="container">
                <ul className="list-group" id="myUL">
                  {courses ? courses.map((course, index) => (
                    <li key={index} className="list-group-item"><NavLink title={"Check " + course.courseName} className="text" to={"/Course/" + course.courseName}>{course.courseName}</NavLink></li>)) : ''
                  }
                </ul>
              </div>
              <div>
                <div className="text text-center m-3"><span>Top Categories:</span>
                  {category ? category.map((cat, index) => (
                    <NavLink className="text" to={"/Category/" + cat} key={index}><div className="d-lg-inline-block category" > {cat}</div></NavLink>
                  )) : ''}
                </div>
              </div>
            </div>
            <div className="container">
              <ul className="nav nav-tabs">
                <li key='All' className="nav-item"><a className={this.props.state.currentCat === 'All' ? 'nav-link active' : 'nav-link'} onClick={() => { this.props.getCategory('All') }}>All</a></li>
                {category ? category.map((page, index) => (

                  <li key={index} className="nav-item">
                    <a className={this.props.state.currentCat === page ? 'nav-link active' : 'nav-link'} onClick={() => { this.props.getCategory(page) }}>{page}</a>
                  </li>)) : ''}

              </ul>
            </div>

            <div className="container">
              <div id="slider2" className="carousel slide mb-5" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  {item ? this.props.state.widgetPages.map((page, index) => (
                    <div key={index} className={(page === 0) ? 'carousel-item active bg-carousel' : 'carousel-item bg-carousel'}>
                      <div className="row justify-content-center">
                        <Course item={this.getItems(page + 1)} currency={currency}></Course>
                      </div>
                    </div>
                  )) : ''}
                </div>
                <a href="#slider2" className="carousel-control-prev" data-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </a>
                <a href="#slider2" className="carousel-control-next" data-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </a>
              </div>
              <div>
                <div className="row container">
                  <div className="col-md-4 col-sm-12">
                    <div>
                      <div className="et_pb_blurb_content">
                        <div><span><img src="http://www.itraintechnologies.com/wp-content/uploads/2019/01/Global-Standard-of-Learning.png" alt="ITrain Technologies" /></span></div>
                        <div>
                          <h4 className="et_pb_module_header">Global Standard of Learning</h4>
                          <div>
                            <p><span>Get trained by our team of Industry Experts. Get a perfect blend of practical and theoretical Knowledge and transform your learnings into building an efficacious career path!</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div>
                      <div className="et_pb_blurb_content">
                        <div><span><img src="http://www.itraintechnologies.com/wp-content/uploads/2019/01/At-your-Convenience-Training-itrain.png" alt="ITrain Technologies Bangalore" /></span></div>
                        <div>
                          <h4 className="et_pb_module_header">"At your Convenience" Training</h4>
                          <div>
                            <p><span>We fix class schedules that are appropriate and convenient for the trainees. Our Online Training Sessions are immensely helpful for working professionals.</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div>
                      <div className="et_pb_blurb_content">
                        <div><span><img src="http://www.itraintechnologies.com/wp-content/uploads/2019/01/Personalised-Learning-itrain.png" alt="ITrain Technologies BTM Layout" /></span></div>
                        <div className="et_pb_blurb_container">
                          <h4 className="et_pb_module_header">Personalised Learning</h4>
                          <div>
                            <p><span>We don’t go by a defined syllabus. We make sure our training suits students, working professionals and business owners and helps them excel in their respective fields.&nbsp;</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-darkblue text-center p-5">
              <h4>Schedule a Demo Session with us!</h4>
              <div className="container">
                <span>
                  Instead of us talking more about the way we handle training, it would be great if you could step into our Institute and request a Demo Session. Or you can fill in the contact form and let us get in touch with you!
</span>
              </div><br /><br />
              <Enquiry curr={this} countries={this.props.state.countries} />
            </div>
            <br />
            <div className="container">
              <div>
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <div>
                      <div className="et_pb_blurb_content">
                        <div className="et_pb_main_blurb_image"><span className="et_pb_image_wrap"><img src="http://www.itraintechnologies.com/wp-content/uploads/2019/01/who-we-are.png" alt="" className="et-waypoint et_pb_animation_top et-animated" /></span></div>
                        <div>
                          <h4 className="et_pb_module_header">Who we are</h4>
                          <div>
                            <p>We are a dedicated team of forward-thinking professionals with dynamic thoughts working towards understanding the constantly evolving business world and helping trainees bridge the gap between what they want to learn and what they want to become that results in creating great career opportunities.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div>
                      <div className="et_pb_blurb_content">
                        <div>
                          <span><img src="http://www.itraintechnologies.com/wp-content/uploads/2019/01/our-faculty.png" /></span></div>
                        <div>
                          <h4 className="et_pb_module_header">Our Faculty</h4>
                          <div>
                            <p>iTrain Technologies has an excellent team of faculty that comprises of highly experienced and committed lectures in all the departments. They are brilliant technical and are well aware of the latest and greatest trends in specific domains.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div>
                      <div className="et_pb_blurb_content">
                        <div><span><img src="http://www.itraintechnologies.com/wp-content/uploads/2019/01/our-objective.png" alt="" /></span>
                        </div>
                        <div>
                          <h4 className="et_pb_module_header">Our Objective</h4>
                          <div>
                            <p>To our students, we promise to enlighten them with knowledge in specific desired domains that creates opportunities to fulfil their career aspirations. To our family of employees, we promise a safe and secure working environment where achievements and efforts are recognised and rewarded.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-3 col-sm-12 ">
                  <div className="m1 p-3 bg-darkblue">
                    <div>
                      <div>
                        <p>I joined itrain technology for AWS. My tutor is very knowledgeable and helping faculty. I found everything good. Classrooms are big overall good training content and infrastructure.</p>
                        <strong>Siva</strong>
                        <p>AWS</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className="m1 p-3 bg-darkblue">
                    <div>
                      <div>
                        <p>Classes and training sessions are on par and were good. But the end sessions of both java+selenium courses were paced out. All an all good learning experience. Thanks to iTrain Technologies.</p>
                        <strong>Megha</strong>
                        <p>Selenium</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className="m1 p-3 bg-darkblue">
                    <div>
                      <div>
                        <p>Joined Java in Itrain Technologies. The trainer cleared all the concepts with hands-on training and has great knowledge of the subject. I will recommend people to learn Java from iTrain Technologies</p>
                        <strong>Swetha</strong>
                        <p>java</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className="m1 p-3 bg-darkblue">
                    <div>
                      <div>
                        <p>The best training institute for learning Amazon Web services AWS and DevOps training in Bangalore. I am very satisfied with the trainer for his excellent teaching. Management supports student a lot here.</p>
                        <strong>Sathish</strong>
                        <p>AWS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </DocumentMeta>	      
    );}
  }
}



const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchHome)(CarouselComp);
