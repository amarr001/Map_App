import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './mapcss.css';

const WebMapView = () => {

    const mapRef = useRef();

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Locate', 'esri/Graphic', 'esri/layers/GraphicsLayer', 'esri/layers/FeatureLayer', 
        "esri/widgets/Editor"], { css: true })
        .then(([ArcGISMap, MapView, Locate, Graphic, GraphicsLayer, FeatureLayer, Editor]) => {

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

          

         
          view.ui.add(locateWidget, "top-right");
          view.ui.add(coordsWidget, "bottom-right");



        //*************************************************************//
        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
          
         var point = {
          pointOne:{
          type: "point",
          longitude: 138.4897,
          latitude: -31.4933
          },
          pointTwo:{
          type: "point",
          longitude: 136.8998,
          latitude: -35.2855
          }, 
          pointThree:{
          type: "point",
          longitude: 139.437881,
          latitude: -35.942116
          }
        };
        
        var simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],  // orange
          outline: {
            color: [255, 255, 255], // white
            width: 1
          }
        };

        //*** ADD ***//
      // Create attributes
      var attributes = {
        attrOne:{
          Name: "My point",  // The name of the
          Location: "Wilpena Pound - Flinders Ranges",  // The owner of the
        },
        attrTwo:{
          Name: "My point",  // The name of the
          Location: "Cable Bay - Innes National Park",  // The owner of the
        },
        attrThree:{
          Name: "My point",  // The name of the
          Location: "Ocean Beach - Coorong National Park",  // The owner of the
        }
      };
        // Create popup template
      var popupTemplate = {
        title: "{Name}",
        content: function() {
          return (
            "I am located at <b>{Location}</b>."
          )
        }
        
      };

      var pointGraphic = new Graphic({
          geometry: point.pointOne,
          symbol: simpleMarkerSymbol,
          attributes: attributes.attrOne,
          popupTemplate: popupTemplate
      });
      var pointGraphicTwo = new Graphic({
        geometry: point.pointTwo,
        symbol: simpleMarkerSymbol,
        attributes: attributes.attrTwo,
        popupTemplate: popupTemplate
      });
    var pointGraphicThree = new Graphic({
      geometry: point.pointThree,
      symbol: simpleMarkerSymbol,
      attributes: attributes.attrThree,
      popupTemplate: popupTemplate
      });
        graphicsLayer.add(pointGraphic);
        graphicsLayer.add(pointGraphicTwo);
        graphicsLayer.add(pointGraphicThree)
    
      

       
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



