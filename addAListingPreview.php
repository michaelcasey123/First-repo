<?php

$userid = $_GET['userid'];
$allowEmail = $_GET['allowEmail'];
$animal = $_GET['animal'];
$county = $_GET['county'];
$advertTitle = $_GET['advertTitle'];
$description = $_GET['description'];
$price = $_GET['price'];
$listingType = $_GET['listingType']; // 1 or 2
$day = $_GET['day']; // day lost/found
$month = $_GET['month']; // month lost/found
$year = $_GET['year']; // year lost/found

include "dbconfig.php";


$sqlQuery = "SELECT name, phone, email FROM users WHERE id = '".$userid."';";
$result = mysql_query($sqlQuery);
if ($result) {
	while($pet = mysql_fetch_assoc($result))
		{
		$name = $pet["name"];		
		$phone = $pet["phone"];
		$email = $pet["email"];//Ternary operator
		}
}else
{die("Failure: " . mysql_error($link_id));}

/*
$sqlQuery = "SELECT name FROM pet_type WHERE old_pet_type_id = '".$animal."';";
$result = mysql_query($sqlQuery);
if ($result) {
while($pet = mysql_fetch_assoc($result))
	{
	$animal = $pet['name'];
	}
}else
{die("Failure: " . mysql_error($link_id));}
*/

$sqlQuery = "SELECT name FROM location_counties WHERE old_county_id = '".$county."';";
$result = mysql_query($sqlQuery);
if ($result) {
while($pet = mysql_fetch_assoc($result))
	{
	$county = $pet["name"];
	}
}else
{die("Failure: " . mysql_error($link_id));}


$todaysdate = date('d/m/Y');

$htmlString = ""; // variable to build up string to send back to add a listing preview page via AJAX

if ($listingType == 2)
{
$month = trim($month,"-");
$htmlString .= "<p><strong>Lost/Found ".$day."/".$month."/".$year."</strong></p>";
}
else
{
$htmlString .= "<p><strong>For Good Home</strong></p>";
}
$htmlString .= "<p>Location&nbsp&nbsp Co. ".$county."<br/>";
$htmlString .= "Added&nbsp&nbsp&nbsp&nbsp&nbsp ".$todaysdate."<br/>";
$htmlString .= "Contact&nbsp&nbsp&nbsp ".$name."<br/><br/>";
if($price > 0)
{
$htmlString .= "Price&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp €".$price."<br/>";
}
$htmlString .= "Phone&nbsp&nbsp&nbsp&nbsp&nbsp ".$phone."<br/>";
if ($allowEmail == 1)
{
$htmlString .= "Email&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ".$email."<br/>";
}
$htmlString .= "<br/>".$description;

echo $htmlString;



die();// get out of database

mysql_close($link_id); // close the connection
?>
