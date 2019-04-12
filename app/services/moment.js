const moment = require('moment');

module.exports.getCurrentDate = async () => { 
    let date = moment().format("YYYY-MM-DD");
    return date;
}