import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import '../css/LocationInfoModal.css'

class LocationInfoModal extends Component {
    render() {
        return (

                        <Modal style={{position: 'fixed'}} centered={true} show={this.props.showModal}
                               onHide={this.props.hideModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.props.selectedPlace.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div className={'modalImageContainer'}>
                                    <Image className={'image locationModalImage'}
                                           src={`${this.props.selectedPlace.image}`} thumbnail/>
                                </div>

                                <p><b> Description: </b> {this.props.selectedPlace.description} </p>
                            <p> {this.props.selectedPlace.address} </p>
                            </Modal.Body>
                            {/*<Modal.Footer>*/}
                            {/*    <Button variant="secondary" onClick={this.props.hideModal}>*/}
                            {/*        Close*/}
                            {/*    </Button>*/}
                            {/*    <Button variant="primary" onClick={this.props.hideModal}>*/}
                            {/*        Get Directions*/}
                            {/*    </Button>*/}
                            {/*</Modal.Footer>*/}
                        </Modal>
        );
    }
}

LocationInfoModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    selectedPlace: PropTypes.object.isRequired,
};

export default LocationInfoModal;
