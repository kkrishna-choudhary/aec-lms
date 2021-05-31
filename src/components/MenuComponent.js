import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({ course, onClick }) {
        return(
            <Card>
                <Link to={`/menu/${course._id}`} >
                    <CardImg width="100%" src={baseUrl + course.image} alt={course.name} />
                    <CardImgOverlay>
                        <CardTitle>{course.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    const Menu = (props) => {

        const menu = props.courses.courses.map((course) => {
            return (
                <div key={course._id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem course={course} />
                </div>
            );
        });

        if (props.courses.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.courses.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.courses.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
    }

export default Menu;