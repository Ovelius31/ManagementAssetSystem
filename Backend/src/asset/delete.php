<?php
// Pastikan ini adalah koneksi ke database yang benar
$mysqli = new mysqli("localhost", "root", "", "item_management_system");

// Periksa koneksi
if($mysqli === false){
    die("ERROR: Koneksi gagal. " . $mysqli->connect_error);
}

// Mengambil ID yang akan dihapus dari permintaan HTTP DELETE
$id = $_GET['id'];

// Menghapus data dari tabel asset berdasarkan ID
$sql = "DELETE FROM asset WHERE id = ?";
if($stmt = $mysqli->prepare($sql)){
    $stmt->bind_param("i", $id_param);

    // Membuat parameter
    $id_param = $id;

    // Mengeksekusi pernyataan
    if($stmt->execute()){
        // Kirim respons sukses ke sisi klien
        $response = array("success" => true);
        echo json_encode($response);
    } else{
        // Kirim respons error ke sisi klien
        $response = array("success" => false);
        echo json_encode($response);
    }

    // Menutup pernyataan
    $stmt->close();
}

// Menutup koneksi
$mysqli->close();
?>
