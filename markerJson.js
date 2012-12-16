var json;


// the function below uses AJAX to contact the localhost server with data for a database search
function getLostPetMarkers()
{
var my_JSON_object = {};
var http_request = new XMLHttpRequest();

http_request.onreadystatechange=function()
  {
    if (http_request.readyState==4 && http_request.status==200)
    {
      my_JSON_object = JSON.parse(http_request.responseText);
    }
  };

http_request.open("GET","http://localhost/petsie/lostMarkersSearchLocalDB.php?pettype="+$animal+"&theCounty="+$county,true);
http_request.send();
return my_JSON_object;
}
