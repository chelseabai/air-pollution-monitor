import React, { useRef, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import mapboxgl from '!mapbox-gl';

/* eslint import/no-webpack-loader-syntax: off */

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWJhaSIsImEiOiJja3c4bmd1cXEyNGN2MnZwNjA5NHp6a3VoIn0.qRC3hNMfVycvR6HS4yH6PQ';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-0.176894);
    const [lat, setLat] = useState(51.498356);
    const [zoom, setZoom] = useState(11);


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

        // reset cursor to default when user is no longer hovering over a clickable feature
        map.current.on('mouseleave', () => {
            map.getCanvas().style.cursor = '';
        });
        // Marylebone
        const marker1 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([-0.154611, 51.52253])
            .addTo(map.current);
        // Camden
        const marker2 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([-0.129053205282516,51.5277066194645])
            .addTo(map.current);
        // N-Kensington
         const marker3 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([-0.213492,51.52105])
            .addTo(map.current);
        // Westminster
        const marker4 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([-0.131931,51.49467])
            .addTo(map.current);
        // Farringdon
        const marker5 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([-0.104515626337876, 51.5145253362314])
            .addTo(map.current);
        // Hackney
        const marker6 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([-0.08491, 51.526454])
            .addTo(map.current);
        // sir-johns-class
        const marker7 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([-0.077765681752,51.513847178423])
            .addTo(map.current);
        // hounslow-chiswick
        const marker8 = new mapboxgl.Marker({ color: '#e57373'})
            .setLngLat([
                -0.257252, 51.492507])
            .addTo(map.current);
        marker1.getElement().addEventListener('click', ()=>{
            alert('clicked')
        })
    });


    return (
        <div>
            <div ref={mapContainer} className="map-container" style={{ width:'60vw', height:'400px'}}/>
        </div>
    );
}