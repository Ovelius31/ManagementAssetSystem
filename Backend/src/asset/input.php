<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        if ($action === 'saveData') {
            //  operasi penyimpanan data di sini
            $data = json_decode(file_get_contents('php://input'), true);
            
            //  operasi penyimpanan data ke database
            $conn = mysqli_connect("localhost", "root", "", "item_management_system");
            
            $codeItem = mysqli_real_escape_string($conn, $data['codeItem']);
            $itemName = mysqli_real_escape_string($conn, $data['itemName']);
            $category = mysqli_real_escape_string($conn, $data['category']);
            $location = mysqli_real_escape_string($conn, $data['location']);
            $condition = mysqli_real_escape_string($conn, $data['condition']);
            $dateOfPurchase = mysqli_real_escape_string($conn, $data['dateOfPurchase']);
            $price = mysqli_real_escape_string($conn, $data['price']); 
            $adjustmentDate = mysqli_real_escape_string($conn, $data[' adjustmentDate']);
            $photo = mysqli_real_escape_string($conn, $data['photo']);
            $amount = mysqli_real_escape_string($conn, $data['amount']);
            
            
            $query = "INSERT INTO asset (CodeItem, ItemName, Category, Location, Condition, DateOfPurchase, Price, AdjustmentDate, Photo, Amount) VALUES ('$codeItem', '$itemName', '$category', '$location', '$condition', '$dateOfPurchase', '$price', '$adjustmentDate', '$photoLink', '$amount')";
            
            $result = mysqli_query($conn, $query);
            
            if ($result) {
                $response = array('status' => 'success', 'message' => 'Data saved successfully.');
                echo json_encode($response);
            } else {
                $response = array('status' => 'error', 'message' => 'Failed to save data: ' . mysqli_error($conn));
                echo json_encode($response);
            }
            
            mysqli_close($conn);
        } else {
            // Tangani tindakan lainnya jika diperlukan
        }
    }
}
?>