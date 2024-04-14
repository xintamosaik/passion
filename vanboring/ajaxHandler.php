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

function menu($gameActive = null, $saveExists = null) {
    if (!$gameActive) {
        $gameActive = false;
    }
    if (!$saveExists) {
        $saveExists = false;
    }
    // Menu logic
    $pauseButton = $gameActive ? '<button data-post="pauseGame" data-target="main">PAUSE</button>' : '';
    $loadButton = $saveExists ? '<button data-post="loadGame" data-target="main">LOAD</button>' : '';
    $saveButton = $gameActive ? '<button data-post="saveGame" data-target="main">SAVE</button>' : '';
    $startButton = $gameActive ? '' : '<button data-post="startGame" data-target="main">NEW</button>';
    $content = <<<HTML
        <nav id="menu">
            $pauseButton
            $loadButton
            $saveButton
            $startButton
        </nav>
    HTML;
    return [
        'success' => true, 'message' => 'Menu loaded', 'content' => $content];
}

function menuFresh() {
    return menu();
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
    'menuFresh' => 'menuFresh'
];

// Handle AJAX request
function handleAjax($action) {
    global $actionMap;
    if (array_key_exists($action, $actionMap)) {
        return call_user_func($actionMap[$action]);
    }
    return ['error' => 'Invalid action'];
}

