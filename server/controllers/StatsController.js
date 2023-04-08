const Stats = require('../models/Stat');


const stats = async (req, res) => {

    console.log('STATS', res.locals)

    const stat = new Stats({
        user: req.user ? req.user._id : null,
        endpoint: req.originalUrl,
        method: req.method,
        status: res.statusCode
    });

    stat.save();

    return res.send(res.locals);

}

module.exports = {
    stats
}