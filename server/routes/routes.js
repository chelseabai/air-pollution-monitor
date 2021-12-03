import express from 'express';
import { getMaryleboneData, getCamdenData, getNKensingtonData, getHounslowData,
    getSirjohncassData, getHackneyData, getFarringdonData, getWestminsterData } from "../controller/posts.js";

const router = express.Router();

router.get('/api/Marylebone', getMaryleboneData);
router.get('/api/Camden', getCamdenData);
router.get('/api/NKensington', getNKensingtonData);
router.get('/api/Hounslow', getHounslowData);
router.get('/api/Sirjohncass', getSirjohncassData);
router.get('/api/Hackney', getHackneyData);
router.get('/api/Farringdon', getFarringdonData);
router.get('/api/Westminster', getWestminsterData);

// router.get('/api', displayPollutionData);

export default router;