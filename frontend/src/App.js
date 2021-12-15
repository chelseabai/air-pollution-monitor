import React from 'react';
import "bootstrap/dist/css/bootstrap-reboot.min.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.component";
import Homepage from "./components/homepage.component";
import Map from "./components/map.component";
import PollutionLineChart from "./components/linechart.component";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Map />
            {/*<Routes>*/}
            {/*    <Route path="/" element={ <Homepage /> } />*/}
            {/*</Routes>*/}
            <div className="d-flex flex-row" style={{ width:'100vw'}}>
                <PollutionLineChart />
            </div>
        </Router>

    )
};

export default App;

//"proxy": "http://localhost:5000"