const config = require('./config');
module.exports = {
    "db":{
        "host": process.env.DB_HOST || config.db.host,
        "database": process.env.DB_DATABASE || config.db.database,
        "port": process.env.DB_PORT || config.db.port,
        "username": process.env.DB_USERNAME || config.db.username,
        "password": process.env.DB_PASSWORD || config.db.password,
        "reconnect": true,
        "data_source_provider": process.env.DB_SOURCE_PROVIDER || config.db.data_source_provider,
        "type": process.env.DB_TYPE || config.db.type,
        "connectString": process.env.DB_CONNECTION_STRING || config.db.connectString,
        "poolMin": 10,
        "poolMax": 10,
        "poolIncrement": 0
    }
}
