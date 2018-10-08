import React, { Component } from 'react';
import logo from '../img/itrain.png';
import {UncontrolledDropdown,Nav,NavbarBrand,Navbar,NavbarToggler,Collapse,NavItem,NavLink,DropdownToggle,DropdownItem,DropdownMenu} from 'reactstrap'
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle=() => {
    this.setState({isOpen: !this.state.isOpen});
  }
  render() {
    return (
      <header>
      <Navbar color="dark" dark expand="md">
       <NavbarBrand href="/"><img src={logo} className="logo" alt="logo"></img></NavbarBrand>

       <NavbarToggler onClick={this.toggle} />

       <Collapse isOpen={this.state.isOpen} navbar>
         <Nav className="ml-auto" navbar>
           <NavItem>
             <NavLink href="/components/">Components</NavLink>
           </NavItem>
           <NavItem>
             <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
           </NavItem>
           <UncontrolledDropdown nav inNavbar>
             <DropdownToggle nav caret>
               Options
             </DropdownToggle>
             <DropdownMenu right>
               <DropdownItem>
                 Option 1
               </DropdownItem>
               <DropdownItem>
                 Option 2
               </DropdownItem>
               <DropdownItem divider />
               <DropdownItem>
                 Reset
               </DropdownItem>
             </DropdownMenu>
           </UncontrolledDropdown>
         </Nav>
       </Collapse>
      </Navbar>
      </header>
)
}
}

export default NavBar;
