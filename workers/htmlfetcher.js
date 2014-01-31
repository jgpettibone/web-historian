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

// archive.downloadUrls(archive.readListOfUrls(null, function(list){
//   return list;
// }));