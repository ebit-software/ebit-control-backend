
// exports.getAccounts = async (req,res) => {
//     const Company = require('../models/company');
//     const currentDate = moment.getCurrentDate();
//     console.log(currentDate);
//     try {
//         const all = await Company.find({
            
//         });
//     } catch (error) {
        
//     }
// }


//aqui se obtienen las empresas que han caducado y estan por expirar en un lapso de 20 dias
exports.get = async (req,res) => {
    const moment = require('moment');
    const Company = require('../models/company');
    try {
        const all = await Company.find({});
        const notifications = [];

        all.forEach(company => {

            let currentDate = moment().format('YYYY-MM-DD');
            let expireDate = moment(company.account.expired_at).format('YYYY-MM-DD');



            let currentDateSplited = currentDate.split('-');
            let expireDateSplited = expireDate.split('-');


            let c = moment([currentDateSplited[0], currentDateSplited[1], currentDateSplited[2]]);
            let e = moment([expireDateSplited[0], expireDateSplited[1], expireDateSplited[2]]);

            let days = e.diff(c, 'days')
            let state;
            if(Math.sign(days) == -1 || Math.sign(days) == -0) state = 'timed out';
            if(days == 20 || days < 20 && days >= 0) state = 'to expire';
            if(days > 20) return state = 'without expiring';

            let btn , alert;

            //aqui estilos de la notificacion de acuerdo al state
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

        res.status(200).json({ok:true , data:notifications});

    } catch (error) {
        
    }
}

module.exports.test = async (req,res,next) => {
    
    const moment = require('moment');
    const Company = require('../models/company');

    let companies, notificacions = [];

    try {
        companies = await Company.find().sort({name:1}).exec();
    } catch (error) {
        res.status(500).json({ok:false, error});
    }

    companies.forEach((company) => {
        let currentDate = moment().format('YYYY-MM-DD').split('-');
        let accountExpireDate = moment(company.account.expired_at).format('YYYY-MM-DD').split('-');
        let domainExpireDate = moment(company.account.expired_at).format('YYYY-MM-DD').split('-');

        let cd = moment([currentDate[0], currentDate[1], currentDate[2]]);//current date
        let ae = moment([accountExpireDate[0], accountExpireDate[1], accountExpireDate[2]]);//account expire
        let de =  moment([domainExpireDate[0], domainExpireDate[1], domainExpireDate[2]]);//domain expire
    });

    res.status(200).json({ok:true,companies});
};


// const moment = require('moment');
// const Company = require('../models/company');

// const companies = await Company.find().sort({name:-1}).exec();
// let notifications = [];

// companies.forEach(company => {
//     let currentDate = moment().format('YYYY-MM-DD').split('-');
//     let accountExpireDate = moment(company.account.expired_at).format('YYYY-MM-DD').split('-');

//     let cd = moment([currentDate[0], currentDate[1], currentDate[2]]);//current date
//     let ae = moment([accountExpireDate[0], accountExpireDate[1], accountExpireDate[2]]);//account expire

//     let state, btn, alert, days = ae.diff(cd,'days');

//     if(Math.sign(days) == -1 || Math.sign(days) == -0) state = 'timed out';
//     if(days == 20 || days < 20 && days >= 0) state = 'to expire';
//     if(days > 20) return state = 'without expiring';

//     if(state === 'timed out') {
//         btn = 'btn btn-danger btn-circle';
//         alert = 'alert alert-danger animated flipInX';
//     };

//     if(state === 'to expire') {
//         btn = 'btn btn-warning btn-circle';
//         alert = 'alert alert-warning animated flipInX';
//     };

//     notifications.push({
//         _id:company._id,
//         company:company.name,
//         type:'account',
//         state:state,
//         days:Math.abs(days),
//         style:{
//             icon:'fa-envelope',
//             btn:btn,
//             alert:alert
//         }   
//     }); 
// });


// return new Promise((resolve) => {
//     resolve({notifications:notifications,count:notifications.length});
// });