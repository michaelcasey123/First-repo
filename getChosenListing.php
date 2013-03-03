<?php
$theID = $_GET["theID"];// this is the ID from the chosen animal

//$htmlString = "";

$title;
$dateAdded;
$lfDateAdded;
$ownersName;
$description;
$price;
$telephone;
$email;
$county;
$countyID;
$adType;

//echo "getChosenListing.php acknowledges. The petID is ".$theID;// debug code

include "dbconfig.php";

$sqlQuery = "SELECT a.title, a.description, a.location_county_id, a.sale_price, a.date_lost_found, a.date_created, a.ad_type_id, u.name, u.phone,  u.email, a.contact_by_email
FROM ads AS a INNER JOIN users AS u ON a.user_id = u.id
WHERE a.id = '".$theID."';";

$result = mysql_query($sqlQuery);

if ($result) {
	while($pet = mysql_fetch_assoc($result))
	{
	$title = substr($pet["title"],0,38);
	$description = $pet["description"];
	$countyID = $pet["location_county_id"];
	$price = ($pet["sale_price"]!=NULL && $pet["sale_price"]!="0")?"€".$pet["sale_price"]:"Price not relevant.";	
	$lfDateAdded = $pet["date_lost_found"];
	$dateAdded = $pet["date_created"];
	$adType = $pet["ad_type_id"];
	$ownersName = $pet["name"];
	$telephone = $pet["phone"];
	$email = ($pet["contact_by_email"]=="1")?$pet["email"]:"";
	}
	$sqlQuery = "SELECT name FROM location_counties WHERE old_county_id = '".$countyID."';";
	$result = mysql_query($sqlQuery);
	if ($result) 
		{
		while($pet = mysql_fetch_assoc($result))
			{
			$county = $pet["name"];
			}
		}
	else
		{
		die("Failure: " . mysql_error($link_id));
		}
}
else
{
die("Failure: " . mysql_error($link_id));
}

$lfday = substr($lfDateAdded,8,2);
$lfmonth = substr($lfDateAdded,5,2);
$lfyear = substr($lfDateAdded,0,4);

$day = substr($dateAdded,8,2);
$month = substr($dateAdded,5,2);
$year = substr($dateAdded,0,4);



$records = array ('title' => $title, 'description' => $description, 'ownersName' => $ownersName, 'price' => $price, 'day' => $day, 'month' => $month, 'year' => $year, 'adType' => $adType, 'telephone' => $telephone, 'email' => $email, 'county' => $county, 'lfday' => $lfday, 'lfmonth' => $lfmonth, 'lfyear' => $lfyear);

$jsonOutput =  json_encode($records);

echo $jsonOutput;

die();// get out of database

mysql_close($link_id); // close the connection
?>
