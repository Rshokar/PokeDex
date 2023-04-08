const Stats = require('../models/Stat');


const stats = async (req, res) => {

    // await Stats.deleteMany();
    console.log('STATS', res.locals)

    const stat = new Stats({
        user: req.user._id,
        endpoint: req.originalUrl,
        method: req.method,
        status: res.statusCode
    });

    stat.save();



    return res.send(res.locals);

}

module.exports = stats