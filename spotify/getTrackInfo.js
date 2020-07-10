const fetch = require('node-fetch');

const getTrackInfo= accessToken => {
const url = 'https://api.spotify.com/v1/audio-features/?';

return fetch(url, {
    method: 'GET',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    },
})
    .then(res => res.json())
    .then(data => data.items)
    .catch(error => console.log(error));
};

module.exports = getTrackInfo;