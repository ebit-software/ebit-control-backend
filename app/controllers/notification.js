module.exports.create = async(req,res) => {

    const Notification = require('../models/notification');
    const Company = require('../models/company');
    const moment = require('moment');

    let companies = [];

    try {
        companies = await Company.find().sort({name:1}).exec();
    } catch (error) {
        res.status(500).json({ok:true, error});    
    }

    //aqui hago la revision solo para cpanel
    for (const index in companies) {

        let company = companies[index];
        
        let currentDate = moment().format('YYYY-MM-DD').split('-');
        let cpanelExpireDate = moment(company.account.cpanel.expired_date).format('YYYY-MM-DD').split('-');
        let cd = moment([currentDate[0], currentDate[1], currentDate[2]]);//current date
        let ce = moment([cpanelExpireDate[0], cpanelExpireDate[1],cpanelExpireDate[2]]);//cpanel expire
        let days = ce.diff(cd, 'days');



        //cuando est por expirar 
        if (days == 20 || days < 20 && days >= 0) {

            try {
                let checkTimeOut = await Notification.findOne({ company:company._id, type:'cpanel', state:'time out' }).exec();
                if(checkTimeOut != null) await Notification.deleteOne({company:company._id, type:'cpanel', state:'time out'}).exec();

                let notification = await Notification.findOne({ company:company._id, type:'cpanel', state:'to expire' }).exec(); 
                let message = `La cuenta cpanel ${company.account.cpanel.username.trim()} expira en ${days} días`;
                if(days == 1) message = `La cuenta cpanel ${company.account.cpanel.username.trim()} expira mañana`;



                let nt = Notification({
                    company:company._id,
                    type:'cpanel',
                    message:message,
                    state:'to expire',
                    created_at:moment().format('YYYY-MM-DD')
                });

                if (notification == null) {
                    await nt.save();
                } else {
                    nt = { message:message };
                    await Notification.updateOne({company:company._id, type:'cpanel', state:'to expire'},nt).exec();
                }

            } catch (error) {
                next(error);
            }

        }

        //cuando ya expiro
        if (Math.sign(days) == -1 || Math.sign(days) == -0) {

            try {
                let checkToExpire = await Notification.findOne({ company:company._id, type:'cpanel', state:'to expire' }).exec();
                if(checkToExpire != null) await Notification.deleteOne({company:company._id, type:'cpanel', state:'to expire'}).exec();

                let notification = await Notification.findOne({ company:company._id, type:'cpanel', state:'time out' }).exec();
                let message =  `La cuenta cpanel ${company.name.trim()} expiro hace ${Math.abs(days)} dias`
                if(days == 0) message = `La cuenta cpanel ${company.account.cpanel.username.trim()} expiro hoy`;
                if(days == -1) message = `La cuenta cpanel ${company.account.cpanel.username.trim()} expiro ayer`;

                let nt = Notification({
                    company:company._id,
                    type:'cpanel',
                    message: message,
                    state:'time out',
                    created_at:moment().format('YYYY-MM-DD')
                });

                if (notification == null) {
                    await nt.save();
                } else {
                    nt = { message:message };
                    await Notification.updateOne({company:company._id, type:'cpanel', state:'time out'},nt).exec();
                }

            } catch (error) {
                next(error);
            }

        }

        //cuando no es ninguna de las dos
        if(days > 20) {
            try {
                let checkTimeOut = await Notification.findOne({ company:company._id, type:'cpanel', state:'time out' }).exec();
                let checkToExpired = await Notification.findOne({ company:company._id, type:'cpanel', state:'to expire' }).exec();
                if (checkTimeOut != null) await Notification.deleteOne({company:company._id, type:'cpanel', state:'time out'}).exec();
                if (checkToExpired != null) await Notification.deleteOne({company:company._id, type:'cpanel', state:'to expired'}).exec();     
            } catch (error) {
                next(error);
            }
        };

    }

    //aqui hago la revision solo para dominio
    for (const index in companies) {

        let company = companies[index]; 
        let currentDate = moment().format('YYYY-MM-DD').split('-');
        let domainExpireDate = moment(company.account.domain.expired_date).format('YYYY-MM-DD').split('-');
        let cd = moment([currentDate[0], currentDate[1], currentDate[2]]);//current date
        let de = moment([domainExpireDate[0], domainExpireDate[1], domainExpireDate[2]]);//domain expire
        let days = de.diff(cd, 'days');


        //cuando est por expirar 
        if (days == 20 || days < 20 && days >= 0) {

            try {
                let checkTimeOut = await Notification.findOne({ company:company._id, type:'domain', state:'time out' }).exec();
                if(checkTimeOut != null) await Notification.deleteOne({company:company._id, type:'domain', state:'time out'}).exec();

                let notification = await Notification.findOne({ company:company._id, type:'domain', state:'to expire' }).exec(); 
                let message = `El dominio ${company.account.domain.name.trim()} expira en ${days} días`;
                if(days == 1) message = `El dominio ${company.account.domain.name.trim()} expira mañana`;



                let nt = Notification({
                    company:company._id,
                    type:'domain',
                    message:message,
                    state:'to expire',
                    created_at:moment().format('YYYY-MM-DD')
                });

                if (notification == null) {
                    await nt.save();
                } else {
                    nt = { message:message };
                    await Notification.updateOne({company:company._id, type:'domain', state:'to expire'},nt).exec();
                }

            } catch (error) {
                next(error);
            }

        }

        //cuando ya expiro
        if (Math.sign(days) == -1 || Math.sign(days) == -0) {

            try {
                let checkToExpire = await Notification.findOne({ company:company._id, type:'domain', state:'to expire' }).exec();
                if(checkToExpire != null) await Notification.deleteOne({company:company._id, type:'domain', state:'to expire'}).exec();

                let notification = await Notification.findOne({ company:company._id, type:'domain', state:'time out' }).exec();

                let message =  `El dominio ${company.name.trim()} expiro hace ${Math.abs(days)} dias`
                if(days == 0) message = `El dominio ${company.account.domain.name.trim()} expiro hoy`;
                if(days == -1) message = `El dominio ${company.account.domain.name.trim()} expiro ayer`;

                let nt = Notification({
                    company:company._id,
                    type:'domain',
                    message: message,
                    state:'time out',
                    created_at:moment().format('YYYY-MM-DD')
                });

                if (notification == null) {
                    await nt.save();
                }else {
                    nt = { message:message };
                    await Notification.updateOne({company:company._id, type:'domain', state:'time out'},nt).exec();
                }
                

            } catch (error) {
                next(error);
            }

        }

        //cuando no es ninguna de las dos
        if(days > 20) {
            try {
                let checkTimeOut = await Notification.findOne({ company:company._id, type:'domain', state:'time out' }).exec();
                let checkToExpired = await Notification.findOne({ company:company._id, type:'domain', state:'to expire' }).exec();
                if (checkTimeOut != null) await Notification.deleteOne({company:company._id, type:'domain', state:'time out'}).exec();
                if (checkToExpired != null) await Notification.deleteOne({company:company._id, type:'domain', state:'to expired'}).exec();     
            } catch (error) {
                next(error);
            }
        };

    }

    res.status(200).json({ok:true, message:'notifications created'});
}

module.exports.get = async(req,res) => {
    try {
        const Notification = require('../models/notification');
        let notifications = await Notification.find().exec();
        res.status(200).json({ok:true, notifications});
    } catch (error) {
        res.status(500).json({ok:false, error});
    }

}

module.exports.count = async (req,res) => {

    const Notification = require('../models/notification');

    let type = req.query.type;
    let state = req.query.state;
    let read = req.query.read;

    if (type && state) {
        try {
            let count = await Notification.countDocuments({type:type, state:state}).exec();
            res.status(200).json({ok:true, count});
        } catch (error) {
            res.status(500).json({ok:false, error});
        }
    } else if (read) {
        try {
            let count = await Notification.countDocuments({read:read}).exec();
            res.status(200).json({ok:true, count});
        } catch (error) {
            res.status(500).json({ok:false, error});
        }
    } else {
        try {
            let count = await Notification.estimatedDocumentCount().exec();
            res.status(200).json({ok:true, count});
        } catch (error) {
            res.status(500).json({ok:false, error});
        }
    }

    
}
