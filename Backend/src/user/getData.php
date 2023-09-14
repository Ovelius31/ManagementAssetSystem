<?php
// Establish a database connection (replace with your database credentials)
$host = "localhost";
$username = "root";
$password = "";
$database = "item_management_system";

$mysqli = new mysqli($host, $username, $password, $database);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Query to retrieve user data
$query = "SELECT * FROM user";
$result = $mysqli->query($query);

if (!$result) {
    die("Query failed: " . $mysqli->error);
}

// Fetch user data and store it in an array
$userData = array();
while ($row = $result->fetch_assoc()) {
    $userData[] = $row;
}

// Close the database connection
$mysqli->close();

// Return user data as JSON
header('Content-Type: application/json');
echo json_encode($userData);
?>
