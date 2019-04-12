exports.get = async (req,res) => {
    const User = require('../models/user');
    const Package = require('../models/package');
    const Company = require('../models/company');
    const notification = require('../services/notification');

    try {
        const users = await User.countDocuments({"mail":{ $ne: null }}).exec();
        const packages = await Package.estimatedDocumentCount().exec();
        const companies = await Company.estimatedDocumentCount().exec();
        const notifications = await notification.get().then();
        res.status(200).json({ok:true,data:{counts:{users,packages,companies,notifications:notifications.count}}});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, error});
    }
}