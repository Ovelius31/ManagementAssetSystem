<?php
// Koneksi ke database (gantilah dengan koneksi sesuai dengan database Anda)
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "nama_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi database gagal: " . $conn->connect_error);
}

// Query untuk mengambil data pengguna dari database
$sql = "SELECT id, username, division, role, FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Membuat baris tabel dengan atribut data-id yang sesuai dengan ID dari database
        echo "<tr data-id='" . $row["id"] . "'>";
        echo "<td class='p-3 border text-center items-center'>" . $row["username"] . "</td>";
        echo "<td class='p-3 border text-center items-center'>" . $row["division"] . "</td>";
        echo "<td class='p-3 border text-center items-center'>" . $row["role"] . "</td>";
        echo "<td class='p-3 border text-center items-center'>" . $row["password"] . "</td>";
        echo "<td class='p-3 border text-center items-center' style='vertical-align: middle;'>";
        echo "<button onclick='deleteRow(this)' class='justify-center items-center'>";
        echo "<svg xmlns='http://www.w3.orxg/2000/svg' class='w-6 h-6 text-red-400 flex' fill='none' viewBox='0 0 24 24' stroke='currentColor' style='cursor: pointer;'>";
        echo "<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'></path>";
        echo "</svg>";
        echo "</button>";
        echo "</td>";
        echo "</tr>";
    }
} else {
    echo "Tidak ada data pengguna.";
}

$conn->close();
?>
