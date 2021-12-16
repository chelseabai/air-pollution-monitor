import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import LiveMap from "./livemap.component";

export default class LiveData extends Component{
    render() {
        return (
            <div>
                <LiveMap />
            </div>
        )
    };
};



