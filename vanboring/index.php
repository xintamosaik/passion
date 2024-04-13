<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    // Handling AJAX request
    include 'ajaxHandler.php';
    $response = handleAjax($_POST['action']);
    error_log('Ajax request: ' . $_POST['action']);
    echo json_encode($response);
    exit;
} else {
    // Normal page load
    echo file_get_contents('game.html');
}
?>