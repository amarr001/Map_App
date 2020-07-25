
import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './mapcss.css';

const WebMapView = () => {

    const mapRef = useRef();

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Locate', 'esri/Graphic'], { css: true })
        .then(([ArcGISMap, MapView, Locate, Graphic]) => {
          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-118, 34],
            zoom: 2
            
          });

          // Locate Button
          var locateWidget = new Locate({
            view: view,   // Attaches the Locate button to the view
            graphic: new Graphic({
              symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
              // graphic placed at the location of the user when found
            })
          });
          
          view.ui.add(locateWidget, "top-right");
       
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



