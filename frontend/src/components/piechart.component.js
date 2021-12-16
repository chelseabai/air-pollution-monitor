import React, { PureComponent } from 'react';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip} from 'recharts';
import { useState, useEffect } from "react";
import axios from "axios";

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PollutionPieChart({url}) {
    let [timeString] = useState([Date().toLocaleString()]);
    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                const pollutiondata = response.data;
                let good = 0;
                let moderate = 0;
                let unhealthy_sensitive = 0;
                let unhealthy = 0;
                let very_unhealthy = 0;
                for (var instance in pollutiondata){
                    let aqi_data = pollutiondata[instance].aqi;
                    if (aqi_data <= 50){
                        good += 1;
                    } else if (50 < aqi_data <= 100){
                        moderate += 1;
                    } else if (100 < aqi_data <= 150){
                        unhealthy_sensitive += 1;
                    } else if (150 < aqi_data <= 200){
                        unhealthy += 1;
                    } else {
                        very_unhealthy += 1;
                    }
                }
                const data = [{name: "Good", value: good},
                    {name: "Moderate", value: moderate},
                    {name: "Unhealthy for Sensitive Group", value: unhealthy_sensitive},
                    {name: "Unhealthy", value: unhealthy},
                    {name: "Very Unhealthy", value: very_unhealthy}];
                setData(data);
            })
            .catch(() => {
                console.log("Error!")
            })
    },[url]);

    const renderColorfulLegendText = (value: string, entry: any) => {

        return <span style={{ color: 'grey', padding: "10px" }}>{value}</span>;
    };

    return (
        <div className="p-3" style={{minWidth:'600px', minHeight: '400px', width: '30vw', height: '20vw', boxShadow: "3px 3px 10px 1px #ededfc", borderRadius: "15px"}}>
            <h4>
                Percentage of Hours with Good Air Quality
            </h4>
            <div style={{fontSize: "10px", color: "#bcbec0"}}>Data collected since 4th December</div>
            <div style={{fontSize: "10px", color: "#bcbec0"}}>Last updated: {timeString}</div>
            <hr></hr>
            <ResponsiveContainer width="100%" height="70%">
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    innerRadius='60%'
                    outerRadius='80%'
                    paddingAngle= {5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        // <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        <Cell fill={entry.name ===  "Good" ? '#9dcd5f': entry.name === "Moderate" ? '#f7d75b' : entry.name === "Unhealthy for Sensitive Group"
                        ? '#f7a75c' : entry.name === "Unhealthy" ? '#f1605e' : '#8e68ad'} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" formatter={renderColorfulLegendText}/>
            </PieChart>
            </ResponsiveContainer>
        </div>
    );
}