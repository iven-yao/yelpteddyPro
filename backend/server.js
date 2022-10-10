var express = require('express');
var axios = require('axios').default;
var url = require('url');
var path = require('path');
var app = express();
var port = 3000;
var cors = require('cors');
var yelp_key = 't3KnRrrokI0URYqdzfYgbtHWBWsrdtuYkESa2aRS-Gsf-txbtsbkTHeD7UqkX1JnDHhVuCf4IBnH1SKBmKqybwPPD8S5eHV3MzBLwV6D6CtfBAqDYooa7v5sDQgsY3Yx'
var geocoding_key = 'AIzaSyCNn-2wUovlpHZ9dR_mJ70iStKObDaY74c'
var ipinfo_key = 'e11d94f5b9fe46'

var yelp_api = 'https://api.yelp.com/v3'
var geocoding_api = 'https://maps.googleapis.com/maps/api/geocode/json?'
var ipinfo_api = 'https://ipinfo.io/?'

var config = {
    headers: {
        'Authorization': 'Bearer '+yelp_key
    }
}

// app.get('/',(req, res) => res.send("Hello Express"));
var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
app.use(cors());

app.get('/', (req, res) => {
    res.send("yelpteddyPro-backend");
})

// businesses
app.get('/api/businesses',async (req, res) => {
    console.log("/businesses call");
    let payload = { "term":req.query.term?req.query.term:'pizza', 
                    "latitude":req.query.latitude?req.query.latitude:34, 
                    "longitude":req.query.longitude?req.query.longitude:-118, 
                    "radius":req.query.radius?req.query.radius:16000,
                    "categories":req.query.categories?req.query.categories:'default'};
    const param = new url.URLSearchParams(payload);
    
    try{
        let response = await axios.get(yelp_api+"/businesses/search?"+param,config);
        let data = response.data;
        res.json(data);
    } catch (err) {
        console.log(err.response.data);
    }
})

// detail
app.get('/api/detail', async (req, res) => {
    console.log("/detail call");
    try{
        let response = await axios.get(yelp_api+"/businesses/"+req.query.id, config);
        let data = response.data;
        res.json(data);
    } catch(err) {
        console.log(err.response.data);
    }
})

// review
app.get('/api/review', async (req, res) => {
    console.log("/review call");
    try{
        let response = await axios.get(yelp_api+"/businesses/"+req.query.id+"/reviews", config);
        let data = response.data;
        res.json(data);
    } catch(err) {
        console.log(err.response.data);
    }
})

// geocoding
app.get('/api/geocoding', async (req, res) => {
    console.log("/geocoding call");
    let payload = { "address":req.query.address?req.query.address:'university of southern california',
                    "key":geocoding_key};
    const param = new url.URLSearchParams(payload);

    try {
        let response = await axios.get(geocoding_api+param);
        let data = response.data;
        res.json(data);
    } catch(err) {
        console.log(err.response.data);
    }

})

// ipinfo
app.get('/api/ipinfo', async (req, res) => {
    console.log("/ipinfo call");
    let payload = { "token":ipinfo_key};
    const param = new url.URLSearchParams(payload);
    try {
        let response = await axios.get(ipinfo_api+param);
        let data = response.data;
        res.json(data);
    } catch(err) {
        console.log(err.response.data);
    }
})
