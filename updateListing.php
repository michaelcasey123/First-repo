<?php

// echo "updateListing.php acknowledges..."; // debug code

$response="";

$ad_id = $_GET['ads_id'];	 					// originates from database
$status = 'active'; 							// defined here
$titleraw = htmlspecialchars($_GET['advertTitle']);
$title = strip_tags($titleraw);
if (strlen($title)<3)
{
$response .= "Please include a proper title.";
}
$descriptionraw = htmlspecialchars($_GET['description']);
$description = strip_tags($descriptionraw);
if (strlen($description)<3)
{
$response .= "Please include a proper description.";
}
$phoneraw = htmlspecialchars($_GET['phone']);
$phone = strip_tags($phoneraw);
if (strlen($phone)<7)
	{
	$response .= "Please include your correct full contact phone number.<br/>";
	}
$contact_by_email = $_GET['allowEmail'];		// originates from drop-down list

$emailraw = htmlspecialchars($_GET['email']);
$email = strip_tags($emailraw);

if (filter_var($email, FILTER_VALIDATE_EMAIL))
	{
	$response .="";
	}
else
	{
	$response .= "Please include your correct email. It need not be made public.<br/>";
	}
$date_lost_foundraw = htmlspecialchars($_GET['date_lost_found']); 	// originates from drop-down lists
$date_lost_found = strip_tags($date_lost_foundraw);
if ($date_lost_found != "undefined" && strlen($date_lost_found)!=10)
	{
	$response .= "Please ensure that date format yyyy-mm-dd is used. (e.g. 2013-02-14)<br/>";
	}

$sale_priceraw = htmlspecialchars($_GET['sale_price']);
$sale_priceEur = strip_tags($sale_priceraw);
$sale_price = ltrim($sale_priceEur,'EUR');
$sale_price = intval($sale_price*100)/100; 		// non-numbers are rendered as 0
$price_type_id = ($sale_price == "undefined"||intval($sale_price) <= 0)?2:1; // defined here


/* response = send the sent variables back

$response .= "ad id = ".$ad_id."<br/>title = ".$title."<br/>description = ".$description."<br/>phone = ".$phone."<br/>contact_by_email = ".$contact_by_email."<br/>email = ".$email."<br/>date_lost_found = ".$date_lost_found."<br/>sale_price = ".$sale_price."<br/>price_type_id = ".$price_type_id;
*/

if ($response == "")// no problems
{


	if ($date_lost_found == "undefined")
		{
		$date_lost_found = NULL;
		}

include "dbconfig.php";

$sqlQuery = "UPDATE ads SET status ='active', title ='".$title."', description ='".$description."', phone ='".$phone."', contact_by_email = '".$contact_by_email."', email ='".$email."', date_lost_found = '".$date_lost_found."', sale_price ='".$sale_price."', date_updated =NOW(), price_type_id = '".$price_type_id."' WHERE id = ".$ad_id.";";

$result = mysql_query($sqlQuery);
if ($result)
{
$sqlQuery = "SELECT `pet_type_id`, `user_id` FROM ads WHERE `id` = '".$ad_id."';";
			$result = mysql_query($sqlQuery);
	
			if ($result)
				{
				list($animal_id, $user_id) = mysql_fetch_row($result);

				$sqlQuery = "UPDATE users SET phone = '".$phone."', email = '".$email."', date_updated = NOW() WHERE id = ".$user_id.";";					
				$result = mysql_query($sqlQuery);
				if (!$result)
					{echo "Update of users failed.";} 
				echo $animal_id;
				}
			else {echo "Cannot find id..";}
}
else
{die("Failure: " . mysql_error($link_id));}




die();// get out of database

mysql_close($link_id); // close the connection


}
else
{
$response .= "Update did not take place.";
echo $response;
}

?>
