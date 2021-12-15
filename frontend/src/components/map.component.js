import React, { useRef, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import mapboxgl from '!mapbox-gl';
import axios from "axios";
import PollutionLineChart from "./linechart.component";

/* eslint import/no-webpack-loader-syntax: off */

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWJhaSIsImEiOiJja3c4bmd1cXEyNGN2MnZwNjA5NHp6a3VoIn0.qRC3hNMfVycvR6HS4yH6PQ';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(-0.176894);
    const [lat] = useState(51.498356);
    const [zoom] = useState(11);
    const [location, setLocation] = useState(["Marylebone Road"]);
    const [timeString] = useState([Date().toLocaleString()]);
    const [pollution, setPollution] = useState([]);
    const [myurl, setUrl] = useState(["https://pollutioncompass.herokuapp.com/api/Marylebone"]);



    useEffect(() => {
        axios.get(myurl)
            .then((response) => {
                const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                const pollutionData = lastData;
                setPollution(pollutionData)
            })
            .catch(() => {
                console.log("Error!")
            });
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
            const location = "Marylebone Road";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/Marylebone";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
        marker2.getElement().addEventListener('click', ()=>{
            const location = "Camden - Euston Road";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/Camden";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
        marker3.getElement().addEventListener('click', ()=>{
            const location = "North Kensington";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/NKensington";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
        marker4.getElement().addEventListener('click', ()=>{
            const location = "Westminster";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/Westminster";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
        marker5.getElement().addEventListener('click', ()=>{
            const location = "Farringdon Street";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/Farringdon";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
        marker6.getElement().addEventListener('click', ()=>{
            const location = "Hackney - Old Street";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/Hackney";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
        marker7.getElement().addEventListener('click', ()=>{
            const location = "Sir Johns Cass School";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/Sirjohncass";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
        marker8.getElement().addEventListener('click', ()=>{
            const location = "Hounslow Chiswick";
            setLocation(location);
            const myurl = "https://pollutioncompass.herokuapp.com/api/Hounslow";
            setUrl(myurl);
            axios.get(myurl)
                .then((response) => {
                    const lastData = response.data[response.data.length-1].aqi; // obtain the last element of the JSON array
                    const pollution = lastData;
                    setPollution(pollution);
                })
                .catch(() => {
                    console.log("Error!")
                })
        });
    }, []);


    return (
        <div>
            <div className="d-flex flex-row">
                <div ref={mapContainer} className="map-container" style={{ width:'70vw', height:'400px', minWidth: '500px'}}/>
                <div className="container p-3" style={{ width:'30vw',minWidth: '450px'}}>
                    <div style={{fontSize: "40px"}}>{location}</div>
                    <hr></hr>
                    <div style={{fontSize: "20px"}}>Real-time PM2.5 Pollution Level:</div>
                    <div style={{fontSize: "100px"}}>{pollution}</div>
                    <div style={{fontSize: "15px", color: "#bcbec0"}}>Last updated: {timeString}</div>
                    <div style={{fontSize: "15px", color: "#bcbec0"}}>Data provided by: London Air Quality Network</div>
                </div>
            </div>
            <div className="d-flex flex-row" style={{ width:'100vw'}}>
                <PollutionLineChart url={myurl}/>
            </div>
        </div>

    );
}