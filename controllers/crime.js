const express = require('express');
const router  = express.Router();
const moment  = require('moment');
const https   = require('https');

const TOKEN      = process.env.APP_TOKEN; // $$app_token
const REQ_URL    = 'https://data.lacity.org/resource/7fvc-faax.json';
const RADIUS     = 800;
const ISO_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss.SSS';
const CODES      = [
    230, 231, 235, 622, 623, 624, 625, 648, 480,
    485, 310, 320, 886, 438, 110, 113, 351, 352, 451, 452, 210,
    220, 121, 122, 760, 805, 822, 860, 341, 343, 350, 440, 441,
    442, 443, 450, 740, 745, 330, 331, 410, 420, 421, 510, 520
];

function httpRequest(url) {
    return new Promise(function(resolve, reject) {
        // start request
        https.get(url, (res) => {
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

router.get('/search', (req, res) => {
    const lat       = req.query.lat || 34.046;
    const long      = req.query.long || -118.2509;
    const dateParam = moment().subtract(6, 'months').format(ISO_FORMAT);

    var url  = REQ_URL;
        url += `?$where=within_circle(location_1,${lat},${long},${RADIUS})`;
        url += ` AND date_occ > \'${dateParam}\' AND (`;
    
    for(i in CODES) {
        if(i != 0)
            url += ' OR ';
        url += `crm_cd = '${CODES[i]}'`
    }
        url += ')'

    httpRequest(url).then((httpRes) => {
        var result = {
            'Radius': RADIUS,
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

module.exports = router;
