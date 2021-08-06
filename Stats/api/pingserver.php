
    <?php
    include_once 'pingserversecret.php';
    try
    {
        $query = new MinecraftPing( 'IP REMOVED', 25565 );
        $rep = $query->Query();
        if(!$rep) $rep = ["online" => false];
        else $rep["online"] = true;
        echo json_encode($rep);
    }
    catch( Exception $e )
    {
        $rep = ["online" => false, "error" => $e->getMessage()];
        echo json_encode($rep);
    }
    finally
    {
        if(isset($query)) $query->Close();
    }
