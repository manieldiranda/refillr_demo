import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import '../css/PrimaryInfoCard.css'
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import defaultImage from '../images/DefaultImage.jpg'

class MyComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showLocationDetails: false

        }

    }

    expandButtonClick = () => {
        this.setState({
            showLocationDetails: true
        })
    };

     closeButtonClick = () => {
        this.setState({
            showLocationDetails: false
        })
    };


    render() {
        return (
            <div
                className={`cardContainer ` + `${this.props.markerSelected ? ("markerSelected") : ("markerNotSelected")}` +  ' ' + `${this.state.showLocationDetails ? ("detailsExpanded") : ("detailsNotExpanded")}` }>
                <Card className={'primaryInfoCard'}>
                    <Card.Header className={'primaryInfoCardHeader'}>
                        <div className={'col-9'}>
                            <h3> {this.props.selectedPlace.name}</h3>
                            <p className={'addressText'}> {this.props.selectedPlace.address} </p>

                        </div>
                        <div className={' locationInfoButton col-3'}>



                            {this.state.showLocationDetails === true ? (  <Button
                                className={"modalInfoButton"}
                                type="button"
                                onClick={this.closeButtonClick}
                            >
                                <i className={"fa fa-arrow-down"}/>
                            </Button>) : (  <Button
                                className={"modalInfoButton"}
                                type="button"
                                onClick={this.expandButtonClick}
                            >
                                <i className={"fa fa-arrow-up"}/>
                            </Button>)}

                        </div>
                    </Card.Header>
                    <div className={`${this.state.showLocationDetails ? ("cardDetailsExpanded") : ("cardDetailsHidden")}` }>
                        <Card.Body className={'cardDetailBody'}>
                            <div className={'modalImageContainer'}>

                                <Image className={'image locationModalImage'}
                                       fluid

                                src={`${this.props.selectedPlace.image === null ? (defaultImage) : (`${this.props.selectedPlace.image}`)}`}

                                />

                            </div>

                            <p><b> Description: </b> {this.props.selectedPlace.description} </p>
                        </Card.Body>
                        <Card.Footer className={'cardFooter'}>
                            {/*<Button className={'footerButton'} variant="secondary" onClick={this.closeButtonClick}>*/}
                            {/*    Close*/}
                            {/*</Button>*/}
                            {/*<Button className={'footerButton'} variant="primary" onClick={this.props.hideModal}>*/}
                            {/*    Get Directions*/}
                            {/*</Button>*/}
                        </Card.Footer>
                    </div>

                </Card>

            </div>
        );
    }
}

MyComponent.propTypes = {};

export default MyComponent;
