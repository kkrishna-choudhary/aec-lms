import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Label, Col, Row
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isSignupModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLoginModal() {
        if(this.state.isSignupModalOpen){
            this.setState({
                isSignupModalOpen: !this.state.isSignupModalOpen});
        }
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    toggleSignupModal() {
        if(this.state.isLoginModalOpen){
            this.setState({
                isLoginModalOpen: !this.state.isLoginModalOpen});
        }
        this.setState({
            isSignupModalOpen: !this.state.isSignupModalOpen
        });
    }


    handleLoginSubmit = (values) => {
        this.toggleLoginModal();
        console.log("Current State is: " + JSON.stringify(values));
        this.props.loginUser(values);
        this.props.resetLoginForm();

    }

    handleSignupSubmit = (values) => {
        this.toggleSignupModal();
        console.log("Current State is: " + JSON.stringify(values));
        this.props.signupUser(values);
        console.log(this.props.signupStatus);
        this.props.resetSignupForm();

    }



    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark fixed="top" expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41"
                                alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"></span> My Favorites
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {!this.props.auth.isAuthenticated ?
                                        <div>
                                            <Button outline onClick={this.toggleLoginModal}>
                                                <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-8">
                                <h1 >The latest digital skills, within reach.</h1>
                                <p className="lead">Discover the fastest, most effective way to gain job-ready expertise for the careers of the future.</p>
                            </div>
                            <div className="col-12 col-sm-4">
                            <img src="assets/images/4.png" alt="" className="img-fluid" />
                        </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader className="model-headercolor" toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody >

                        <div className="row row-content model-bodycolor  ">

                            <div className="col-12 align-items-center">
                                <Form model="login" onSubmit={(values) => this.handleLoginSubmit(values)}>
                                    <Row className="form-group justify-centre ">
                                        <Label htmlFor="username" md={4} >Username</Label>
                                        <Col md={8} >
                                            <Control.text model=".username" id="username" name="username"
                                                placeholder="Username"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(10)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".username"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 10 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="password" md={4}>Password</Label>
                                        <Col md={8}>
                                            <Control.text model=".password" id="password" name="password"
                                                placeholder="Password"
                                                className="form-control"
                                                type='password'
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(10)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".password"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 10 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Col >
                                            <Button  type="submit"  className="model-headercolor float-right">
                                                Login
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <hr />
                                <Button  className="model-bodycolor justify-content-end" onClick={this.toggleSignupModal}>Signup</Button>
                            </div>
                        </div>
                   
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader className="model-headercolor" toggle={this.toggleSignupModal}>Signup</ModalHeader>
                    <ModalBody>

                        <div className="row row-content align-items-center model-bodycolor">
                            <div className="col-12  ">
                                <Form model="signup" onSubmit={(values) => this.handleSignupSubmit(values)}>
                                    <Row className="form-group  justify-center" >
                                        <Label htmlFor="username" md={4} >Username</Label>
                                        <Col md={8}  >
                                            <Control.text model=".username" id="username" name="username"
                                                placeholder="Username"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(10)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".username"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 10 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="password" md={4}>Password</Label>
                                        <Col md={8}>
                                            <Control.text model=".password" id="password" name="password"
                                                placeholder="Password"
                                                className="form-control"
                                                type='password'
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(10)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".password"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 10 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                <Label htmlFor="firstname" md={4}>Firstname</Label>
                                <Col md={8}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={4}>Lastname</Label>
                                <Col md={8}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                                    <Row className="form-group">
                                        <Col >
                                            <Button type="submit" className="model-headercolor float-right">
                                                Signup
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <hr/>
                                <Button className="model-bodycolor" onClick= {this.toggleLoginModal}>Login</Button>
                            </div>
                        </div>

                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;