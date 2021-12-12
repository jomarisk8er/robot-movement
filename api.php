<?php
    header('Content-Type: application/json; charset=utf-8');
    session_start();

    

    $moves = array(
        'north',
        'east',
        'south',
        'west'
    );

    $letters = array(
        'a',
        'b',
        'c',
        'd',
        'e'
    );

    if($_REQUEST['action'] == 'place') {
        $_SESSION['facing'] = 'north';
        $_SESSION['posX'] = 'a';
        $_SESSION['posY'] = '1';
    }

    if($_REQUEST['action'] == "moveLeft") {
        $i = array_search($_SESSION['facing'], $moves);
        $_SESSION['facing'] = $i - 1 < 0 ? $moves[count($moves)-1] : $moves[$i-1];
    }

    if($_REQUEST['action'] == "moveRight") {
        $i = array_search($_SESSION['facing'], $moves);
        $_SESSION['facing'] = $i + 1 == count($moves) ? $moves[0] : $moves[$i+1];
    }

    if($_REQUEST['action'] == "moveForward") {
        if($_SESSION['facing'] == 'north') {
            if($_SESSION['posY'] < 5) {
                $_SESSION['posY'] = (int) $_SESSION['posY'] + 1;
            }
        } elseif($_SESSION['facing'] == 'south') {
            if($_SESSION['posY'] > 1) {
                $_SESSION['posY'] = (int) $_SESSION['posY'] - 1;
            }
        } elseif($_SESSION['facing'] == 'east') {
            $i = array_search($_SESSION['posX'], $letters) + 1;
            if($i < 5) {
                $_SESSION['posX'] = $letters[ $i];
            }
        } elseif($_SESSION['facing'] == 'west') {
            $i = array_search($_SESSION['posX'], $letters) + 1;
            if($i > 1) {
                $_SESSION['posX'] = $letters[ $i - 2] ;
            }
        }
    }

    echo json_encode(array(
        "facing" => $_SESSION['facing'],
        "posX" => $_SESSION['posX'],
        "posY" => $_SESSION['posY']
    ));
?>