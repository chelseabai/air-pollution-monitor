import React, { useRef, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import mapboxgl from '!mapbox-gl';
import SensorLineChart from "./sensorlinechart.component";
import axios from "axios";

/* eslint import/no-webpack-loader-syntax: off */
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWJhaSIsImEiOiJja3c4bmd1cXEyNGN2MnZwNjA5NHp6a3VoIn0.qRC3hNMfVycvR6HS4yH6PQ';

export default function LiveMap() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(-0.176894);
    const [lat] = useState(51.498356);
    const [zoom] = useState(11);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('mouseenter', e => {
            if (e.features.length) {
                map.getCanvas().style.cursor = 'pointer';
            }
        });
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            })
        );
    });



    return (
        <div>
            <div ref={mapContainer} className="map-container position-absolute" style={{ width:'100vw', height:'100vh', minWidth: '500px'}}/>
            <div>
                <div className="position-absolute m-3 p-3" style={{background : "rgba(0, 0, 0, 0.8)", opacity: '70%',width: '700px', height:'600px', borderRadius:'10px'}}>
                    <div style={{color: 'white', fontSize: '30px'}}>My Exposure to PM2.5</div>
                    <hr style={{color: 'white'}}></hr>
                    <div className="d-flex flex-row justify-content-between">
                        <div style={{width: '50vw'}}>
                            <div style={{color: 'white', fontSize: '12px'}}>Most Recent PM2.5 Value Collected by Sensor:</div>
                        </div>
                        <div style={{width: '50vw'}}>
                            <div style={{color: 'white', fontSize: '12px'}}>Direction with Lesser Pollution:</div>
                        </div>
                    </div>
                    <SensorLineChart />
                </div>
            </div>
        </div>
    );
}