import React, { Component } from 'react'
import { Collapse, CardBody, Card, CardHeader, Button,CardFooter } from 'reactstrap';
import { Player } from 'video-react';
import { baseUrl } from '../../shared/baseUrl';
import {
    Label,
    Modal, ModalHeader, ModalBody, Row, Col
} from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';


class CourseItem extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: 0,
            isAddCourseItemModalOpen: false,
            selectedFile: null
        };

        this.toggleAddCourseItemModal = this.toggleAddCourseItemModal.bind(this);
    }

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === String(event) ? 0 : String(event) });
    }

    videoFileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadVideoHandler = () => {
        console.log(this.state.selectedFile);

        this.props.postVideoUpload(this.state.selectedFile);

    }

    toggleAddCourseItemModal() {

        console.log("toggleAddCourseItem");
        this.setState({
            isAddCourseItemModalOpen: !this.state.isAddCourseItemModalOpen
        });
    }




    handleAddCourseItemSubmit = (values) => {
        this.toggleAddCourseItemModal();
        console.log("Current State is: " + JSON.stringify(values) + this.props.courseId);
        this.props.postAddCourseItem(this.props.courseId, values.video, values.title, values.duration);


    }

    render() {
        const { collapse } = this.state;
        const { courseitems } = this.props;

        return (
            <div className="container">
                <div className="row mb-auto">
                    <h3 className="page-header">Contents</h3>
                    <div className="ml-auto">
                        {!this.props.auth.isAuthenticated
                            ?
                            <div>notauthenticated</div>
                            :

                            (!this.props.user.admin ? <div>false</div>
                                : <div>
                                    <Button outline onClick={this.toggleAddCourseItemModal} >
                                        Add New CourseItem
                                    </Button>
                                </div>)
                        }
                    </div>
                    <Modal isOpen={this.state.isAddCourseItemModalOpen} toggle={this.toggleAddCourseItemModal}>
                        <ModalHeader toggle={this.toggleAddCourseItemModal}>Submit CourseItem</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleAddCourseItemSubmit(values)}>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="video">Video</Label>
                                        <Control.text model=".video" id="video" name="video"
                                                placeholder="Video"
                                                className="form-control"
                                                
                                            />
                                    </Col>
                                </Row>
                                <Row className="m-3" offset={1}>
                            <input type="file" onChange={this.videoFileChangedHandler}></input>
                            <Button onClick={this.uploadVideoHandler}>Upload!</Button>
                            
                            </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="title">Title</Label>
                                        <Control.text model=".title" id="title" name="title"
                                                placeholder="Title"
                                                className="form-control"
                                                
                                            />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="duration">Duration</Label>
                                        <Control.text model=".duration" id="duration" name="duration"
                                                placeholder="Duration"
                                                className="form-control"
                                                
                                            />
                                    </Col>
                                </Row>
                                <Button type="submit" className="bg-primary">
                                    Post CourseItem
                                </Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
                <hr></hr>
                <div className="m-2">
                    {courseitems.map(item => {
                        return (
                            <Card style={{ marginBottom: '1rem' }} key={item._id}>
                                <CardHeader onClick={this.toggle} data-event={item._id}>{item.title}</CardHeader>
                                <Collapse isOpen={collapse === item._id}>
                                    <CardBody >
                                        <Player

                                            playsInlines
                                            src={baseUrl + item.video}
                                            fluid={false}
                                            width={480}
                                            height={272}
                                        />
                                    </CardBody>
                                </Collapse>


                                {!this.props.auth.isAuthenticated
                                    ?
                                    <div></div>
                                    :

                                    (!this.props.user.admin ? <div></div>
                                        : <CardFooter>
                                            <Button className = "ml-auto" outline color="danger" onClick={()=>{this.props.deleteCourseItem(item._id)}}>
                                                <span className="fa fa-times"></span>
                                            </Button>
                                        </CardFooter>)
                                }

                            </Card>
                        )
                    })}
                </div>






            </div>
        )
    }
}

export default CourseItem;

