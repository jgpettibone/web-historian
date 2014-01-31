// eventually, you'll have some code here that uses the code in `archive-helpers.js` 
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(null, function(siteArray){

  console.log('our site array is ', siteArray);
  for (var i = 0; i < siteArray.length; i++) {
    if (siteArray[i]) {
      archive.downloadUrls(siteArray[i]);
    }
  }

});

// FYI - our cron job command
//*/1 * * * * /Users/hackreactor/.nvm/v0.10.15/bin/node /Users/hackreactor/Documents/felix/2014-01-web-historian/workers/htmlfetcher.js