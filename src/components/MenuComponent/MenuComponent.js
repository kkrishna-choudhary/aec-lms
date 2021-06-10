import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardText, CardDeck} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../CommonComponent/LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import RenderCard from '../ReactstrapComponent/CardComponents';

import {
    Button, Modal, ModalHeader, ModalBody,
    Label, Col, Row
} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


    function RenderMenuItem({ course, onClick }) {
        return(
            // <Card>
            //     <Link to={`/menu/${course._id}`} >
            //         <CardImg width="100%" src={baseUrl + course.image} alt={course.name} />
            //         <CardImgOverlay>
            //             <CardTitle>{course.name}</CardTitle>
            //         </CardImgOverlay>
            //     </Link>
            // </Card>
            <Link to={`/menu/${course._id}`} >
                <RenderCard course={course} 
                        type="imageoverlayCard"  />
                
            </Link> 
        );
    }

    class Menu extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isAddCourseModalOpen: false,
                selectedFile: null 
            };
           
        }

        fileChangedHandler = (event) => {
            this.setState({ selectedFile: event.target.files[0] })
        }

        uploadHandler = () => {
            console.log(this.state.selectedFile);
            
            this.props.postImageUpload(this.state.selectedFile);
          
        }

        toggleAddCourseModal = () => {        
            this.setState({
                isAddCourseModalOpen: !this.state.isAddCourseModalOpen
            });
        }
    
    
    
    
        handleAddCourseSubmit = (values) => {
            this.toggleAddCourseModal();
            console.log("Current State is: " + JSON.stringify(values));
            this.props.postAddCourse(values);
            this.props.resetAddCourseForm();
    
        }

        render(){
            const menu = this.props.courses.courses.map((course) => {
                return (
                    <div key={course._id} className="col-12 col-md-3 mb-2 ">
                  
                        <RenderMenuItem course={course} />
                 
                    </div>
                );
            });

            if (this.props.courses.isLoading) {
                return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (this.props.courses.errMess) {
                return(
                    <div className="container">
                        <div className="row">
                            <h4>{this.props.courses.errMess}</h4>
                        </div>
                    </div>
                );
            }
            
        else
        return (
            <div className="container">
                <div className="row ">
                    <Breadcrumb className="col-12">
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <div className="row">
                            <h3 className="col-10">Menu</h3>
                          

                            {  !this.props.auth.isAuthenticated
                                     ?
                                       <div>notauthenticated</div>
                                        :
                                       
                                            ( !this.props.user.admin?<div>false</div>
                                                :   <div>
                                                    <Button outline onClick={this.toggleAddCourseModal} >
                                                        Add New Course
                                                        </Button>
                                                     </div>)
                            }                                
                        
                                
                        </div>                           
                        <hr />
                    </div>
                   
                </div>
                <div className="row justify-content-center">                       
                    {menu}               
                </div>
                <Modal isOpen={this.state.isAddCourseModalOpen} toggle={this.toggleAddCourseModal}>
                    <ModalHeader className="model-headercolor" toggle={this.toggleAddCourseModal}>AddCourse</ModalHeader>
                    <ModalBody>

                        <div className="row row-content align-items-center model-bodycolor">
                            <div className="col-12  ">
                                <Form model="signup" onSubmit={(values) => this.handleAddCourseSubmit(values)}>
                                    <Row className="form-group  justify-center" >
                                        <Label htmlFor="label" md={4} >Label</Label>
                                        <Col md={8}  >
                                            <Control.text model=".label" id="label" name="label"
                                                placeholder="Label"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(10)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".label"
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
                                        <Label htmlFor="featured" md={4} >Featured</Label>
                                        <Col md={8} >
                                            <Control.select model=".featured" name="featured"
                                                className="form-control">
                                                <option>true</option>
                                                <option>false</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="name" md={4}>Name</Label>
                                        <Col md={8}>
                                            <Control.text model=".name" id="name" name="name"
                                                placeholder="Name"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(10)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".name"
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
                                <Label htmlFor="courseDuration" md={4}>Course Duration</Label>
                                <Col md={8}>
                                    <Control.text model=".courseDuration" id="courseDuration" name="courseDuration"
                                        placeholder="Course Duration"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".courseDuration"
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
                                <Label htmlFor="category" md={4}>Category</Label>
                                <Col md={8}>
                                    <Control.text model=".category" id="category" name="category"
                                        placeholder="Category"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".category"
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
                                <Label htmlFor="fee" md={4}>Fee</Label>
                                <Col md={8}>
                                    <Control.text model=".fee" id="fee" name="fee"
                                        placeholder="Fee"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".fee"
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
                                <Label htmlFor="description" md={4}>Description</Label>
                                <Col md={8}>
                                    <Control.text model=".description" id="description" name="description"
                                        placeholder="Description"
                                        className="form-control"
                                        
                                         />
                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="image" md={4}>Image</Label>
                                <Col md={8}>
                                    <Control.text model=".image" id="image" name="image"
                                        placeholder="Image"
                                        className="form-control"
                                       
                                         />
                                    
                                </Col>
                            </Row>
                            <Row className="m-3" offset={1}>
                            <input type="file" onChange={this.fileChangedHandler}></input>
                            <Button onClick={this.uploadHandler}>Upload!</Button>
                            
                            </Row>
                              
                                    <Row className="form-group">
                                        <Col >
                                            <Button type="submit" className="model-headercolor float-right">
                                                Add Course
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>

                            
                                
                            </div>
                            
                        </div>
                        

                    </ModalBody>
                </Modal>



            </div>
        );

        }

    }

export default Menu;