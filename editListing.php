<?php

$ads_id = $_GET["adID"];
$errors = "";

include "dbconfig.php";

$sqlQuery = "SELECT user_id, title, description, location_county_id, sale_price, date_lost_found, ad_type_id, pet_type_id, contact_by_email FROM `ads` WHERE id = '".$ads_id."';";
$result = mysql_query($sqlQuery);

if ($result) 
	{
	while($pet = mysql_fetch_assoc($result))
		{
		$user_id = $pet["user_id"];
		$title = $pet["title"];
		$description = $pet["description"];
		$county_id = $pet["location_county_id"];
		$sale_price = $pet["sale_price"];
		$date_lost_found = substr($pet["date_lost_found"],0,10);
		$listingType = $pet["ad_type_id"];
		$animal_id = $pet["pet_type_id"];
		$contact_by_email = $pet["contact_by_email"];

		$sqlQuery = "SELECT phone, email FROM `users` WHERE id = '".$user_id."';";
		$result = mysql_query($sqlQuery);

		if ($result) 
			{
			while($pet = mysql_fetch_assoc($result))
				{
				$phone = $pet["phone"];
				$email = $pet["email"];
				}
			}
		else
			{
			$errors .= "Could not get email and phone number. ";
			}	
		}
		$sqlQuery = "SELECT name FROM `pet_type` WHERE old_pet_type_id = '".$animal_id."';";
		$result = mysql_query($sqlQuery);

		if ($result) 
			{
			while($pet = mysql_fetch_assoc($result))
				{
				$animal = $pet["name"];
				}
			}
		else
			{
			$errors .= "Could not get animal type. ";
			}

		$sqlQuery = "SELECT name FROM location_counties WHERE `old_county_id` = '".$county_id."';";
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
			$errors .= "Could not get county name. ";
			}
	}
else
	{
	die("Failure: " . mysql_error($link_id));
	}

$records = array ('errors' => $errors, 'animal' => $animal, 'title' => $title, 'description' => $description, 'sale_price' => $sale_price, 'date_lost_found' => $date_lost_found, 'county' => $county, 'listingType' => $listingType, 'phone' => $phone, 'email' => $email, 'contact_by_email' => $contact_by_email);

$jsonOutput =  json_encode($records);

echo $jsonOutput;

die();// get out of database?

mysql_close($link_id); // close the connection

?>
