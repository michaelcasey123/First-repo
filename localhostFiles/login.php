<?php

$response="";

$emailraw = htmlspecialchars($_POST['storedEmailAddress']);

$email = strip_tags($emailraw);


if (!filter_var($email, FILTER_VALIDATE_EMAIL))
	{
	$response .= "That email address is not valid.<br/>";
	}

$passwordraw = htmlspecialchars($_POST['storedPassword']);

$password = strip_tags($passwordraw);


if (strlen($password)<6)
	{
	$response .= "Your password has at least 6 characters.<br/>";
	}

if (filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($password)>=6)
{


//	        	           DB_HOST,  DB_USER,  DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }

//				 DB_DATABASE
mysql_select_db("db1020773_pets", $link_id);

$sqlQuery = "SELECT id FROM users WHERE email = '".$email."' AND password = '".$password."';";

$result = mysql_query($sqlQuery);

list($id) = mysql_fetch_row($result);


if ($result) {
//	echo "Login successful. id no.: ".$id."<br/>";
//	echo "<script>";
	header("Location: index.html#addalisting");
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

