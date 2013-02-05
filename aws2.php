<?php

// SETUP

	// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
	error_reporting(-1);

	// Set plain text headers
	header("Content-type: text/plain; charset=utf-8");

	// Include the SDK
	require_once '../AWSSDKforPHP/sdk.class.php';
	$time_start = microtime(true);

	// Instantiate the AmazonS3 class
	$s3 = new AmazonS3();

//	$response = $s3->get_bucket_list();

//	print_r($response);


	$bucket = 'test.pets.ie';

	$exists = $s3->if_bucket_exists($bucket);

	if ($exists) 
		{
		$response = "The bucket ".$bucket." exists\n";
		}		
	else 
		{
		$response = "The bucket ".$bucket." does not exist\n";
		}

	print_r($response);

echo "\n";

//	$response = $s3->list_objects($bucket, array('prefix'=>'app'));

//	$response = $s3->list_objects($bucket);
	
//	$response = $s3->get_bucket_object_count($bucket);
	
//	var_dump($response);

//	$response = $s3->get_object_list($bucket, array('prefix'=>'2012/11/'));

//	$s3->delete_object($bucket, 'plain.txt');

	$response = $s3->get_object_list($bucket);

	var_dump($response);



//	echo "\n";

/*	
	if ($response->isOK())
	{
	print_r("List of objects:\n".$response);
//	$response = $s3->get_bucket_object_count($bucket);
//	var_dump($response);
	}
	else
	{
	echo "The list_objects response was not OK\n";
	}
*/	
	
/*
	$response = $s3->create_object($bucket,'Cat7.jpg',array(
		'fileUpload'=>'uploadthese/Cat7.jpg',
		'acl' => $s3::ACL_PUBLIC
));

	print_r($response);

	$response = $s3->get_object_url($bucket,'Cat7.jpg',(time()+600));

	print_r($response);
*/

/*
	$response = $s3->get_object_url($bucket,'plain.txt',(time()+600));

	print_r($response);

*/

//	$response = $s3->delete_object($bucket,'word.doc');

//	$response = $s3->delete_bucket($bucket);

//	var_dump($response->isOK());

	echo PHP_EOL . PHP_EOL . $time . PHP_EOL;

