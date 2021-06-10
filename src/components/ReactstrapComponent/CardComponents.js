import react from 'react';
import { Loading } from '../CommonComponent/LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,CardDeck,CardFooter,CardImgOverlay } from 'reactstrap';

function RenderCard({ item, isLoading, errMess, type, passedTitle,  passedSubtitle, passedtext, course}) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    } 
    else
        if (type=="imagecard") {
            return (
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
    else if(type=="normal") {
        return (
                    <Card body inverse style={{ backgroundColor: '#21094e', borderColor: '#21094e' }}>
                        <CardBody   className="text-center">
                            <CardTitle  tag="h4">{passedTitle}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-3 text-muted">{passedSubtitle}</CardSubtitle> 
                            <CardText>{passedtext}</CardText>
                            
                        </CardBody>
                    </Card>                
        );
    }
    else if(type=="imageoverlayCard"){
        return (
            <Card >
            
        <CardImg className="heightissue"  src={baseUrl + course.image} alt="Card image cap" />
        <CardImgOverlay>
        
        </CardImgOverlay>
        <CardFooter tag="h5" className="text-center model-bodycolor">{course.name}</CardFooter>
      </Card>            
        );
    }
}
export default RenderCard;