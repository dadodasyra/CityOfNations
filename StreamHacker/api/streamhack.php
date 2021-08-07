<?php
header('Content-Type: application/json');

$post = $_POST;
if(empty($post)){
    $streamername = $_GET["name"]??"undefined";
    $file = file_get_contents("database.json");
    if(!$file) {
        echo "error";
        return;
    }
    $db = json_decode($file, true);
    $last = $db[count($db) - 1];
    $last["id"] = count($db);
    echo json_encode($last);

    $removed = false;
    $olddb = $db[0];
    foreach($db[0] as $key => $value) if ($value + 10 < time()) unset($db[0][$key]);

    if($streamername !== "undefined"){
        $db[0][$streamername] = time();
        file_put_contents("database.json", json_encode($db));
        $removed = true;
    }
    if(!$removed && $olddb !== $db[0]) file_put_contents("database.json", json_encode($db));
} else {
    if(hash("sha256", $post["token"]??"") !== "e263d671f259cb80c7e09ed11e38d31b1d63ad1f76a8a40ab8e356f2c33ff6a4"){
        echo "bad token get ".$post["token"];
        return;
    }
    if(!isset($post["team"], $post["pseudo"], $post["streamer"]) && !isset($post["custom"])){
        echo "key missing";
        return;
    }

    $file = file_get_contents("database.json");
    $db = json_decode($file, true);
    if(isset($post["custom"])){
        $custom = [];
        $customraw = $post["custom"];

        if(isset($customraw["message"]) && $customraw["message"] !== "") $custom["message"] = $customraw["message"];

        $custom["gif"] = $customraw["gif"] !== "" ? $customraw["gif"] : "media/void.png";

        if(isset($customraw["sound"]) && $customraw["sound"] !== ""){
            $custom["sound"] = $customraw["sound"];
            $custom["volume"] = $customraw["volume"]??0.1;
        }
        $db[count($db)]["streamer"] = $customraw["streamer"]??"all";
        $db[count($db) - 1]["custom"] = $custom;
    } else {
        $db[count($db)] = [
            "team" => $post["team"],
            "pseudo" => $post["pseudo"],
            "streamer" => $post["streamer"]];
    }
    echo file_put_contents("database.json", json_encode($db));
    echo "ok";
}
