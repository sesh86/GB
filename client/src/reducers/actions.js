import axios from 'axios';

export const updEnquiries=(res)=>{return {type:'enquiries', res};}

export const delEnquiries=(cid)=>{return {type:'delEnquiries', cid};}

export const updCountries=(res)=>{return {type:'updCountries', res};}

export const mapDispatchEnquiryDetails = (dispatch) => {
  return {

    updEnquiries: () =>{
      const request=axios.post('/getEnquiries');
      request.then(res=>{
        dispatch(updEnquiries(res.data))
      })
    },
    getEnquiryDetails:(mobile)=>{
      const request=axios.post('/getEnquiry/'+mobile);
      request.then(res=>{
        dispatch(delEnquiries(mobile))
      })
    }
  }
}

export const mapDispatchEnquiries = (dispatch) => {
  return {

    updEnquiries: () =>{
      const request=axios.post('/getEnquiries');
      request.then(res=>{
        dispatch(updEnquiries(res.data))
      })
    },
    delEnquiries:(cid)=>{
      return;// eslint-disable-next-line
      const request=axios.post('/delEnquiry/'+cid);
      request.then(res=>{
        dispatch(delEnquiries(cid))
      })
    }
  }
}
export const mapDispatchUsers = (dispatch) => {
  return {
    getCountries:()=>{
      const request=axios.post('/getCountries');
      request.then(res=>{dispatch(updCountries(res.data))})
    }
  }
}
export const logout=()=>{return {type:'logout'};}
export const goto=(url)=>{return {type:'goto',url};}

export const setCountry=(country)=>{return {type:'setCountry',country};}
export const setCurrencyRate=(currencyRate)=>{return {type:'setCurrencyRate',currencyRate};}
export const mapDispatchCountries = (dispatch) => {
  return {
    getCountries:()=>{
      const request=axios.post('/getCountries');
      request.then(res=>{dispatch(updCountries(res.data))})
    },
    setCurrencyRate:(curr)=>{
      const request=axios('http://free.currencyconverterapi.com/api/v5/convert?q=inr_'+curr);
      request.then(res=>{
        dispatch(setCurrencyRate(res.data.results['INR_'+curr].val))})
    },
    setCountry:(country)=>{
        dispatch(setCountry(country));
    },
    login:()=>{dispatch(login());},
    logout:()=>{dispatch(logout())},
    getCourses:()=>{
    const request=axios.post('/getCourses', '');
      request.then(res=>{dispatch(updCourses(res.data))});
      request.catch(function (error) {console.log(error);});
    },
    getCategories:()=>{
    const request=axios.post('/getCategories', '');
      request.then(res=>{dispatch(updCategories(res.data))});
      request.catch(function (error) {console.log(error);});
    },
    goto:(url)=>{
      dispatch(goto(url));
    }
  }
}

export const updDelCourse=(cid)=>{return {type:'updDelCourse', cid};}

export const mapDispatchCourseList = (dispatch) => {
  return {
    getCourses:()=>{
    const request=axios.post('/getCourses', '');
      request.then(res=>{dispatch(updCourses(res.data))});
      request.catch(function (error) {console.log(error);});
    },
    delCourse:(cid)=>{
      console.log(cid)
    const request=axios.post('/delCourse/'+cid, '');
      request.then(res=>{dispatch(updDelCourse(cid))});
      request.catch(function (error) {console.log(error);});
    }
  }
}

export const mapDispatchEnquiry = (dispatch) => {
  return {
    getCountries:()=>{
      const request=axios.post('/getCountries');
      request.then(res=>{dispatch(updCountries(res.data))})
    }
  }
}
export const login=()=>{return {type:'login'};}
export const mapDispatchLogin = (dispatch) => {
  return {
    login:()=>{dispatch(login());}
  }
}
export const mapDispatchCourse = (dispatch) => {
  return {
    getCountries:()=>{
      const request=axios.post('/getCountries');
      request.then(res=>{dispatch(updCountries(res.data))})
    }
  }
}
export const updCategory=(res,p_cat)=>{return {type:'updCategory', res,p_cat};}

export const updCategories=(res)=>{return {type:'updCategories', res};}
export const updCourses=(res)=>{return {type:'updCourses', res};}
export const updEnquiry=(res)=>{return {type:'updEnquiry', res};}


export const mapDispatchHome = (dispatch) => {
  return {
    getCategory:(p_cat)=>{
      const request=axios.post('/getCategory/'+p_cat);
      request.then(res=>{dispatch(updCategory(res.data,p_cat))});
      request.catch(function (error) {console.log(error);});
    },
    onSubmit:(ev)=>{
      console.log('submitted')
      ev.preventDefault();

      return false;
      let courseJSON={}

      if(!this.checkEmail(ev.target.email.value)){return}

      for(let i in ev.target.elements){
        if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!=="")
          courseJSON[ev.target.elements[i].name]=ev.target.elements[i].value;
      }
      const data = new FormData();
      data.append('enquiry',JSON.stringify(courseJSON));
      const request=axios.post('/quickEnquiry', data);
      request.then(res=>{dispatch(updEnquiry(res.data))});
      request.catch(function (error) {console.log(error);});
    }
  }
}
