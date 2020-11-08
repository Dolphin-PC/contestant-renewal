import React from "react";
import { useState } from "react";
import {
   Collapse,
   Nav,
   Navbar,
   NavbarBrand,
   NavbarToggler,
   NavItem,
} from "reactstrap";

const CommonNavbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   return (
      <div>
         <Navbar color="parent" light expand="lg">
            <NavbarBrand href="/">LOGO</NavbarBrand>
            <NavbarToggler onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <Collapse isOpen={isMenuOpen} navbar>
               <Nav className="mr-auto" navbar>
                  <NavItem>first</NavItem>
                  <NavItem>second</NavItem>
               </Nav>
            </Collapse>
         </Navbar>
      </div>
   );
};

export default CommonNavbar;
