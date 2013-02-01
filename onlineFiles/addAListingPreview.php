<?php

$userid = $_GET['userid'];
$allowEmail = $_GET['allowEmail'];
$animal = $_GET['animal'];
$county = $_GET['county'];
$advertTitle = $_GET['advertTitle'];
$description = $_GET['description'];
$price = $_GET['price'];
$latitude = $_GET['latitude'];
$longitude = $_GET['longitude'];

//	        	           DB_HOST,  	DB_USER, 			 DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'webelevate11_app', '4pp@W3b3LvL11');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }

//				 DB_DATABASE
mysql_select_db("webelevate11_app", $link_id);

$sqlQuery = "SELECT phone, email FROM users WHERE id = '".$userid."';";
$result = mysql_query($sqlQuery);
if ($result) {
	while($pet = mysql_fetch_assoc($result))
		{
		$phone = $pet["phone"];
		$email = ($allowEmail =="1")?$pet["email"]:"";//Ternary operator
		}
}else
{die("Failure: " . mysql_error($link_id));}


$sqlQuery = "SELECT name FROM pet_type WHERE old_pet_type_id = '".$animal."';";
$result = mysql_query($sqlQuery);
if ($result) {
while($pet = mysql_fetch_assoc($result))
	{
	$animal = $pet['name'];
	}
}else
{die("Failure: " . mysql_error($link_id));}

$sqlQuery = "SELECT name FROM location_counties WHERE old_county_id = '".$county."';";
$result = mysql_query($sqlQuery);
if ($result) {
while($pet = mysql_fetch_assoc($result))
	{
	$county = $pet["name"];
	}
}else
{die("Failure: " . mysql_error($link_id));}

echo $animal."<br/>".$advertTitle."<br/>".$description."<br/>".$price."<br/>".$county."<br/>".$phone."<br/>".$email."<br/>".$latitude."<br/>".$longitude; // latitude & longitude added for debug purposes.
		

die();// get out of database

mysql_close($link_id); // close the connection
?>
