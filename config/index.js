const mongoose = require('mongoose')

async function DBConnection(uri, options) {
    return mongoose.connect(uri, options);
}

module.exports = DBConnection