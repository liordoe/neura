import * as React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    render(): JSX.Element {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Neura</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem componentClass={Link} href="/" to="/" active={location.pathname === '/'}>Nets list</NavItem>
                    <NavItem componentClass={Link} href="/current" to="/current" active={location.pathname === '/current'}>Current using net</NavItem>
                    <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    };
}