<?php

$response="";

$ipaddress = $_SERVER["REMOTE_ADDR"];

$name_title = $_GET['nameTitle']; // this defaults to ms

$firstNameRaw = htmlspecialchars($_GET['firstName']);

$firstName = strip_tags($firstNameRaw);

if ($firstName == "")
	{
	$response .= "Please include your first name.<br/>";
	}

$secondNameRaw = htmlspecialchars($_GET['secondName']);

$secondName = strip_tags($secondNameRaw);

if ($secondName == "")
	{
	$response .= "Please include your surname.<br/>";
	}

$registerCounty = $_GET['registerCounty']; // this defaults to Dublin

$contactPhoneNumberRaw = htmlspecialchars($_GET['contactPhoneNumber']);

$contactPhoneNumber = strip_tags($contactPhoneNumberRaw);

if (strlen($contactPhoneNumber)<7)
	{
	$response .= "Please include your correct full contact phone number.<br/>";
	}

$contactEmailRaw = htmlspecialchars($_GET['email']);

$contactEmail = strip_tags($contactEmailRaw);

if (!filter_var($contactEmail, FILTER_VALIDATE_EMAIL))
	{
	$response .= "Please include your correct email. It need not be made public.<br/>";
	}

$passwordRaw = htmlspecialchars($_GET['password']);

$password = strip_tags($passwordRaw);

if (strlen($password)<6)
	{
	$response .= "Please include a password of minimum 6 characters.<br/>";
	}

if (strlen($firstName)>=1 && strlen($secondName)>=1 && strlen($contactPhoneNumber)>=7 && filter_var($contactEmail, FILTER_VALIDATE_EMAIL) && strlen($password)>=6)
{
//	        	           DB_HOST,  DB_USER,  DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }

//				 DB_DATABASE
mysql_select_db("db1020773_pets", $link_id);

$sqlQuery = "INSERT INTO `users` (`name_title`, `name`, `user_category`, `location_county_id`, `email`, `phone`, `password`, `status`, `date_last_active`, `ip_address_setup`, `date_created`, `user_category_id`) VALUES ('".$name_title."', '".$firstName." ".$secondName."', 'public', '".$registerCounty."', '".$contactEmail."', '".$contactPhoneNumber."', '".$password."', 'active', NOW(), '".$ipaddress."', NOW(), 1);";

$result = mysql_query($sqlQuery);

if ($result) {

// if insert is successful then id is brought out of the database and stored in $id.
	$sqlQuery = "SELECT id FROM users WHERE email = '".$contactEmail."' AND password = '".$password."';";

	$result = mysql_query($sqlQuery);
	
	if ($result)
		{
		list($id) = mysql_fetch_row($result);
		echo $id;
		}
	else {echo "Cannot find id..";}

}else{
echo "Registration failed. Please amend details and try again.";
die("Failure: " . mysql_error($link_id));

}

die();// get out of database?

mysql_close($link_id); // close the connection
}
else
{
echo $response;
}

