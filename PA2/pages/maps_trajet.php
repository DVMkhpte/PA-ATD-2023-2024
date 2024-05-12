<!DOCTYPE html>

<html>
  <head>
    <title>Displaying Text Directions With setPanel()</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script>

      function initMap() {
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const directionsService = new google.maps.DirectionsService();
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 7,
          center: { lat: 41.85, lng: -87.65 },
          disableDefaultUI: true,
        });

        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById("sidebar"));

        const control = document.getElementById("floating-panel");

        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

        const onChangeHandler = function () {
          calculateAndDisplayRoute(directionsService, directionsRenderer);
        };

        document
          .getElementById("start")
          .addEventListener("change", onChangeHandler);
        document
          .getElementById("end")
          .addEventListener("change", onChangeHandler);
        document
          .getElementById("mode")
          .addEventListener("change", onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;
        const selectedMode = document.getElementById("mode").value;

        directionsService
          .route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode[selectedMode],
          })
          .then((response) => {
            directionsRenderer.setDirections(response);
          })
          .catch((e) =>
            window.alert("Directions request failed due to " + status)
          );
      }

function addStop() {
  const address = document.getElementById("stop-address").value;
  const mode = document.getElementById("stop-mode").value;


  const listItem = document.createElement("li");
  listItem.textContent = address + " (" + mode + ")";
  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.addEventListener("click", () => {
  });
  listItem.appendChild(removeButton);
  document.getElementById("stops").appendChild(listItem);

  calculateRouteWithStops();
}

document.getElementById("add-stop").addEventListener("click", addStop);

function calculateRouteWithStops() {

}


      window.initMap = initMap;
    </script>
    <style>

      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }

      #container {
        height: 100%;
        display: flex;
      }

      #sidebar {
        flex-basis: 15rem;
        flex-grow: 1;
        padding: 1rem;
        max-width: 30rem;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
      }

      #map {
        flex-basis: 0;
        flex-grow: 4;
        height: 100%;
      }

      #floating-panel {
        position: absolute;
        top: 10px;
        left: 25%;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        text-align: center;
        font-family: "Roboto", "sans-serif";
        line-height: 30px;
        padding-left: 10px;
      }

      #floating-panel {
        background-color: #fff;
        border: 0;
        border-radius: 2px;
        box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
        margin: 10px;
        padding: 0 0.5em;
        font: 400 18px Roboto, Arial, sans-serif;
        overflow: hidden;
        padding: 5px;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        height: auto;
      }

      #map {
        flex: auto;
      }

      #sidebar {
        flex: 0 1 auto;
        padding: 0;
      }
      #sidebar > div {
        padding: 0.5rem;
      }
    </style>
  </head>
  <body>
    <div id="floating-panel">
      <strong>Départ :</strong>
      <input type="text" id="start" placeholder="Entrez l'adresse de départ">
        <br />

      <strong>Arrivée :</strong>
      <input type="text" id="end" placeholder="Entrez l'adresse d'arrivée">
    <br />

      <b>Mode de déplacement: </b>
      <select id="mode">
        <option value="DRIVING">Voiture</option>
        <option value="WALKING">A Pied</option>
        <option value="BICYCLING">A Vélo</option>
        <option value="TRANSIT">Transit</option>
      </select>
      <button id="add-stop">Ajouter une étape</button>
    <ul id="stops"></ul>
    </div>

    <div id="container">
      <div id="map"></div>
      <div id="sidebar"></div>
    </div>
    
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGV0C68ZFvy3tbbeOlD1u8_8DxBg_LVxU&callback=initMap&v=weekly&solution_channel=GMP_CCS_textdirections_v1"
      defer
    ></script>
  </body>
</html>