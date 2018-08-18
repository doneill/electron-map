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
      center: [-122.337427, 47.611059],
      zoom: 12,
    });


    var ccWidget = new CoordinateConversion({
      view: view
    });

    view.ui.add(ccWidget, "bottom-left");

    var searchWidget = new Search({
      view: view
    });

    // Add the search widget to the top right corner of the view
      view.ui.add(searchWidget, {
      position: "top-right"
    });

    var basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div")
    });

    // Create an Expand instance and set the content
    // property to the DOM node of the basemap gallery widget
    // Use an Esri icon font to represent the content inside
    // of the Expand widget
    var bgExpand = new Expand({
      view: view,
      content: basemapGallery.container,
      expandIconClass: "esri-icon-basemap"
    });

    // Add the widget to the top-right corner of the view
    view.ui.add(bgExpand, "top-right"); 

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

    // add the toolbar for the measurement widgets
    view.ui.add("measureBar", "bottom-right");

  });
