import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
    }

    /**
     * Toggles the dropdown menu
     * TODO: Expand for use with multiple dropdowns
     * */
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Steven Nolles' Showcase</NavbarBrand>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={(e) => { this.toggle() }}>
                                    <DropdownToggle caret>
                                        Showcases
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag={Link} to="/showcases/react">React</DropdownItem>
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
