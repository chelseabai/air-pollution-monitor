import React, { PureComponent } from 'react';
import { LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
    ResponsiveContainer, } from 'recharts';
import { useState, useEffect } from "react";
import axios from "axios";



export default function PollutionLineChart() {
    // const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://pollutioncompass.herokuapp.com/api/Camden")
        .then((response) => {
            const data = [];
            const pollutiondata = response.data;
            for (var instance in pollutiondata){
                let aqi_data = pollutiondata[instance].aqi;
                let time = pollutiondata[instance].time.split("-");
                let hour = time[-1];
                time.pop();
                let date = time.join('-');
                data.push({date :date, hour: hour, aqi: aqi_data})
            }
            setData(data);
        })
        .catch(() => {
            console.log("Error!")
        })
    });

    return (

        <div className="p-3" style={{width: '30vw', aspectRatio: '3.5/2', boxShadow: "3px 3px 10px 1px #ededfc", borderRadius: "15px"}}>
            <h4>
                PM2.5 Pollution Line Chart
            </h4>
            <hr></hr>
            <ResponsiveContainer width="100%" height="100%">
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="aqi" stroke="#006991" strokeWidth={2} fill="url(#colorUv)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}