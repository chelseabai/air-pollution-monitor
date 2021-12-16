import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.component";
import LiveData from "./components/livedata.component";
import Map from "./components/map.component";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={ <Map /> } />
            </Routes>
            <Routes>
                <Route path="/livedata" element={ <LiveData /> } />
            </Routes>
        </Router>

    )
};

export default App;