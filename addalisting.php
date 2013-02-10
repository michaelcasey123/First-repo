<?php

// echo "addalisting.php acknowledges..."; // debug code

$response="";

$userid = $_GET['userid'];	 					// originates from database
$status = 'active'; 							// defined here
$titleraw = htmlspecialchars($_GET['advertTitle']);
$title = strip_tags($titleraw);
$descriptionraw = htmlspecialchars($_GET['description']);
$description = strip_tags($descriptionraw);
$location_country_id; 							// originates from database
$location_county = $_GET['county']; 			// originates from drop-down list
$phone; 										// originates from database
$contact_by_phone = '1'; 						// defined here
$contact_by_email = $_GET['allowEmail'];		// originates from drop-down list
$email; 										// originates from database
$longitude = $_GET['longitude'];		 		// generated by Phonegap/Cordova
$latitude = $_GET['latitude']; 					// generated by Phonegap/Cordova
$date_lost_found = $_GET['date_lost_found']; 	// originates from drop-down lists
$sale_priceraw = htmlspecialchars($_GET['sale_price']);
$sale_price = strip_tags($sale_priceraw);
$sale_price = intval($sale_price*100)/100; 		// non-numbers are rendered as 0
$ad_type_id = $_GET['ad_type_id']; 				// originates from drop-down list
$pet_type_id = $_GET['pet_type_id']; 			// originates from drop-down list
$price_type_id = ($sale_price == "undefined"||intval($sale_price) <= 0)?2:1; // defined here

include "dbconfig.php";

$sqlQuery = "SELECT phone FROM users WHERE id = '".$userid."';";
$result = mysql_query($sqlQuery);
if ($result) {
	while($pet = mysql_fetch_assoc($result))
		{
		$phone = $pet["phone"];
		}
}else
{die("Failure: " . mysql_error($link_id));}

$sqlQuery = "SELECT country_id FROM location_counties WHERE old_county_id = '".$location_county."';";
$result = mysql_query($sqlQuery);
if ($result) {
	while($pet = mysql_fetch_assoc($result))
		{
		$location_country_id = $pet["country_id"];
		}
}else
{die("Failure: " . mysql_error($link_id));}


if ($title == "")
	{
	$response .= "Please include a title for the advert.<br/>";
	}

if ($description == "")
	{
	$response .= "Please include a description for the advert.<br/>";
	}

if ($location_county == "undefined")
	{
	$response .= "Please re-select your County.<br/>";
	}

if ($ad_type_id == "undefined")
	{
	$response .= "Please re-select your Listing Type.<br/>";
	}

if ($pet_type_id == "undefined")
	{
	$response .= "Please re-select your Pet Type.<br/>";
	}

if ($ad_type_id == '2' && ($date_lost_found == "undefined" || $date_lost_found == "YearMonthDay"))
	{
	$response .= "Please set Date Lost/Found.<br/>";
	}



if (intval($userid)>=1 && strlen($title)>=2 && strlen($description)>=2 && $location_county!="undefined" && $ad_type_id!="undefined" && $pet_type_id!="undefined")
	{
	//$response .= "<br/>Ready to insert to database!<br/>"; // test code

	if ($ad_type_id == '2' && ($date_lost_found == "undefined" || $date_lost_found == "YearMonthDay"))
		{
		$date_lost_found = date("Y-m-d")." 00:00:00";
		}
	else 
		{
		$date_lost_found .= " 00:00:00"; 
		}
	//$response .= "date_lost_found set to ".$date_lost_found."<br/>"; // test code


	$timedatum = date('Y-m-d H:i:s');

	$sqlQuery = "INSERT INTO `ads`(`user_id`, `status`, `title`, `description`, `location_country_id`, `location_county_id`, `phone`, `contact_by_phone`, `contact_by_email`,  `longitude`, `latitude`, `date_lost_found`, `sale_price`, `date_created`, `date_updated`, `ad_type_id`, `pet_type_id`, `price_type_id`) 
	VALUES ('".$userid."','".$status."','".$title."','".$description."','".$location_country_id."','".$location_county."','".$phone."','".$contact_by_phone."','".$contact_by_email."','".$longitude."','".$latitude."','".$date_lost_found."','".$sale_price."',NOW(),NOW(),'".$ad_type_id."','".$pet_type_id."','".$price_type_id."');";

	$result = mysql_query($sqlQuery);

	if ($result) 
		{

		// if insert is successful then ads id is brought out of the database and stored in $ads_id.
			$sqlQuery = "SELECT id FROM ads WHERE user_id = '".$userid."' AND date_created >= '".$timedatum."';";

			$result = mysql_query($sqlQuery);
	
			if ($result)
				{
				list($ads_id) = mysql_fetch_row($result);
				echo $ads_id;
				}
			else {echo "Cannot find id..";}

		}else{
		echo "Advertisement failed. Please amend details and try again.";
		die("Failure: " . mysql_error($link_id));
		}
	}
	else
		{
		echo $response;
		}

die();// get out of database

mysql_close($link_id); // close the connection
?>
