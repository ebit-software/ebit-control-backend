
exports.example = (req,res,next) => {
    res.status(200).json({
        ok:true,
        message:'funciona :)'
    })
}