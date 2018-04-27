module.exports = message => {
  const zerofill = num => {
    return ('0'+num).slice(-2);
  };

  const getUTC = date_str => {
    console.log(date_str);
    const date = new Date(date_str);
    return date.getUTCFullYear() +
      zerofill(date.getUTCMonth()+1) +
      zerofill(date.getUTCDate()) +
      'T' +
      zerofill(date.getUTCHours()) +
      zerofill(date.getUTCMinutes()) +
      zerofill(date.getUTCSeconds()) +
      'Z';
  };

  const getTitle = ()=>{
    const defaultTitle = '予定タイトル';
    const regexp = /「(\S+)」/;

    return (regexp.test(message))
      ? message.match(regexp)[1]
      : defaultTitle;
  };

  const getDates = ()=>{
    const getResult = (start = '20:00', end = '22:00')=>{
      const date = new Date();
      return getUTC(`${date.getFullYear()}-${zerofill(date.getMonth()+1)}-${zerofill(date.getDate())}T${start}:00+09:00`) +
        `/` +
        getUTC(`${date.getFullYear()}-${zerofill(date.getMonth()+1)}-${zerofill(date.getDate())}T${end}:00+09:00`);
    };
    const regexp = /(\d+:\d+)[~|〜|から](\d+:\d+)/;

    if(regexp.test(message)) {
      return getResult(message.match(regexp)[1], message.match(regexp)[2])
    } else {
      return getResult();
    }
  };

  const getUrl = ()=>{
    const defaultUrl = 'https://tabelog.com/';
    const regexp = /([http|https]:\/\/.+)/;

    return (regexp.test(message))
      ? message.match(regexp)[1]
      : defaultUrl;
  };

  return `http://www.google.com/calendar/event` +
    `?action=TEMPLATE` +
    `&text=${encodeURIComponent(getTitle())}` +
    `&dates=${getDates()}` +
    `&trp=false` +
    `&sprop=${encodeURIComponent(getUrl())}`;
};
