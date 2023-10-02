<?php
//koneksi ke database
$pdo = new PDO("mysql:host=localhost;dbname=item_management_system", "root", "");

$startDate = isset($_GET['startDate']) ? $_GET['startDate'] : null;
$endDate = isset($_GET['endDate']) ? $_GET['endDate'] : null;

$query = "SELECT `Condition` FROM `asset` WHERE `Input Date` BETWEEN :startDate AND :endDate AND `Condition` IN ('New', 'Old', 'Repaired', 'Bad', 'Moved')";

$stmt = $pdo->prepare($query);
$stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
$stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
?>
