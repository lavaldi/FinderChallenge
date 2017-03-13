/*
  main script for only runs every function
*/

searchForm();
loadJSON(JSON_FILE, function(content){
	console.log(content);
});
