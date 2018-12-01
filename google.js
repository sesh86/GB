const googleTrends = require('google-trends-api');

googleTrends.relatedQueries({keyword: 'amazon web services'})
.then(function(results){
  results=JSON.parse(results)
  console.log('These results are awesome', results.default.rankedList);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
