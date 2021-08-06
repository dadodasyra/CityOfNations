<?php

$file = file_get_contents("cache.json", true);
$dejsoned = json_decode($file, true);
if(($dejsoned["expire"]??0) < time()){
    $request = file_get_contents("https://mcsharp.fr/api/stats");
    echo $request;

    $decoderequest = json_decode($request, true);
    $decoderequest["expire"] = time() + 30;
    file_put_contents("cache.json", json_encode($decoderequest));
} else {
    echo $file;
}