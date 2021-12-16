import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
import logo from "../logo.svg"

export default class Navbar extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark px-5 py-4" style= {{ backgroundColor: '#64b5f6', color: 'white', minWidth: '950px'}}>
                <a className="navbar-brand" href="/"> <img src={logo} width="70" height="70" className="d-inline-block mx-3" />Pollution Compass </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Pollution Data</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/data" className="nav-link">Live Compass</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    };
};



