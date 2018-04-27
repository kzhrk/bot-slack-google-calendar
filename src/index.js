const getGoogleCalendarUrl = require('./modules/getGoogleCalendarUrl');

module.exports = (bot)=>{

  bot.hear(/beer/g, res => {
    res.send(getGoogleCalendarUrl(res.message.text));
  });
};
