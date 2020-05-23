import React, {Component} from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Map, Marker} from "google-maps-react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../css/AddLocationModal.css";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import img from '../images/pin.png';
import Alert from 'react-bootstrap/Alert'

const icon = {url: img, scaledSize: {width: 60, height: 60}};
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;


const mapStyles = [
    {marginTop: "50px"},
    {position: "fixed"},
    {elementType: "geometry", stylers: [{color: "#242f3e"}]},
    {elementType: "labels.text.stroke", stylers: [{color: "#242f3e"}]},
    {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{color: "#d59563"}]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{color: "#d59563"}]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{color: "#263c3f"}]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{color: "#6b9a76"}]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{color: "#38414e"}]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{color: "#212a37"}]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{color: "#9ca5b3"}]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{color: "#746855"}]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{color: "#1f2835"}]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{color: "#f3d19c"}]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{color: "#2f3948"}]
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{color: "#d59563"}]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{color: "#17263c"}]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{color: "#515c6d"}]
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{color: "#17263c"}]
    }
];

class AddLocationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            inputFormVisible: false,
            position: {
                lat: 37.750615,
                lng: -121.43841
            },
            //placeholder coordinates
            newPosition: {
                lat: 37.750615,
                lng: -121.43841
            },
            formInvalid: false,
            name: "",
            description: ""
        };
    }

    /*
     * image handler functions
     *
     * clearImage: clears currently selected image
     * infoImage: renders image information text
     * selectImage: sets image as currently selected image
     * renderImage: renders currently selected image
     *
     */
    clearImage = () => this.setState({image: null});

    infoImage = () => {
        const {image} = this.state;
        return image ? `${image.path} - ${Math.round(image.size / 1000)}kb` : "";
    };

    selectImage = images => {

        this.setState({image: images[0]});
    };

    renderImage = () => {
        const {image} = this.state;
        return (
            <div>
                <img className="uploadImage" src={URL.createObjectURL(image)} alt={'locationUploadModal'}/>
            </div>
        );
    };

    selectNewLocationMarker = () => {
        this.getAddressFromCoordinates();
        this.setState({
            inputFormVisible: true
        });
    };

    cancelModal = () => {
        this.clearImage();
        this.setState({inputFormVisible: false, name: '', description: '', formInvalid: false});
        this.props.hideAddLocationModal();
    };


    newLocationMarkerDragEnd = (props, marker) => {
        const lat = marker.position.lat();
        const lng = marker.position.lng();


        this.setState({
            position: {
                lat: lat,
                lng: lng
            },
            newPosition: {
                lat: lat,
                lng: lng
            }
        })

    }


    formChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })

    };


    getAddressFromCoordinates = () => {
        let gmapsReverseSearchUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.newPosition.lat},${this.state.newPosition.lng}&key=AIzaSyDAXwDfdGmeraVw0pw0PuMG1NgZycRtDBc`
        axios.get(gmapsReverseSearchUrl)
            .then(res => {
                const newLocationData = res.data;
                this.setState({
                    newLocationAddress: newLocationData.results[0].formatted_address
                })


            })

    }


    submitNewLocationForm = () => {


        if (this.state.name === "") {
            this.setState({
                formInvalid: true
            })
        } else {

            this.setState({
                    formInvalid: false
                }
            );


            {
                this.state.image === null ? (
                        this.submitFormWithoutImage()
                    ) :
                    (this.submitFormWithImage())
            }
        }


    };


    submitFormWithImage = () => {

        let form_data = new FormData();
        form_data.append('image', this.state.image);
        form_data.append('name', this.state.name);
        form_data.append('description', this.state.description);
        form_data.append('latitude', this.state.newPosition.lat);
        form_data.append('longitude', this.state.newPosition.lng);
        form_data.append('address', this.state.newLocationAddress);
        let url = `${BASE_API_URL}/locations/`;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                this.cancelModal();
                this.props.refreshLocations();
                this.setState({
                    name: "",
                    description: ""
                })
            })
            .catch(err => console.log(err))
    };


    submitFormWithoutImage = () => {

        axios.post(`${BASE_API_URL}/locations/`, {
            "name": this.state.name,
            "description": this.state.description,
            "latitude": this.state.newPosition.lat,
            "longitude": this.state.newPosition.lng,
            "address": this.state.newLocationAddress
        })
            .then(res => {
                this.cancelModal();
                this.props.refreshLocations();
                this.setState({
                    name: "",
                    description: ""
                })

            })
            .catch(function (error) {
            });


    };


    render() {
        return (
            <Modal
                className={"addLocationModal"}
                style={{position: "fixed"}}
                centered={true}
                show={this.props.showAddLocationModal}
                onHide={this.cancelModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a fountain location</Modal.Title>
                </Modal.Header>

                {this.state.inputFormVisible === true ? (
                    <div>
                        <Modal.Body>


                            <Form>
                                <Form.Label>
                                    <b>Location Name </b>
                                </Form.Label>
                                <Form.Control onChange={this.formChange} name={"name"}
                                              placeholder="Enter Location Name"
                                />

                                {this.state.image ? (
                                    this.renderImage()
                                ) : (
                                    <ImageUploader selectImage={this.selectImage}/>
                                )}

                                <div className="uploadImageForm">
                                    <div className="uploadImageFile">{this.infoImage()}</div>
                                    <Button
                                        className="uploadImageBtn"
                                        variant="light"
                                        size="sm"
                                        onClick={this.clearImage}
                                    >
                                        Remove Image
                                    </Button>
                                </div>

                                <p>
                                    {" "}
                                    <b>Optional:</b> Add a image of the water fountain
                                </p>

                                <Form.Label>
                                    {" "}
                                    <b>Location Description</b>{" "}
                                </Form.Label>
                                <Form.Control
                                    name={"description"}
                                    onChange={this.formChange}
                                    rows="2"
                                    placeholder="Enter a short description of where the fountain is located"
                                    // isInvalid{this.state.}
                                />


                            </Form>


                            <Alert show={this.state.formInvalid} variant="danger formAlert">
                                <p> Please enter both a location name and description</p>


                            </Alert>

                        </Modal.Body>
                        < Modal.Footer>
                            <div className={"addLocationModalButtons"}>
                                <Button
                                    variant="danger"
                                    className={"cancelAddLocationButton"}
                                    onClick={this.cancelModal}
                                >
                                    <i className="fa fa-times"/>
                                </Button>
                                <Button
                                    variant="success"
                                    className={"submitAddLocationButton"}
                                    onClick={this.submitNewLocationForm}
                                >
                                    <i className="fa fa-check"/>
                                </Button>
                            </div>
                        </Modal.Footer>
                    </div>

                ) : (
                    <div>
                        <Modal.Body>

                            <Card className={"addLocationMapContainer"}>
                                <Map
                                    className={"mapContainer"}
                                    mapTypeControl={false}
                                    zoomControl={false}
                                    streetViewControl={false}
                                    google={this.props.google}
                                    zoom={18}
                                    styles={mapStyles}
                                    initialCenter={this.props.currentLocation}
                                    gestureHandling={"greedy"}
                                >
                                    <Marker
                                        position={this.props.currentLocation}
                                        draggable={true}
                                        onDragend={this.newLocationMarkerDragEnd}
                                        name={"mapMarker"}
                                        icon={icon}

                                    />
                                </Map>


                            </Card>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className={"addLocationModalButtons"}>
                                <Button
                                    variant="danger"
                                    className={"cancelAddLocationButton"}
                                    onClick={this.cancelModal}
                                >
                                    <i className="fa fa-times"/>
                                </Button>
                                <Button
                                    variant="success"
                                    className={"submitAddLocationButton"}
                                    onClick={this.selectNewLocationMarker}
                                >
                                    <i className="fa fa-check"/>
                                </Button>
                            </div>
                        </Modal.Footer>
                    </div>
                )}


            </Modal>
        );
    }
}

AddLocationModal.propTypes = {
    addLocation: PropTypes.func.isRequired,
    showAddLocationModal: PropTypes.bool.isRequired,
    hideAddLocationModal: PropTypes.func.isRequired
};

export default AddLocationModal;
