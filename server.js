const express = require('express');
const https   = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/search', (req, res) => {
    var lat  = req.query.lat || 34.046;
    var long = req.query.long || -118.2509;

    https.get(`https://data.lacity.org/resource/7fvc-faax.json?$order=date_occ DESC&$where=within_circle(location_1,${lat},${long},5000)&crm_cd=110`, (rest) => {
        var output = '';
        console.log(rest.statusCode);

        rest.on('data', function (chunk) {
            output += chunk;
        });

        rest.on('end', function() {
            var obj = JSON.parse(output);
            res.json(obj);
        });

        //36.2827131
        //-122.4072206
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
