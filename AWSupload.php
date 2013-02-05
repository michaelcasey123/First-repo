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

	$bucket = 'test.pets.ie';

$newfilename = '681360057990.jpg';

	$response = $s3->create_object($bucket,$newfilename,array(
		'fileUpload'=>'../uploads/'.$newfilename));

print_r($response);
?>
