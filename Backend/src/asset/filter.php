<?php
// Sambungkan ke database Anda
$koneksi = new mysqli("localhost", "root", "", "item_management_system");

// Periksa koneksi
if ($koneksi->connect_error) {
    die("Koneksi gagal: " . $koneksi->connect_error);
}

// Ambil parameter filter dari URL
$categoryFilter = $_GET['categoryFilter'];
$locationFilter = $_GET['locationFilter'];
$conditionFilter = $_GET['conditionFilter'];
$dateOfPurchaseFilter = $_GET['dateOfPurchaseFilter'];
$adjustmentDateFilter = $_GET['adjustmentDateFilter'];

// Buat query SQL sesuai dengan filter yang diterima
$sql = "SELECT * FROM asset WHERE 
        Category LIKE '%$categoryFilter%' AND 
        Location LIKE '%$locationFilter%' AND 
        Condition LIKE '%$conditionFilter%' AND 
        `Date of Purchase` LIKE '%$dateOfPurchaseFilter%' AND 
        `Adjustment Date` LIKE '%$adjustmentDateFilter%'";

// Jalankan query
$result = $koneksi->query($sql);

// Simpan hasil query ke dalam array atau objek PHP
$data_assets = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data_assets[] = $row;
    }
}

// Tutup koneksi ke database
$koneksi->close();

// Kembalikan data yang difilter sebagai respons Ajax dalam format JSON
echo json_encode($data_assets);
?>
