import React, {Component} from 'react';
import '../css/AppContainer.css';
import Map from "./Map";
import NavigationBar from "./NavigationBar";
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;


class AppContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            selectedPlace: {},
            locations: [],//Shows the infoWindow to the selected place upon a marker
            showAddLocationModal: false,
            isLoading: false
        }

    }

    componentDidMount() {

        // FUNCTION TO GET THE CURRENT LOCATION OF THE USER
        // COMMENTED OUT THOUGH BECAUSE ITS DEMOING SAN FRANCISCO
        // navigator.geolocation.getCurrentPosition((pos) => {
        //     const coords = pos.coords;
        //     this.setState({
        //         currentLocation: {
        //             lat: coords.latitude,
        //             lng: coords.longitude
        //         }
        //     })
        // })

        this.getMarkerData();
    }


    getMarkerData = () => {

        axios.get(`${BASE_API_URL}/locations/`)
            .then(res => {
                const locationdata = res.data;
                this.setState({
                    locations: locationdata,
                    isLoading: false
                });

            })

    };

    showModal = () => {
        this.setState({
            showModal: true
        })
    };

    hideModal = () => {
        this.setState({
            showModal: false
        })
    };


    addLocation = (location) => {
        this.setState(prevState => ({locations: [...prevState.locations, location]}))
    };

    showAddLocationModal = () => {
        this.setState({
            showAddLocationModal: true
        })
    };

    hideAddLocationModal = () => {
        this.setState({
            showAddLocationModal: false
        })
    };


    render() {
        return (
            <div>
                <NavigationBar
                    showAddLocationModal={this.showAddLocationModal}
                />

                {this.state.isLoading === true ? (
                    <Card className={'loadingScreenContainer'}>
                        <Spinner animation="grow" variant="primary"/>
                        <h6> Loading...</h6>
                    </Card>
                ) : (
                    <div>
                        <Map
                            locations={this.state.locations}
                            addLocation={this.addLocation}
                            showAddLocationModal={this.state.showAddLocationModal}
                            hideAddLocationModal={this.hideAddLocationModal}
                            currentLocation={this.state.currentLocation}
                            refreshLocations={this.getMarkerData}
                        />

                    </div>

                )}
            </div>
        );
    }
}

AppContainer.propTypes = {};

export default AppContainer;
