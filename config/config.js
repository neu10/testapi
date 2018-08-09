exports.db = {
        "host":"incedodb.c7yfdwyxpwb2.us-east-2.rds.amazonaws.com",
        "database":"SOLARDB",
        "port":1521,
        "username":"incedoadmin",
        "password":"Incedo_2018",
        "reconnect":true,
        "data_source_provider":"rds",
        "type":"oracle",
        "connectString":"//incedodb.c7yfdwyxpwb2.us-east-2.rds.amazonaws.com:1521/SOLARDB"
}

exports.config = {
        "deviceDataEmitTimeInSeconds" : "20",
        "weatherAPIID": "b6907d289e10d714a6e88b30761fae22"
}
