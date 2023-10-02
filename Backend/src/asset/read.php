<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'item_management_system';

// Membuat koneksi ke database
$mysqli = new mysqli($servername, $username, $password, $database);

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
    // Ubah nama kolom sesuai dengan yang digunakan dalam tabel HTML
    $formattedRow = array(
        "Code Item" => $row['Code Item'],
        "Item Name" => $row['Item Name'],
        "Category" => $row['Category'],
        "Date of Purchase" => $row['Date of Purchase'], 
        "Price" => $row['Price'],
        "Adjustment Date" => $row['Adjustment Date'],
        "Location" => $row['Location'],
        "Condition" => $row['Condition'],
        "Photo" => $row['Photo'],
        "Amount" => $row['Amount']
    );
    $data[] = $formattedRow;
}

// Menutup koneksi database
$mysqli->close();

// Mengirim data sebagai respons JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
