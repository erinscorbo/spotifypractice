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

app.get('/history', (req, res, res2) => {
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
        }));
        const output = data.map( function(item){
            return item.id;
        }).join(',');
        res2.toString(output);
        console.log(res2);
        res.json(arr);
        })
        .catch(err => console.log(err));
    });
});
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
console.log(`Express running → PORT ${server.address().port}`);
});