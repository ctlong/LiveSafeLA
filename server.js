const express = require('express');
const https   = require('https');

const app = express();
const port = process.env.PORT || 5000;

const app_token = (process.env.APP_TOKEN ? `$$app_token=${process.env.APP_TOKEN}&` : '');
const reqString = `https://data.lacity.org/resource/7fvc-faax.json?${app_token}$limit=2000&$order=date_occ DESC&$select=date_occ, time_occ, vict_age, vict_sex, weapon_used_cd, location_1&`

function httpRequest(params) {
    return new Promise(function(resolve, reject) {
        // generate app token
        var app_token = (process.env.APP_TOKEN ? `$$app_token=${process.env.APP_TOKEN}&` : '');
        // start request
        var req = https.get(reqString + `$where=within_circle(location_1,${params.lat},${params.long},5000) AND ${params.crm_cd}`, (res) => {
            // reject on bad status
            if(res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // accumulate data
            var output = '';
            res.on('data', (chunk) => {
                output += chunk;
            });
            // resolve on end
            res.on('end', () => {
                try {
                    output = JSON.parse(output);
                } catch(e) {
                    reject(e);
                }
                resolve(output);
            });
        });
        // reject on request error
        req.on('error', (err) => {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        // don't forget to end the request
        req.end();
    });
}

app.get('/api/search', (req, res) => {
    var results = {};
    var opts = {
        lat: req.query.lat || 34.046,
        long: req.query.long || -118.2509,
        crm_cd: 'crm_cd = \'886\''
    };
    httpRequest(opts).then((httpRes) => {
        results['Disturbing the Peace'] = httpRes;
        
        opts.crm_cd = `(crm_cd = \'110\' OR crm_cd = \'113\')`
        return httpRequest(opts)
    }).then((httpRes) => {
        results['Homicide'] = httpRes;
        
        opts.crm_cd = `(crm_cd = \'210\' OR crm_cd = \'220\')`
        return httpRequest(opts)
    }).then((httpRes) => {
        results['Robbery'] = httpRes;
        
        opts.crm_cd = `(crm_cd = \'121\' OR crm_cd = \'122\' OR crm_cd = \'760\' OR crm_cd = \'805\' OR crm_cd = \'822\' OR crm_cd = \'860\')`
        return httpRequest(opts)
    }).then((httpRes) => {
        results['Sex Crimes'] = httpRes;
        
        opts.crm_cd = `(crm_cd = \'341\' OR crm_cd = \'343\' OR crm_cd = \'350\' OR crm_cd = \'440\' OR crm_cd = \'441\' OR crm_cd = \'442\' OR crm_cd = \'443\' OR crm_cd = \'450\')`
        return httpRequest(opts)
    }).then((httpRes) => {
        results['Theft/Larceny'] = httpRes;
        
        opts.crm_cd = `(crm_cd = \'740\' OR crm_cd = \'745\')`
        return httpRequest(opts)
    }).then((httpRes) => {
        results['Vandalism'] = httpRes;
        res.json(results);
        
        // opts.crm_cd = `(crm_cd = \'110\' OR crm_cd = \'113\')`
        // return httpRequest(opts)
    })

    // https.get(`https://data.lacity.org/resource/7fvc-faax.json?$limit=5000&$order=crm_cd ASC&$where=within_circle(location_1,${lat},${long},5000)`, (rest) => {
    //     var output110 = '';
    //     console.log(rest.statusCode);

    //     rest.on('data', function (chunk) {
    //         output110 += chunk;
    //     });

    //     rest.on('end', function() {
    //         output['110'] = output110;
    //     });
    // }).then((result) => {

    // })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
