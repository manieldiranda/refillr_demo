import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import '../css/Map.css'
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import '../css/Marker.css';
import Button from "react-bootstrap/Button";
import InfoWindowEx from './InfoWindowEx';
import LocationInfoModal from "./LocationInfoModal";
import AddLocationModal from "./AddLocationModal";
import PrimaryInfoCard from './PrimaryInfoCard';
import highlightedImg from '../images/highlightedPin.png'
import img from '../images/pin.png'
import currentLocationPin from '../images/currentLocationPin.png'
const icon = {url: img, scaledSize: {width: 60, height: 60}};
const highlightedIcon = {url: highlightedImg, scaledSize: {width: 60, height: 60}};
const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const mapStyles =

    [{marginTop: "50px"},
        {position: 'fixed'},
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
    ]

;

class GoogleMap extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},
            locations: [],//Shows the infoWindow to the selected place upon a marker
            showModal: false,
            showAddLocationModal: false,
            markerSelected: false

        }

    }


    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            // showingInfoWindow: true,
            markerSelected:true
        });


    };



    onCardClick = (name, latitude, longitude, image, description, address) => {
        let selectedCard = {
            name: name,
            position:{
                lat:latitude,
                lng:longitude
            },
            image:image,
            description:description,
            address:address
        }

        // console.log(selectedCard)


        this.setState({
            selectedPlace: selectedCard,
            // activeMarker: 1,
            showingInfoWindow: true
        });

    };



    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    infoButtonClick = (e) => {
        e.preventDefault();
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }


    hideModal = () => {
        this.setState({
            showModal: false
        })
    }

    offMarkerClick = () => {
        this.setState({
            markerSelected:false,
            activeMarker: {}
        })
    }



    cancelAddNewLocation = () => {
        this.props.hideAddLocationModal();
        this.setState({
            inputFormVisible: false
        })
    }


    render() {
        return (
            <div>
                <Card className={'yee'}>
                    <Map className={'mapContainer'}
                         mapTypeControl={false}
                         zoomControl={false}
                         streetViewControl={false}
                         google={this.props.google}
                         zoom={18}
                         styles={mapStyles}
                         // initialCenter={this.props.currentLocation}
                         gestureHandling={'greedy'}
                         // centerAroundCurrentLocation={true}
                         onClick={this.offMarkerClick}
                    >
                        {this.props.locations.map(location => {
                            const {name, latitude, longitude, image, description, address} = location;

                            return (
                                <Marker
                                    name={name}
                                    position={{
                                        lat: [latitude],
                                        lng: [longitude]
                                    }}
                                    image={image}
                                    icon={this.state.activeMarker.address === address ? highlightedIcon : icon}
                                    key={name}
                                    description={description}
                                    address={address}
                                    onClick={this.onMarkerClick}

                                />
                            )
                        })
                        }

                        {this.props.currentLocation === undefined ? (null) : (<Marker
                            position={{
                                lat: this.props.currentLocation.lat,
                                lng: this.props.currentLocation.lng
                            }}
                            icon={currentLocationPin}

                        />)}

                        <InfoWindowEx
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                        >
                            <div className={'infoWindowContents'}>
                                <h3>{this.state.selectedPlace.name}</h3>
                                <Button
                                    className={"modalInfoButton"}
                                    type="button"
                                    // onClick={this.showDetails.bind(this, this.state.selectedPlace)}
                                    onClick={this.showModal}
                                >
                                    <i className="fa fa-info"/>
                                </Button>
                            </div>
                        </InfoWindowEx>

                        <LocationInfoModal
                            showModal={this.state.showModal}
                            hideModal={this.hideModal}
                            selectedPlace={this.state.selectedPlace}
                        />
                        <AddLocationModal
                            addLocation={this.props.addLocation}
                            showAddLocationModal={this.props.showAddLocationModal}
                            hideAddLocationModal={this.props.hideAddLocationModal}
                            currentLocation={this.props.currentLocation}
                            refreshLocations={this.props.refreshLocations}
                        />

                    </Map>
                </Card>
                <PrimaryInfoCard
                    markerSelected={this.state.markerSelected}
                    selectedPlace={this.state.selectedPlace}
                    showModal={this.showModal}
                />

            </div>
        );
    }
}

GoogleMap.propTypes = {
    addLocation: PropTypes.func.isRequired,
    showAddLocationModal: PropTypes.bool.isRequired,
    hideAddLocationModal: PropTypes.func.isRequired,
};

export default GoogleApiWrapper({
    apiKey: MAPS_API_KEY
})(GoogleMap);
