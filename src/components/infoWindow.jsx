// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import Button from "react-bootstrap/Button";
// import {InfoWindow} from "google-maps-react";
//
// class CustomInfoWindow extends Component {
//
//   constructor(props) {
//     super(props);
//     this.infoWindowRef = React.createRef();
//     this.contentElement = document.createElement(`div`);
//   }
//
//
//
//         infoButtonClick = (e) => {
//             e.stopPropagation();
//         console.log("INFOBUTTONCLICKED");
//     }
//
//     componentDidUpdate(prevProps) {
//     if (this.props.children !== prevProps.children) {
//       ReactDOM.render(
//         React.Children.only(this.props.children),
//         this.contentElement
//       );
//       this.infoWindowRef.current.infowindow.setContent(this.contentElement);
//     }
//   }
//
//
//     render() {
//         return (
//           <div onClick={()=>{alert('hello')}} className={"markerInfo"}>
//               <h5>{this.props.selectedPlace}  </h5>
//                <Button  onClick={()=>{alert('hello')}}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//                <Button onClick={this.infoButtonClick}> <i className="fa fa-info-circle"/> </Button>
//
//
//             </div>
//         );
//     }
// }
//
// CustomInfoWindow.propTypes = {};
//
// export default CustomInfoWindow;
