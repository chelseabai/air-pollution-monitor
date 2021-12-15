import React, {PureComponent, useEffect, useState} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function PollutionBarChart({url}) {
    let [timeString] = useState([Date().toLocaleString()]);
    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                const data = [];
                const pollutiondata = response.data;
                console.log('hi');
                let length = pollutiondata.length;
                // for (let i = 1; i++; i< 10){
                //     console.log('hi')
                // for (let i = length - 24; i++; i < length){
                //     console.log(i);
                    // let aqi_data = pollutiondata[i].aqi;
                    // let time = pollutiondata[i].time.split("-");
                    // let hour = time[-1];
                    // time.pop();
                    // let date = time.join('-');
                    // data.push({date :date, hour: hour, aqi: aqi_data})
                // }
                // setData(data);
                // console.log(data);
            })
            .catch(() => {
                console.log("Error!")
            })
    },[]);

    return (
        <div className="p-3" style={{minWidth:'600px', minHeight: '400px', width: '30vw', height: '20vw', boxShadow: "3px 3px 10px 1px #ededfc", borderRadius: "15px"}}>
            <h4>
                Last 24 Hour PM2.5 Pollution Bar Chart
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
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="aqi" fill="#8884d8" />
                {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}