<?php
// Koneksi ke database 
$conn = mysqli_connect("localhost", "root", "", "item_management_system");

// Periksa koneksi
if (!$conn) {
    die("Koneksi ke database gagal: " . mysqli_connect_error());
}

// Query untuk mengambil data dari tabel asset
$query = "SELECT * FROM asset";

// Jalankan query
$result = mysqli_query($conn, $query);

// Inisialisasi array untuk data JSON
$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    // Tambahkan setiap baris data ke array
    $data[] = $row;
}

// Tutup koneksi
mysqli_close($conn);

// Mengembalikan data dalam format JSON
header("Content-Type: application/json");
echo json_encode($data);
?>
