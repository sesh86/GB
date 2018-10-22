import React, {ReactDOM, Component } from 'react';
import axios from 'axios';
import {UncontrolledDropdown,Nav,NavbarBrand,Navbar,NavbarToggler,Collapse,NavItem,NavLink,DropdownToggle,DropdownItem,DropdownMenu} from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      editorState1: EditorState.createEmpty(),
      isOpen: false
    };
  }
  toggle=() => {
    this.setState({isOpen: !this.state.isOpen});
  }

  onSubmit=(ev)=> {
    ev.preventDefault();
    let courseJSON={}

    for(let i in ev.target.elements){
      if(ev.target.elements[i].value!=undefined && ev.target.elements[i].value!="")
        courseJSON[ev.target.elements[i].name]=ev.target.elements[i].value;
      // console.log(ev.target.elements[i].value)
    }
    courseJSON['logo']='/static/img/'+ev.target.elements.logo.files[0].name;
    // console.log(ev.target.uploadInput.files[0].name)
    // console.log(courseJSON)
    const data = new FormData();

    data.append('file', this.uploadInput.files[0]);
    // data.append('filename', this.fileName.value);
    data.append('courseJSON',JSON.stringify(courseJSON));
    console.log(courseJSON)
    axios.post('http://localhost:8080/upload', data)
      .then(function (response) {
        console.log(response)
    this.setState({ imageURL: '', uploadStatus: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onEditorStateChange = editorState => {this.setState({ editorState });};
  onEditorStateChange1 = editorState1 => {this.setState({ editorState1 });};

  render() {
    const { editorState,editorState1 } = this.state;
    return (

      <div className="container">
        <h1>Create New Course</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Course Name<input name="courseName" type="text" className="form-control"/>
          Course Details
                      <Editor name="courseRich"
                      toolbarClassName="toolbarClassName"
                      initialEditorState={editorState}
                      wrapperClassName="wrapperClassName cDetails"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange }
                      ref="draftRef"/>
                    <textarea name="courseDetails" disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} className="form-control" hidden/>
          Course Syllabus
          <Editor name="courseRich"
          initialEditorState={editorState1}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange1}
          ref="draftRef"/>
          <textarea value={draftToHtml(convertToRaw(editorState1.getCurrentContent()))} className="form-control" hidden name="syllabus" className="form-control"/>
          Course Duration<input name="duration" type="text" className="form-control"/>
          LMS<input type="text" name="lms" className="form-control"/>
          Live Project<input type="text" name="liveProject" className="form-control"/>
          Pre Requisites<input type="text" name="preRequisites" className="form-control"/>
          Logo
          <input className="form-control"  name="logo" ref={(ref) => { this.uploadInput = ref; }} type="file" />
          <br/>
          <button className="form-control btn btn-success" type>Submit</button>
          </div>
        </form>
      </div>
)
}
}

export default CreateCourse;
