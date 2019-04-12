exports.get = async () => {

    const moment = require('moment');
    const Company = require('../models/company');

    const companies = await Company.find().sort({name:-1}).exec();
    let notifications = [];

    companies.forEach(company => {
        let currentDate = moment().format('YYYY-MM-DD').split('-');
        let accountExpireDate = moment(company.account.expired_at).format('YYYY-MM-DD').split('-');

        let cd = moment([currentDate[0], currentDate[1], currentDate[2]]);//current date
        let ae = moment([accountExpireDate[0], accountExpireDate[1], accountExpireDate[2]]);//account expire

        let state, btn, alert, days = ae.diff(cd,'days');

        if(Math.sign(days) == -1 || Math.sign(days) == -0) state = 'timed out';
        if(days == 20 || days < 20 && days >= 0) state = 'to expire';
        if(days > 20) return state = 'without expiring';

        if(state === 'timed out') {
            btn = 'btn btn-danger btn-circle';
            alert = 'alert alert-danger animated flipInX';
        };

        if(state === 'to expire') {
            btn = 'btn btn-warning btn-circle';
            alert = 'alert alert-warning animated flipInX';
        };

        notifications.push({
            _id:company._id,
            company:company.name,
            type:'account',
            state:state,
            days:Math.abs(days),
            style:{
                icon:'fa-envelope',
                btn:btn,
                alert:alert
            }   
        }); 
    });


    return new Promise((resolve) => {
        resolve({notifications:notifications,count:notifications.length});
    });
};

