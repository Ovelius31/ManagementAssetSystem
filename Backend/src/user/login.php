<?php
// Mengecek apakah ada data POST yang dikirimkan dari formulir
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Koneksi ke database (sesuaikan dengan informasi database Anda)
    $db_host = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = "item_management_system";

    $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

    // Periksa koneksi database
    if ($conn->connect_error) {
        die("Koneksi database gagal: " . $conn->connect_error);
    }

    // Periksa informasi login
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Gantilah ini dengan pernyataan SQL yang sesuai untuk mengambil data pengguna dari tabel database
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        header("Location: /Frontend/Pages/dashboard/src/Dashboard.html");
        exit();
    } else {
        // Autentikasi gagal, tampilkan pesan kesalahan
        $error_message = "Username/Password salah";
    }

    // Tutup koneksi ke database
    $conn->close();
}
?>
