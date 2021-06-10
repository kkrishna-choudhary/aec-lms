import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,CardDeck,Button } from 'reactstrap';
import { Loading } from '../CommonComponent/LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';
import RenderCard from '../ReactstrapComponent/CardComponents';
import Example from '../ReactstrapComponent/Carousel';
// function RenderCard({ item, isLoading, errMess, type, passedTitle,  passedSubtitle, passedtext}) {
//     if (isLoading) {
//         return (
//             <Loading />
//         );
//     }
//     else if (errMess) {
//         return (
//             <h4>{errMess}</h4>
//         );
//     } 
//     else
//         if (type=="imagecard") {
//             return (
//                 <FadeTransform in
//                     transformProps={{
//                         exitTransform: 'scale(0.5) translateY(-50%)'
//                     }}>
                       
//                     <Card>
//                         <CardImg src={baseUrl + item.image} alt={item.name} />
//                         <CardBody>
//                             <CardTitle>{item.name}</CardTitle>
//                             {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
//                             <CardText>{item.description}</CardText>
//                         </CardBody>
//                     </Card>
//                 </FadeTransform>
//             );
//         }
//         else if(type=="normal") {
//             return (
//                         <Card body inverse style={{ backgroundColor: '#21094e', borderColor: '#21094e' }}>
//                             <CardBody   className="text-center">
//                                 <CardTitle tag="h4">{passedTitle}</CardTitle>
//                                 <CardSubtitle tag="h6" className="mb-2 text-muted">{passedSubtitle}</CardSubtitle> 
//                                 <CardText>{passedtext}</CardText>
                                
//                             </CardBody>
//                         </Card>                
//             );
//         }
// }

function Home(props) {
   
    return (
        <React.Fragment>
            <div className="container row-gap">
                <div className="row  align-items-start">
                <div className="col-12 text-center">
                    <Example course={props.course}></Example>
                </div>
                </div>
            </div>
        <div className="container row-gap">
            <div className="row  align-items-start">
                <div className="col-12 text-center">
                    <h1 >Don't waste your valuable time or money</h1>
                    <p className="lead">Only AEC-LMS has all the critical factors to deliver real results</p>
                </div>
            </div>
            <div className="row ">
                {/* <div className="col-12 "> */}
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <CardDeck>
                        <RenderCard className="col-12 col-md-3" type="normal" passedTitle="Get real employable skills" passedSubtitle="" passedtext="Our quality curriculum is designed with top-tier industry partners, not academics, so you learn the high-impact skills that top companies want." />
                        <RenderCard className="col-12 col-md-3" type="normal" passedTitle="Project-based active learning" passedSubtitle="" passedtext="Learn by doing with real-world projects and other hands-on exercises that lead to real skills mastery." />
                        <RenderCard className="col-12 col-md-3" type="normal" passedTitle="Learn on your schedule" passedSubtitle="" passedtext="Self-paced learning - whenever and wherever you want. Graduate while learning part-time for 10 hrs/week." />
                        <RenderCard className="col-12 col-md-3" type="normal" passedTitle="The help you need, when you need it" passedSubtitle="" passedtext="Reach out to our mentors 24/7 and have your coding questions answered quickly so you can keep learning." />  
                    </CardDeck>
                </FadeTransform>
                </div>
            
        </div>
        <div className="container">
            <div className="row row-content align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.course}
                        isLoading={props.coursesLoading}
                        errMess={props.coursesErrMess}
                        type="imagecard" />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess}
                        type="imagecard" />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.developer}
                        isLoading={props.developerLoading}
                        errMess={props.developerErrMess}
                        type="imagecard" />
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Home;