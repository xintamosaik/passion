<?php
// Define functions for each game action
function increaseScore() {
    // Increase score logic
    return ['success' => true, 'message' => 'Score increased'];
}

function decreaseHealth() {
    // Decrease health logic
    return ['success' => true, 'message' => 'Health decreased'];
}

function fetchInventory() {
    // Fetch inventory items logic
    return ['success' => true, 'inventory' => ['sword', 'shield', 'potion']];
}

function startGame() {
    // Start game logic
    $content = <<<HTML
        <div id="game">
            <h1>Welcome to the game!</h1>
            <p>Game content goes here...</p>
        </div>
    HTML;
    return [
        'success' => true, 'message' => 'Game started', 'content' => $content];
}

function menu() {
    // Menu logic
    $content = <<<HTML
        <nav id="menu">
            <button data-post="startGame" data-target="body">NEW</button>
            <button data-post="loadGame" data-target="body">LOAD</button>
        </nav>
    HTML;
    return [
        'success' => true, 'message' => 'Menu loaded', 'content' => $content];
}
function loadGame() {
    // Load game logic
    $content = <<<HTML
        <div id="game">
            <h1>Welcome back to the game!</h1>
            <p>Game content goes here...</p>
        </div>
    HTML;
    return [
        'success' => true, 'message' => 'Game loaded', 'content' => $content];
}   
// Map actions to functions
$actionMap = [
    'increaseScore' => 'increaseScore',
    'decreaseHealth' => 'decreaseHealth',
    'fetchInventory' => 'fetchInventory',
    'startGame' => 'startGame',
    'loadGame' => 'loadGame',
    'menu' => 'menu'
];

// Handle AJAX request
function handleAjax($action) {
    global $actionMap;
    if (array_key_exists($action, $actionMap)) {
        return call_user_func($actionMap[$action]);
    }
    return ['error' => 'Invalid action'];
}
?>
