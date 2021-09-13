import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            dropdownOpen: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    //TODO: Expand for the use of multiple dropdown menus
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">React Showcase</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={(e) => { this.toggle() }}>
                                    <DropdownToggle caret>
                                        Showcases
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>React</DropdownItem>
                                        <DropdownItem tag={Link} to="/showcases/react">Overview</DropdownItem>
                                        <DropdownItem tag={Link} to="/showcases/react/twitter-dragdrop">Twitter + Drag & Drop</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
