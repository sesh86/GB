import React, { Component } from 'react';
import { connect } from 'react-redux'
import {mapDispatchCountries} from '../reducers/actions'
class FooterComp extends Component {

    constructor(props){
        super(props);
        this.props.getCategories();
    }
    render() {
return (<footer className="bg-darkblue p-5">
<div className="container">
<div className="row">
    <div className="col-4 text-white">
    Categories<br/>
    <ul>
    {this.props.state.category?this.props.state.category.map((item,index) =>(<li>{item}</li>)):''}
    </ul>    
    
    </div>
    <div className="col-4">
    <b>Contact Us</b><br/><br/>
    13, First Floor,D.B.B.Sourabha<br/>
    Outer Ring Road,BTM 1st Stage,<br/>
    Bengaluru, Karnataka 560068<br/>
    Land Mark: Near AXA Company Signal, Above Airtel office.<br/>
    +91-7200228124<br/>
    info@itraintechnologies.com<br/>
    </div>
    <div className="col-4 text-right text-light"><b> Our Location</b><br/>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8613000814985!2d77.61267841464452!3d12.916634790891978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15800bf4aa4b%3A0xfd923d3508098552!2siTrain+Technologies+-+AWS+%7C+Python+%7C+RPA+%7C+Data+Science+%7C+Tableau+Training+in+Bangalore%2C+BTM+Layout!5e0!3m2!1sen!2sus!4v1552975039277" width="200" height="200" frameborder="0" allowfullscreen></iframe>
    </div>

</div>
Copyrights iTrain Technologies Limited {new Date().getFullYear()}
</div>

</footer>)
}
}
const mapStateToProps = (state) => {return {state:state}}
export default connect(mapStateToProps,mapDispatchCountries)(FooterComp);

