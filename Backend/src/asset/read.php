<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'item_management_system';

// Membuat koneksi ke database
$mysqli = new mysqli($host, $username, $password, $database);

// Memeriksa koneksi
if ($mysqli->connect_error) {
    die('Koneksi gagal: ' . $mysqli->connect_error);
}

// Query untuk mengambil data dari tabel Anda
$query = 'SELECT * FROM asset';

$result = $mysqli->query($query);

if (!$result) {
    die('Query error: ' . $mysqli->error);
}

// Menginisialisasi array untuk menyimpan data
$data = array();

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Menutup koneksi database
$mysqli->close();

// Mengirim data sebagai respons JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
