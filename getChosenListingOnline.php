<?php
$theID = $_GET["theID"];// this is the ID from the chosen animal

//echo "getChosenListingOnline.php acknowledges. The petID is ".$theID;// debug code

//		          			DB_HOST,   DB_USER,  			DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'webelevate11_app', '4pp@W3b3LvL11');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		DB_DATABASE
mysql_select_db("webelevate11_app", $link_id);


$sqlQuery = "SELECT a.id, p.name_plural, a.title, a.description , a.sale_price, c.name, u.phone,  u.email, a.contact_by_email
FROM ads AS a INNER JOIN users AS u ON a.user_id = u.id INNER JOIN pet_type AS p ON a.pet_type_id = p.old_pet_type_id INNER JOIN location_counties AS c ON a.location_county_id = c.old_county_id INNER JOIN ad_type AS t ON a.ad_type_id = t.id
WHERE a.id = '".$theID."'";



$result = mysql_query($sqlQuery);

if ($result) {
// $htmlString is a variable to build the complete listing before sending it back to the calling function
while($pet = mysql_fetch_assoc($result))
{
	$htmlString = "<p>";
	$htmlString .=  $pet["name_plural"];
	$htmlString .= "<br/>"; 
	$htmlString .= $pet["title"]; 
	$htmlString .= "<br/>"; 
	$htmlString .= $pet["description"]; 
	$htmlString .= "<br/>";
	$htmlString .= ($pet["sale_price"]!=NULL)?"€".$pet["sale_price"]:"Price not relevant.";//Ternary op
	$htmlString .= "<br/>"; 
	$htmlString .= $pet["name"]; 
	$htmlString .= "<br/>"; 
	$htmlString .= "Tel. ".$pet["phone"]; 
	$htmlString .= "<br/>"; 
	$htmlString .=  ($pet["contact_by_email"]=="1")?$pet["email"]:"";//Ternary operator
	$htmlString .= "</p>";
}
	echo $htmlString ; // send this back to the calling function

}else
{die("Failure: " . mysql_error($link_id));}

die();// get out of database

mysql_close($link_id); // close the connection
?>
