module.exports.sendProform = async (req,res,next) => {
    const mailer = require('../services/mailer');

    try {
       await mailer.sendProform(req.body.to,req.body.subject,req.body.text,req.body.package);
       res.status(200).json({ok:true});
    } catch (error) {
        res.status(400).json({ok:false, message:'Mail not send'});
    }

}

module.exports.createMessage = async (req,res,next) => {
    const Message = require('../models/message');

    const message = new Message({
        name:req.body.name,
        surname:req.body.surname,
        mail:req.body.mail,
        company:req.body.company,
        message:req.body.message,
        date:req.body.date
    });

    try {
        message.save();
        res.status(200).json({ok:true});
    } catch (error) {
        res.status(500).json({ok:false});
    }
    
}

module.exports.getMessages = async (req,res,next) => {
    const Message = require('../models/message');

    if (req.params.id) {
        try {
            let count = await Message.estimatedDocumentCount().exec();
            let data = await Message.findById(req.params.id).exec();
            res.status(200).json({ok:true, data:{count:count, results:data}})
        } catch (error) {
            res.status(500).json({ok:false, error})
        }
    } else {
        try {
            let count = await Message.estimatedDocumentCount().exec();
            let data = await Message.find().exec();
            res.status(200).json({ok:true, data:{count:count, results:data}});
        } catch (error) {
            res.status(500).json({ok:false, error})
        }
    }


}

module.exports.readMessage = async (req,res,next) => {
    const Message = require('../models/message');

    try {
        await Message.findByIdAndUpdate(req.params.id, {read:true});
        res.status(200).json({ok:true});
    } catch (error) {
        res.status(500).json({ok:false, error});
    }
}