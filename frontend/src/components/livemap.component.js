import React, { useRef, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import mapboxgl from '!mapbox-gl';
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
                <div ref={mapContainer} className="map-container" style={{ width:'100vw', height:'100vh', minWidth: '500px'}}/>
        </div>
    );
}