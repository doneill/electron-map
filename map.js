// dependencies
require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/widgets/CoordinateConversion",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Search",
    "esri/widgets/DirectLineMeasurement3D",
    "esri/widgets/AreaMeasurement3D",
    "dojo/domReady!"
  ], function(Map, SceneView, CoordinateConversion, Expand, BasemapGallery, Search, DirectLineMeasurement3D, AreaMeasurement3D) {

    var activeWidget = null;

    // Create an OSM Map
    var map = new Map({
      basemap: "osm"
    });

    // Create map view and bind it to the map
    var view = new SceneView({
      container: "viewDiv",
      map: map,
      center: [-98.579501, 39.828379],
      zoom: 5,
    });

    var basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div")
    });

    // expand instance to show basemaps
    var bgExpand = new Expand({
      view: view,
      content: basemapGallery.container,
      expandIconClass: "esri-icon-basemap"
    });

    var ccWidget = new CoordinateConversion({
      view: view
    });

    var searchWidget = new Search({
      view: view
    });

    // add widgets

    view.ui.add(ccWidget, "bottom-left");

    view.ui.add(searchWidget, {
      position: "top-right"
    });

    view.ui.add(bgExpand, "top-right"); 

    view.ui.add("measureBar", "bottom-right");

    // event listeners

    document.getElementById("distanceButton").addEventListener("click",
      function() {
        setActiveWidget(null);
        if (!this.classList.contains('active')) {
          setActiveWidget('distance');
        } else {
          setActiveButton(null);
        }
      });

    document.getElementById("areaButton").addEventListener("click",
      function() {
        setActiveWidget(null);
        if (!this.classList.contains('active')) {
          setActiveWidget('area');
        } else {
          setActiveButton(null);
        }
      });

      // 
      function setActiveWidget(type) {
        switch (type) {
          case "distance":
            activeWidget = new DirectLineMeasurement3D({
              view: view
            });
            view.ui.add(activeWidget, "bottom-right");
            setActiveButton(document.getElementById('distanceButton'));
            break;
          case "area":
            activeWidget = new AreaMeasurement3D({
              view: view
            });
            view.ui.add(activeWidget, "bottom-right");
            setActiveButton(document.getElementById('areaButton'));
            break;
          case null:
            if (activeWidget) {
              view.ui.remove(activeWidget);
              activeWidget.destroy();
              activeWidget = null;
            }
            break;
        }
      }

    function setActiveButton(selectedButton) {
      // focus the view to activate keyboard shortcuts for sketching
      view.focus();
      var elements = document.getElementsByClassName("active");
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("active");
      }
      if (selectedButton) {
        selectedButton.classList.add("active");
      }
    }

  });
