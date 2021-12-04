import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js'
import {postPollutionData} from "./controller/posts.js";
import path from 'path';

const app = express();

app.use('/', routes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const CONNECTION_URL = `mongodb+srv://chelseabai:happytina123@pollution-data.vssyr.mongodb.net/databaseA?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, function (){
        console.log(`Server running on port: ${PORT}`);
        postPollutionData();
    }))
    .catch((error) => console.log(error.message));
