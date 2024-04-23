import React from 'react';

function IndexPHP() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Au Temps Donné - Accueil</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" href="../../PA2/css/style.css" />
      </head>
      <body>

      <div>
        <div id="translated-content"></div>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">

          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">

            <div className="carousel-item active">
              <img className="d-block w-100" src="../img/image1.jpg" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="../img/image2.jpg" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="../img/image3.jpg" alt="Third slide" />
            </div>
            <div className="jumbotron">
              <h1 className="display-4" data-translate="title">Au Temps Donné, plus qu'une simple association.</h1>
              <p className="lead" data-translate="date">Depuis 1987.</p>
              <a className="btn btn-primary btn-lg" data-translate="donation" href="donation.php">Faire un don</a>
            </div>
          </div>

          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>

        </div>

        
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

      </body>
    </html>
  );
}

export default IndexPHP;
