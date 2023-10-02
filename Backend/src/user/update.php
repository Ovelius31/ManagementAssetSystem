<?php
if(isset($_POST['update_user'])){

    $username = $_POST['Username'];
    $password = $_POST['Password'];
    $division = $_POST['Division'];
    $role = $_POST['Role'];


    // Koneksi ke database 
    $conn = mysqli_connect("localhost", "root", "", "item_management_system");

    // Hash password sebelum menyimpannya ke database 
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Query untuk mengupdate data di tabel user berdasarkan ID
    $query = "UPDATE user SET Username='$username', Password='$hashedPassword', Division='$division', Role='$role' WHERE ID='$id'";

    // Jalankan query
    $result = mysqli_query($conn, $query);

    // Periksa apakah data berhasil diupdate
    if($result) {
        echo "Data user berhasil diupdate.";
    } else {
        echo "Gagal mengupdate data user: " . mysqli_error($conn);
    }

    // Tutup koneksi
    mysqli_close($conn);
}
?>
