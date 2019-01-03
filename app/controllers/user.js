exports.get = async (req,res,next) => {
    const User = require('../models/user');

    try {
        const users = await User.find({}).exec();
        res.status(200).json({ok:true, response:users});
    } catch (error) {
        next(error);
    }
}