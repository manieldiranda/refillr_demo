import React, {Component} from 'react';
import {Map, Marker} from "google-maps-react";



const img = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/droplet_1f4a7.png";
const icon = { url: img, scaledSize: { width: 30, height: 30 } };


class CustomMapMarker extends Component {








    render() {
        return (
            <Marker
    name={'Your position'}
    position={{lat: 37.778519, lng: -122.405640}}
    icon={icon} />

        );
    }
}

CustomMapMarker.propTypes = {};

export default CustomMapMarker;
