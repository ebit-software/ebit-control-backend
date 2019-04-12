module.exports.sendProform = async (req,res,next) => {
    const mailer = require('../services/mailer');
    // const packages = req.body.packages;

    // let packages = {
    //     basic:true,
    //     business:false,
    //     enterprise:false,
    // };

    try {
       await mailer.sendProform(req.body.to,req.body.subject,req.body.text);
       res.status(200).json({ok:true});
    } catch (error) {
        res.status(500).json({ok:true});
    }

}