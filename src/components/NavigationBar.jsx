import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Button from "react-bootstrap/Button";
import image from '../images/refillrlogo.png'


class NavigationBar extends Component {
        infoButtonClick = (e) => {
        e.preventDefault();
    }


    render() {
        return (
            <div>
                <Navbar className={'navBar'} bg="dark" variant="dark" fixed="top" >
                    <Navbar.Brand href="#home">
                        <img
                            src={image}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt={'navBarImage'}

                        /> Refillr
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button onClick={this.props.showAddLocationModal}> <i className="fa fa-plus"/> </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    showAddLocationModal: PropTypes.func.isRequired,
};

export default NavigationBar;
