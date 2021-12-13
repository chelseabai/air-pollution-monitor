import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mqtt from 'mqtt';
import cors from 'cors';
import routes from './server/routes/routes.js'
import {postPollutionData, postMQTTdata} from "./server/controller/posts.js";
import path from 'path';
import aqi from "aqi-us";

const app = express();

app.use('/', routes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const __dirname = path.resolve();

app.use(express.static('frontend/build'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const CONNECTION_URL = `mongodb+srv://chelseabai:happytina123@pollution-data.vssyr.mongodb.net/databaseA?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

const client = mqtt.connect({ host: 'localhost', port: 1883 });
const topic = 'esp/pm25';

// client.on('connect', () => {
//     console.log('Connected');
//     client.subscribe([topic], () => {
//         console.log(`Subscribe to topic '${topic}'`)
//     })
// });

// Post pollution data from online API to the database
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, function (){
        console.log(`Server running on port: ${PORT}`);

        // Subscribe to MQTT broker service to obtain data from sensor
        // client.on('message', (topic, payload) => {
        //     postMQTTdata(topic, payload.toString());
        //     console.log('Received Message:', topic, payload.toString());
        // });
        postPollutionData();
    }))
    .catch((error) => console.log(error.message));
