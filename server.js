const express = require('express');
const https   = require('https');
const moment  = require('moment');

const app = express();
const port = process.env.PORT || 5000;

const app_token = (process.env.APP_TOKEN ? `$$app_token=${process.env.APP_TOKEN}&` : '');
const reqString = `https://data.lacity.org/resource/7fvc-faax.json?${app_token}$limit=1000&$order=date_occ DESC&$select=date_occ, time_occ, crm_cd, vict_age, vict_sex, weapon_used_cd, location_1, location&`;
const radius    = 800;

function httpRequest(params) {
    return new Promise(function(resolve, reject) {
        // start request
        const dateParam = moment().subtract(6, 'months').format('YYYY-MM-DD[T]HH:mm:ss.SSS')
        https.get(reqString + `$where=within_circle(location_1,${params.lat},${params.long},${radius}) AND date_occ > \'${dateParam}\' AND ${params.crm_cd}`, (res) => {
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
            'Vehicle Theft': [],
            'Concerns': {
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
            }
        };

        httpRes.forEach(crime => {
            switch(crime.crm_cd) {
                case '648':
                    result['Arson'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Arson'].push(crime)
                    }

                    break;
                case '230':
                case '231':
                case '235':
                case '622':
                case '623':
                case '624':
                case '625':
                    result['Assault'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Assault'].push(crime)
                    }

                    break;
                case '480':
                case '485':
                    result['Bike Theft'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Bike Theft'].push(crime)
                    }

                    break;
                case '310':
                case '320':
                    result['Burglary'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Burglary'].push(crime)
                    }

                    break;
                case '886':
                    result['Disturbing the Peace'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Disturbing the Peace'].push(crime)
                    }

                    break;
                case '438':
                    result['DUI/Reckless Driving'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['DUI/Reckless Driving'].push(crime)
                    }

                    break;
                case '110':
                case '113':
                    result['Homicide'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Homicide'].push(crime)
                    }

                    break;
                case '351':
                case '352':
                case '451':
                case '452':
                    result['Pickpocketing/Purse-Snatching'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Pickpocketing/Purse-Snatching'].push(crime)
                    }

                    break;
                case '210':
                case '220':
                    result['Robbery'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Robbery'].push(crime)
                    }

                    break;
                case '121':
                case '122':
                case '760':
                case '805':
                case '822':
                case '860':
                    result['Sex Crimes'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Sex Crimes'].push(crime)
                    }

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

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Theft/Larceny'].push(crime)
                    }

                    break;
                case '740':
                case '745':
                    result['Vandalism'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Vandalism'].push(crime)
                    }

                    break;
                case '330':
                case '331':
                case '410':
                case '420':
                case '421':
                    result['Vehicle Break-In'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Vehicle Break-In'].push(crime)
                    }

                    break;
                case '510':
                case '520':
                    result['Vehicle Theft'].push(crime);

                    if (moment(crime.date_occ).isAfter(moment().subtract(6, 'months'))) {
                      result['Concerns']['Vehicle Theft'].push(crime)
                    }

                    break;
            }
        });

        res.json(result);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
