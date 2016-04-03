var https = require('https');

https.get('https://streams.twitch.tv/kraken/streams?limit=5&offset=0&game=Street+Fighter+V&broadcaster_language=&on_site=1', function (res) {
  res.on('data', function (d) {
    console.log('DATA', JSON.parse(d));
  })
});
