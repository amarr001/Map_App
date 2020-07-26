import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './mapcss.css';

const WebMapView = () => {

    const mapRef = useRef();

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Locate', 'esri/Graphic', 'esri/layers/GraphicsLayer'], { css: true })
        .then(([ArcGISMap, MapView, Locate, Graphic, GraphicsLayer]) => {

          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [138, -34],
            zoom: 7  
          });

          // Locate Button
          var locateWidget = new Locate({
            view: view,   // Attaches the Locate button to the view
            graphic: new Graphic({
              symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
              // graphic placed at the location of the user when found
            })
          });

          //Map coordinates info
          var coordsWidget = document.createElement("div");
          coordsWidget.id = "coordsWidget";
          coordsWidget.className = "esri-widget esri-component";
          coordsWidget.style.padding = "7px 15px 5px";

          view.ui.add(coordsWidget, "bottom-right");

          function showCoordinates(pt) {
            var coords =
              "Lat/Lon " +
              pt.latitude.toFixed(3) +
              " " +
              pt.longitude.toFixed(3) +
              " | Scale 1:" +
              Math.round(view.scale * 1) / 1 +
              " | Zoom " +
              view.zoom;
            coordsWidget.innerHTML = coords;
          }
          
          view.watch("stationary", function (isStationary) {
            showCoordinates(view.center);
          });
          
          view.on("pointer-move", function (evt) {
            showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
          });
          //Show a pop-up when a graphic is clicked

          var graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          var point = {
            type: "point",
            longitude: 138.6007,
            latitude: -34.9285
          };
          
          var simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 1
            }
          };
          
          //*** ADD ***//
          // Create attributes
          var attributes = {
            Name: "My point", // The name of the
            Location: "Adelaide SA" // The owner of the
          };
          // Create popup template
          var popupTemplate = {
            title: "{Name}",
            content: "I am located at <b>{Location}</b>."
          };
          
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            //*** ADD ***//
            attributes: attributes,
            popupTemplate: popupTemplate
          });
          
          graphicsLayer.add(pointGraphic);
        

          
          view.ui.add(locateWidget, "top-right");
          view.ui.add(coordsWidget, "bottom-right");
       
          return () => {
            if (view) {
              // destroy the map view
              view.container = null;
            }
          };
        });
      } 
    );

    return <div className="webmap" ref={mapRef} />;
};

export default WebMapView;



