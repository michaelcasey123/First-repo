<?php

//		           			DB_HOST,  	DB_USER,  			DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'webelevate11_app', '4pp@W3b3LvL11');
// $link_id = mysql_connect('localhost', 'root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		 DB_DATABASE
mysql_select_db("webelevate11_app", $link_id);
// mysql_select_db("db1020773_pets", $link_id);

