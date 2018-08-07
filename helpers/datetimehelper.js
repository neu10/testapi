const moment = require('moment');

exports.getDayStartTimestamp = function () {
    let zoneOffsetMS = minutesToSeconds(moment().utcOffset());
    let startDay;
    startDay = moment().startOf('day').unix() + zoneOffsetMS;
    return startDay*1000; // 1000 for db TS match
}

exports.getDayStartTimestampByDate = function (date) {
    let zoneOffsetMS = minutesToSeconds(moment().utcOffset());
    let startDay;
    startDay = moment(date).startOf('day').unix() + zoneOffsetMS;
    return startDay*1000; // 1000 for db TS match
}

exports.getUnixTimeStampOfTime = function (time) {
    let zoneOffsetMS = minutesToSeconds(moment(time).utcOffset());
    let unixTimeStamp;
    unixTimeStamp = moment(time).unix() + zoneOffsetMS;
    return unixTimeStamp*1000; // 1000 for db TS match
}

exports.milliSecondsInADay = function() {
    return 24*60*60*1000;
}

function minutesToSeconds(mins) {
    return mins*60;
}
