const googleTrends = require('google-trends-api');

googleTrends.relatedQueries({keyword: 'PYTHON training'})
.then(function(results){
  results=JSON.parse(results)
  k=results.default.rankedList[0].rankedKeyword;
  var keywords=[];for(i in k) keywords.push(k[i].query)
  console.log('These results are awesome', keywords);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
