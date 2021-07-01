import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from '../CommonComponent/LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Player } from 'video-react';
import CourseItem from './CourseItem';

    function RenderCourse({course, favorite, postFavorite}) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card key={course._id} >
                            <CardImg className="heightissue" top src={baseUrl + course.image} alt={course.name} />
                            <CardImgOverlay>
                                <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(course._id)}>
                                    {favorite ?
                                        <span className="fa fa-heart"></span>
                                        : 
                                        <span className="fa fa-heart-o"></span>
                                    }
                                </Button>
                            </CardImgOverlay>
                            <CardBody>
                                <CardTitle>{course.name}</CardTitle>
                                <CardText>{course.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );

    }

    function RenderComments({comments, postComment, courseId}) {
        if (comments != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in key={comment._id}>
                                        <li>
                                        <p>{comment.comment}</p>
                                        <p>{comment.rating} stars</p>
                                        <p>-- {comment.author.firstname} {comment.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.updatedAt)))}</p>
                                        <hr/>
                                        </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm courseId={courseId} postComment={postComment} />
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderCourseItem({ courseItems, course }) {
        if (courseItems != null) {
            const rate = courseItems.map((courseItem) => {
                return (
                    <div key={courseItem._id} className="mb-5   " >
                        
                        <Player 
                            playsInlines
                            poster={baseUrl + course.image}
                            src={baseUrl + courseItem.video}
                            fluid={false}
                            width={480}
                            height={272}
    
                        />
                    </div>
                );
            });
    
            return (
                <div>
                    <Stagger in>
                        <h4>Contents</h4>
                        <Fade in>                  
                            {rate}                  
                        </Fade>
                    </Stagger>
    
                </div >
            );
        } else {
            return (
                <div>
                    <div></div>
                </div>
            );
        }
    }

    class CommentForm extends Component {

        constructor(props) {
            super(props);
    
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
            this.state = {
              isNavOpen: false,
              isModalOpen: false
            };
        }
    
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.courseId, values.rating, values.comment);
        }
    
        render() {
            return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" className="bg-primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
               </Modal>
            </div>
            );
        }
    
    }

    const CourseDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.course != null)        
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.course.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <div className="row">
                            <h3 className="col-10">{props.course.name}</h3>   
                        </div>                           
                        <hr />
                    </div>
                    </div>
                    <div className="row">
                        <RenderCourse course={props.course} favorite={props.favorite} postFavorite={props.postFavorite} />
                        <div className="col-12 col-md-5 ">{props.course.description}</div>
                    </div>

                    
                    <div className="row row-gap ">
                        {/* <div className="col-12 offset-3 col-md-6">
                            <RenderCourseItem courseItems={props.courseItems} course={props.course} />
                        </div> */}
                        
                            <CourseItem  courseId={props.course._id} courseitems={props.courseItems}  auth={props.auth} user={props.user} postAddCourseItem={props.postAddCourseItem}     postVideoUpload={props.postVideoUpload}  deleteCourseItem={props.deleteCourseItem} ></CourseItem>
                       
                    </div>
                    <div className="row " >
                        <div className="col-12">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            courseId={props.course._id} />
                        </div>
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

export default CourseDetail;