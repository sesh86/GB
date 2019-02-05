const initState = {login:false}

const rootReducer = (state = initState, action) => {


  if(action.type==='enquiries'){
        return {
          ...state
          ,enquiries:action.res
        }
  }
  else if(action.type==='delEnquiries'){
        return {
          ...state
          ,enquiries:[...state.enquiries.filter(e=>e._id!==action.cid)]
        }
  }
  else if(action.type==='updCountries'){
        return {
          ...state
          ,countries:action.res
        }
  }
  else if(action.type==='updCategory'){

        let l_pages=Array.from(Array(Math.ceil(action.res.length/4)).keys());

        return {
          ...state
          ,item:action.res,widgetPages:l_pages,currentCat:action.p_cat
        }
  }
  else if(action.type==='updCategories'){
        return {
          ...state
          ,category:action.res
        }
  }
  else if(action.type==='updCourses'){
        return {
          ...state
          ,courses:action.res
        }
  }
  else if(action.type==='updDelCourse'){
        return {
          ...state
          ,courses:state.courses.filter(x=>x._id!==action.cid)
        }
  }
  else if(action.type==='login'){
        return {
          ...state
          ,login:true
        }
  }
  else if(action.type==='logout'){
        return {
          ...state
          ,login:false
        }
  }
  else if(action.type==='goto'){
        return {
          ...state
          ,goto:action.url
        }
  }
  else if(action.type==='setCountry'){
        return {
          ...state
          ,country:action.country
        }
  }
  else if(action.type==='setCurrencyRate'){
        let country=state.country;
        country['rate']=action.currencyRate;
        return {
          ...state
          ,country:country
        }
  }
  if(!action.name)
    return state
}

export default rootReducer
