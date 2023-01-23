<?php
	$yourName = $_POST['yourName'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	

	// Database connection
	$conn = new mysqli('localhost','root','','jedidiah-solomon-1');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into myClient(yourName, email, subject, message) values(?, ?, ?, ?)");
		$stmt->bind_param("ssss", $yourName, $email, $subject, $message);
		$execval = $stmt->execute();
		echo $execval;
		echo "Message Sent Successfully!!...";
		$stmt->close();
		$conn->close();
	}
?>
