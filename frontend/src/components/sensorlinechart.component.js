import React, { PureComponent } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer, } from 'recharts';
import { useState, useEffect } from "react";
import axios from "axios";

export default function SensorLineChart() {
    let [data, setData] = useState([]);
    let [pollution, setPollution] = useState([]);

    useEffect(() => {
        axios.get("https://pollutioncompass.herokuapp.com/api/mylocation")
            .then((response) => {
                const data = [];
                const pollutiondata = response.data;
                let length = pollutiondata.length;
                for (let i = length - 200; i < length; i++){
                    let aqi_data = pollutiondata[i].aqi;
                    let time = pollutiondata[i].time.split("-");
                    let second = time[time.length-1];
                    let minute = time[time.length-2];
                    let hour = time[time.length-3];
                    time.pop();
                    time.pop();
                    time.pop();
                    let date = time.join('-');
                    data.push({date :date, hour: hour, minute: minute, second: second, aqi: aqi_data});
                }
                setData(data);
                pollution = pollutiondata[length-1].aqi;
                setPollution(pollution);
            })
            .catch(() => {
                console.log("Error!")
            })
    },[]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip p-1" style={{background: 'white', border:'solid 1px grey'}}>
                    <div className="label">Date: {label}</div>
                    <div>Time: {payload[0].payload.hour}:{payload[0].payload.minute}:{payload[0].payload.second} </div>
                    <div className="intro">AQI: {payload[0].value}</div>
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{width: '650px', height:'500px'}}>
            <div className="d-flex flex-row">
                <div style={{fontSize:'80px', color:'white', width: '50vw'}}>{pollution}</div>
                <div style={{fontSize:'80px', color:'white', width: '50vw'}}>NW</div>
            </div>
            <ResponsiveContainer width="100%" height="70%">
                <AreaChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#129a74" stopOpacity={0.5}/>
                            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }}/>
                    <Tooltip content ={<CustomTooltip />}/>
                    <Legend wrapperStyle={{bottom: -10, left: 25}} />
                    <Area type="monotone" dataKey="aqi" stroke="white" strokeWidth={2} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}