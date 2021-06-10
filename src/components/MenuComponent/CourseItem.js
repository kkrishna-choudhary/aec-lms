import React, { Component } from 'react'
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';
import { Player } from 'video-react';
import { baseUrl } from '../../shared/baseUrl';

class CourseItem extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: 0 };
    }

    toggle (e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === String(event) ? 0 : String(event) });
    }

    render() {
        const { collapse } = this.state;
        const { courseitems } = this.props;

        return (
            <div className="container">
                <h3 className="page-header">Contents</h3>
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
                        </Card>
                    )
                })}

            </div>
        )
    }
}

export default CourseItem;

