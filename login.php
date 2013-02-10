<?php

$response="";

$emailraw = htmlspecialchars($_GET['email']);

$email = strip_tags($emailraw);


if (!filter_var($email, FILTER_VALIDATE_EMAIL))
	{
	$response .= "That email address is not valid.<br/>";
	}

$passwordraw = htmlspecialchars($_GET['password']);

$password = strip_tags($passwordraw);

$response .= "email is ".$email." password is ".$password."... ";

if (strlen($password)<6)
	{
	$response .= "Your password has at least 6 characters.<br/>";
	}

if (filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($password)>=6)
{

include "dbconfig.php";

$sqlQuery = "SELECT id FROM users WHERE email = '".$email."' AND password = '".$password."';";

$result = mysql_query($sqlQuery);

list($id) = mysql_fetch_row($result);


if ($result) {
	echo $id;
}else{
echo "Login failed. Please amend details and try again.";
die("Failure: " . mysql_error($link_id));

}

die();// get out of database?

mysql_close($link_id); // close the connection

}
else
{
echo $response;
}

