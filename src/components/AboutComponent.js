import React from 'react';
import {  Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Loading } from './CommonComponent/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function RenderDeveloper({developer}) {
    return(
        <Media tag="li">
            <Media lef>
                <Media height="125px" width="125px" object src={baseUrl + developer.image} alt={developer.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{developer.name}</Media>
                <p>{developer.designation}</p>
                <p>{developer.description}</p>
            </Media>
        </Media>
    );

}

function DeveloperList(props) {

    const developers = props.developers.developers.map((developer) => {
        return (
            <Fade in key={developer._id}>
                <div className="col-12 mt-2">
                        <RenderDeveloper developer={developer} />
                </div>
            </Fade>
        );
    });

    if (props.developers.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.developers.errMess) {
        return(
            <div className="col-12"> 
                <h4>{props.developers.errMess}</h4>
            </div>
        );
    }
    else {
        return (
            <Media list>
                <Stagger in>
                    {developers}
                </Stagger>
            </Media>
        );
    }
}

function About(props) {

    return(
        <div className="container">
            
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Aec-LMS was founded in 2021 by Asansol Engineering College Information Technology students Gurpreet Singh, Krishna Kumar Choudhary, Ashutosh Bharati and Sandeep Kumar Mondal. Sandip Mondal started offering his courses online in fall 2020, and soon after left Youtube to launch Aec-LMS with fellow developers.</p>
                    <p>Aec-LMS courses last approximately four to twelve weeks, with one to two hours of video lectures a week. These courses provide quizzes and sometimes a final project or exam to complete the course. Courses are also provided on-demand, in which case users can take their time in completing the course with all of the material available at once. </p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Oct. 2020</dd>
                                
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">4</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0"> “Education is the most powerful weapon which you can use to change the world”</p>
                                <footer className="blockquote-footer"> Nelson Mandela,
                                <cite title="Source Title">The Wit and Wisdom of Nelson Mandela,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Our Team</h2>
                </div>
                <DeveloperList developers={props.developers} />
            </div>
        </div>
    );
}

export default About;    