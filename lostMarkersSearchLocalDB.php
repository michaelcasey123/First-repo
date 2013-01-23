<?php

$pettype = $_GET["pettype"];
$theCounty = $_GET["theCounty"];

//		           DB_HOST,  DB_USER,  DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		 DB_DATABASE
mysql_select_db("db1020773_pets", $link_id);

$sqlQuery = "SELECT a.longitude, a.latitude
FROM ads AS a INNER JOIN pet_type AS p ON a.pet_type_id = p.old_pet_type_id INNER JOIN location_counties AS c ON a.location_county_id = c.old_county_id INNER JOIN ad_type AS t ON a.ad_type_id = t.id
WHERE a.date_created > '2012-06' AND a.status = 'active' AND p.name = '".$pettype."' AND c.name = '".$theCounty."' AND t.name = 'Lost & Found' AND (a.title LIKE '%lost%' OR a.title LIKE '%miss%' OR a.description LIKE '%lost%' OR a.description LIKE '%miss%');";

$result = mysql_query($sqlQuery);

if ($result) {
// $jsonString is a variable to build the complete json object before displaying it
	$jsonString = '{"data":[';  // open the outer object and array
	
	while($pet = mysql_fetch_assoc($result))
	{
		$jsonString .=  '{"lat":';//start contents of array
		$jsonString .=  $pet['latitude'] ; //add Latitude figure
		$jsonString .=  ',"lng":';// introduce lng			
		$jsonString .=  $pet['longitude'];// add Longitude figure
		$jsonString .=  '},'; // close the inner object
	}

		$jsonString = rtrim($jsonString,","); // remove the last comma
		$jsonString .=  ']}'; // close the array and outer object 

	
	echo $jsonString ; // send this string to the calling function

}else{

die("Failure: " . mysql_error($link_id));

}

die();// get out of database?

mysql_close($link_id); // close the connection

?>
