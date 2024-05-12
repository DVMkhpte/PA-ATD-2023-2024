<!DOCTYPE html>
<html>
  <head>
    <title>Simple Marker</title>
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGV0C68ZFvy3tbbeOlD1u8_8DxBg_LVxU&callback=console.debug&libraries=maps,marker&v=beta">
    </script>
    <link rel="stylesheet" href="./maps.css"/>
  </head>
  <body>
    <gmp-map center="49.84372329711914,3.295443534851074" zoom="14" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="49.84372329711914,3.295443534851074" title="My location"></gmp-advanced-marker>
    </gmp-map>
  </body>
</html>