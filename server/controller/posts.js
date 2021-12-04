// 1d41d3a3fb9d1ac5939a9fe0c06645c704390c98

import aqi from "aqi-us";
import fetch from "node-fetch";
import schedule from "node-schedule";
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    location: String,
    aqi: Number,
    time: String
});

const PollutionModel = mongoose.model('PollutionModel', postSchema);

const saveData = async (location, aqi, time) => {
    const pollutionData = new PollutionModel({
        'location' : location,
        'aqi': aqi,
        'time': time
    });
    await pollutionData.save(function(err, result) {
        if (err) throw err;
        if(result) {
            console.log(result)
        }
    });
    console.log(location,aqi,time);
};

// Stations to gather data from
const Marylebone = `https://api.waqi.info/feed/united-kingdom/london-marylebone-road/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const Camden = `https://api.waqi.info/feed/united-kingdom/camden-euston-road/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const NKensington = `https://api.waqi.info/feed/united-kingdom/london-n.-kensington/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const Hounslow = `https://api.waqi.info/feed/united-kingdom/hounslow-chiswick/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const Sirjohncass = `https://api.waqi.info/feed/united-kingdom/city-of-london-sir-john-cass-school/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const Hackney = `https://api.waqi.info/feed/united-kingdom/hackney-old-street/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const Farringdon = `https://api.waqi.info/feed/united-kingdom/city-of-london-farringdon-street/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const Westminster = `https://api.waqi.info/feed/united-kingdom/london-westminster/?token=1d41d3a3fb9d1ac5939a9fe0c06645c704390c98`;
const locations = [Marylebone, Camden, NKensington, Hounslow, Sirjohncass, Hackney, Farringdon, Westminster];

const fetchPollutionData = async() => {
    let time_ob = new Date();
    let year = time_ob.getFullYear();
    let month = time_ob.getMonth() + 1;
    let date = time_ob.getDate();
    let hour =  time_ob.getHours();
    let time = year + "-" + month + "-" + date + "-" + hour;
    for (let i = 0; i< locations.length; i++){
        try{
            const res = await fetch(locations[i]);
            const json = await res.json();
            const pm25_aqi = json.data.iaqi.pm25.v;
            const location = json.data.city.name;
            await saveData(location, pm25_aqi, time);
        } catch (error) {
            console.log('There is an error!');
        }
    }
};


export const postPollutionData = () => {
    schedule.scheduleJob('*/30 * * * *', function(){
        console.log("Job is running!");
        fetchPollutionData();
    });
};

export const getMaryleboneData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "London Marylebone Road, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};

export const getCamdenData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "Camden - Euston Road, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};

export const getNKensingtonData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "London N. Kensington, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};

export const getHounslowData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "Hounslow Chiswick, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};

export const getSirjohncassData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "City of London - Sir John Cass School, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};

export const getHackneyData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "Hackney - Old Street, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};
export const getFarringdonData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "City of London - Farringdon Street, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};

export const getWestminsterData = async (req,res) =>{
    try {
        const data = await PollutionModel.find({location: "London Westminster, United Kingdom"});
        res.send(data);
    } catch (error){
        console.log('Error');
    }
};