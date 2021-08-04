<?php
$post = $_POST;
if(empty($post)){
    $file = file_get_contents("database.json");
    if(!$file) {
        echo "error";
        return;
    }
    $db = json_decode($file, true);
    $last = $db[count($db) - 1];
    $last["id"] = count($db);
    echo json_encode($last);
} else {
    if(hash("sha256", $post["token"]??"") !== "ad557dce66a8bcdde3d5fbce0b739bd5577d78d09346a19ddfe3b29ab2217d95"){
        echo "bad token";
        return;
    }
    if(!isset($post["team"], $post["pseudo"], $post["streamer"])){
        echo "key missing";
        return;
    }

    $file = file_get_contents("database.json");
    $db = json_decode($file, true);
    $db[count($db)] = [
        "team" => $post["team"],
        "pseudo" => $post["pseudo"],
        "streamer" => $post["streamer"]];
    file_put_contents("database.json", json_encode($db));
    echo "ok";
}