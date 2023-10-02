<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');


$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "item_management_system"; 

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi ke database gagal: " . $conn->connect_error);
}

// Query untuk mengambil data pengguna dari tabel 
$sql = "SELECT * FROM user";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Buat array untuk menyimpan data pengguna
    $users = array();

    // Ambil setiap baris data dan tambahkan ke array
    while ($row = $result->fetch_assoc()) {
        $user = array(
            'Username' => $row['username'],
            'Division' => $row['division'],
            'Role' => $row['role'],
            'Password' => $row['password']
        );
        array_push($users, $user);
    }

    // Mengembalikan data pengguna dalam format JSON
    echo json_encode($users);
} else {
    echo "Tidak ada data pengguna yang ditemukan.";
}

// Tutup koneksi
$conn->close();
?>
