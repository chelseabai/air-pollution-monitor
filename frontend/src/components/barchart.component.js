import React, {PureComponent, useEffect, useState} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

export default function PollutionBarChart({url}) {
    let [timeString] = useState([Date().toLocaleString()]);
    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                const data = [];
                const pollutiondata = response.data;
                let length = pollutiondata.length;
                for (let i = length-24; i < length; i++){
                    let aqi_data = pollutiondata[i].aqi;
                    let time = pollutiondata[i].time.split("-");
                    let hour = time[time.length-1];
                    time.pop();
                    let date = time.join('-');
                    data.push({date :date, hour: hour, aqi: aqi_data})
                }
                setData(data);
            })
            .catch(() => {
                console.log("Error!")
            })
    },[url]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip p-1" style={{background: 'white', border:'solid 1px grey'}}>
                    <div className="label">Date: {payload[0].payload.date}</div>
                    <div>Time: {label}:00 </div>
                    <div className="intro">AQI: {payload[0].value}</div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="p-3" style={{minWidth:'600px', minHeight: '400px', width: '30vw', height: '20vw', boxShadow: "3px 3px 10px 1px #ededfc", borderRadius: "15px"}}>
            <h4>
                Last 24 Hours PM2.5 Pollution Bar Chart
            </h4>
            <div style={{fontSize: "10px", color: "#bcbec0"}}>Data collected since 4th December</div>
            <div style={{fontSize: "10px", color: "#bcbec0"}}>Last updated: {timeString}</div>
            <hr></hr>
        <ResponsiveContainer width="100%" height="70%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour"/>
                <YAxis />
                <Tooltip content ={<CustomTooltip />}/>
                <Bar dataKey="aqi">
                    {data.map((entry, index) => (
                        <Cell fill={entry.aqi <= 50 ? '#9dcd5f' : entry.aqi <= 100 ? '#f7d75b' : entry.aqi <= 150 ? '#f7a75c' : entry.aqi <= 200 ? '#f1605e' : '#8e68ad'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}