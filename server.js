const express = require('express');
const https   = require('https');

const app = express();
const port = process.env.PORT || 5000;

const app_token = (process.env.APP_TOKEN ? `$$app_token=${process.env.APP_TOKEN}&` : '');
const reqString = `https://data.lacity.org/resource/7fvc-faax.json?${app_token}$limit=1000&$order=date_occ DESC&$select=date_occ, time_occ, crm_cd, vict_age, vict_sex, weapon_used_cd, location_1, location&`;
const radius    = 800;
const messages  = [
    'This area is safe. Wander freely. Call 911 if there is an emergency.',
    'This area is decently safe. Still watch your back. Call 911 if there is an emergency.',
    'This area is alright. Some crimes. Be safe out there. Watch your back. Call 911 if there is an emergency.',
    'This area is not safe. Lots of crimes. Be safe out there. Watch your back. Call 911 if there is an emergency.',
    'This area is violent. Let someone know where you are for sure. Call 911 if there is an emergency.',
    'You should leave here unless you know what you\'re doing!'
];

function httpRequest(params) {
    return new Promise(function(resolve, reject) {
        // start request
        https.get(reqString + `$where=within_circle(location_1,${params.lat},${params.long},${radius}) AND ${params.crm_cd}`, (res) => {
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
        }).on('error', (err) => {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
    });
}

app.get('/api/search', (req, res) => {
    var opts = {
        lat: req.query.lat || 34.046,
        long: req.query.long || -118.2509,
        crm_cd: '(crm_cd = \'230\' OR crm_cd = \'231\' OR crm_cd = \'235\' OR crm_cd = \'622\' OR crm_cd = \'623\' OR crm_cd = \'624\' OR crm_cd = \'625\' OR crm_cd = \'648\' OR crm_cd = \'480\' OR crm_cd = \'485\' OR crm_cd = \'310\' OR crm_cd = \'320\' OR crm_cd = \'886\' OR crm_cd = \'438\' OR crm_cd = \'110\' OR crm_cd = \'113\' OR crm_cd = \'351\' OR crm_cd = \'352\' OR crm_cd = \'451\' OR crm_cd = \'452\' OR crm_cd = \'210\' OR crm_cd = \'220\' OR crm_cd = \'121\' OR crm_cd = \'122\' OR crm_cd = \'760\' OR crm_cd = \'805\' OR crm_cd = \'822\' OR crm_cd = \'860\' OR crm_cd = \'341\' OR crm_cd = \'343\' OR crm_cd = \'350\' OR crm_cd = \'440\' OR crm_cd = \'441\' OR crm_cd = \'442\' OR crm_cd = \'443\' OR crm_cd = \'450\' OR crm_cd = \'740\' OR crm_cd = \'745\' OR crm_cd = \'330\' OR crm_cd = \'331\' OR crm_cd = \'410\' OR crm_cd = \'420\' OR crm_cd = \'421\' OR crm_cd = \'510\' OR crm_cd = \'520\')'
    };
    httpRequest(opts).then((httpRes) => {
        var result = {
            'Radius': radius,
            'Arson': [],
            'Assault': [],
            'Bike Theft': [],
            'Burglary': [],
            'Disturbing the Peace': [],
            'DUI/Reckless Driving': [],
            'Homicide': [],
            'Pickpocketing/Purse-Snatching': [],
            'Robbery': [],
            'Sex Crimes': [],
            'Theft/Larceny': [],
            'Vandalism': [],
            'Vehicle Break-In': [],
            'Vehicle Theft': []
        };

        var violentCrimeCount = 0;
        httpRes.forEach(crime => {
            switch(crime.crm_cd) {
                case '648':
                    result['Arson'].push(crime);
                    break;
                case '230':
                case '231':
                case '235':
                case '622':
                case '623':
                case '624':
                case '625':
                    result['Assault'].push(crime);
                    violentCrimeCount++;
                    break;
                case '480':
                case '485':
                    result['Bike Theft'].push(crime);
                    break;
                case '310':
                case '320':
                    result['Burglary'].push(crime);
                    break;
                case '886':
                    result['Disturbing the Peace'].push(crime);
                    break;
                case '438':
                    result['DUI/Reckless Driving'].push(crime);
                    break;
                case '110':
                case '113':
                    result['Homicide'].push(crime);
                    violentCrimeCount++;
                    break;
                case '351':
                case '352':
                case '451':
                case '452':
                    result['Pickpocketing/Purse-Snatching'].push(crime);
                    break;
                case '210':
                case '220':
                    result['Robbery'].push(crime);
                    break;
                case '121':
                case '122':
                case '760':
                case '805':
                case '822':
                case '860':
                    result['Sex Crimes'].push(crime);
                    violentCrimeCount++;
                    break;
                case '341':
                case '343':
                case '350':
                case '440':
                case '441':
                case '442':
                case '443':
                case '450':
                    result['Theft/Larceny'].push(crime);
                    break;
                case '740':
                case '745':
                    result['Vandalism'].push(crime);
                    break;
                case '330':
                case '331':
                case '410':
                case '420':
                case '421':
                    result['Vehicle Break-In'].push(crime);
                    break;
                case '510':
                case '520':
                    result['Vehicle Theft'].push(crime);
                    break;
            }
        });

        // console.log('count: ' + violentCrimeCount);
        rating = Math.floor(2.5 + (violentCrimeCount - 165.25)/39.5);

        if(rating > 5)
            rating = 5;
        else if(rating < 0)
            rating = 0;

        result['Rating']        = rating;
        result['RatingMessage'] = messages[rating];

        res.json(result);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
