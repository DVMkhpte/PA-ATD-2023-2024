<div id="main">
    <div class="fof">
        <h1>Error <?php echo http_response_code(); ?></h1>
        <h2><a href="../index.php">---->    Back to home    <----</a></h2>
    </div>
</div>

<style>
    *{
        transition: all 0.6s;
        font-family: 'Lato', sans-serif;
    }

    a{
        text-decoration: none;
        color: black;
    }

    html {
        height: 100%;
    }

    body{
        color: #888;
        margin: 0;
    }

    #main{
        display: table;
        width: 100%;
        height: 100vh;
        text-align: center;
    }

    .fof{
        display: table-cell;
        vertical-align: middle;
    }

    .fof h1{
        font-size: 50px;
        display: inline-block;
        padding-right: 12px;
        animation: type .5s alternate infinite;
    }

    @keyframes type{
        from{box-shadow: inset -3px 0px 0px #888;}
        to{box-shadow: inset -3px 0px 0px transparent;}
    }
</style>