require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Datastore = require('nedb');
const cron = require('node-cron');
const Pusher = require('pusher');
const authorizeSpotify = require('./authorizeSpotify');
const getAccessToken = require('./getAccessToken');
const getRecentlyPlayed = require('./getRecentlyPlayed');
const getTrackInfo = require('./getTrackInfo');

const clientUrl = process.env.CLIENT_URL;

const app = express();

const db = new Datastore();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/login', authorizeSpotify);
app.get('/callback', getAccessToken, (req, res, next) => {
db.insert(req.credentials, err => {
if (err) {
    next(err);
} else {
    res.redirect(`${clientUrl}/?authorized=true`);
    }
});
});
app.get('/history', (req, res) => {
    db.find({}, (err, docs) => {
    if (err) {
        throw Error('Failed to retrieve documents');
    }

    const accessToken = docs[0].access_token;
    getRecentlyPlayed(accessToken)
        .then(data => {
        const arr = data.map(e => ({
            id: e.id,
            name: e.name,
            artist: e.artists[0].name,
            url: e.album.images[0].url,
        }));
        res.json(arr);
        })
        .catch(err => console.log(err));
    });
});
app.get('/trying/ids/:songids', (req, res) => {
    const ids=req.params.songids;
    db.find({}, (err, docs) => {
    if (err) {
        throw Error('Failed to retrieve documents');
    }
    const accessToken = docs[0].access_token;
    getTrackInfo(accessToken, ids)
        .then(data => {
        const arr = data.map(e => ({
            tempo: e.tempo,
            danceability: e.danceability,
            energy: e.energy,
            valence: e.valence,
        }));
        res.json(arr);
        })
        .catch(err => console.log(err));
    });
});
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
console.log(`Express running → PORT ${server.address().port}`);
});