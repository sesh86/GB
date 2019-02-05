const Authenticate=(curr)=>{
  let role;
  if(localStorage.token){role=localStorage.token[localStorage.token.length-1];}
  if(Number(role)!==0){curr.props.history.push('/')}
}
export default Authenticate;
