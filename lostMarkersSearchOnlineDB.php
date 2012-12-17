<?php

$pettype = $_GET["pettype"];
$theCounty = $_GET["theCounty"];

//		           DB_HOST,  DB_USER,  DB_PASSWORD, 
$link_id = mysql_connect('localhost', '778331_root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		 DB_DATABASE
mysql_select_db("michaelcasey123_zxq_mtcdb1", $link_id);

$sqlQuery = "SELECT petLatitude, petLongitude FROM pet WHERE petType = '".$pettype."' AND petCounty = '".$theCounty."' AND petListingType = 'Lost'";

$result = mysql_query($sqlQuery);

if ($result) {
// $jsonString is a variable to build the complete json object before displaying it
	$jsonString = '{"data":[';  // open the outer object and array
	
	while($pet = mysql_fetch_assoc($result))
	{
		$jsonString .=  '{"lat":';//start contents of array
		$jsonString .=  $pet['petLatitude'] ; //add Latitude figure
		$jsonString .=  ',"lng":';// introduce lng			
		$jsonString .=  $pet['petLongitude'];// add Longitude figure
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
