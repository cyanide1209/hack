// react
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import * as OSMSource from 'ol/source'
import * as ol from "ol";
import XYZ from 'ol/source/XYZ'
import {transform} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';

import { fromLonLat, get } from "ol/proj";
import { Point } from 'ol/geom';

//style imports
//import { Style } from 'ol/style';
import { renderFeature } from 'ol/renderer/vector';

import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

function  MapWrapper(props) {
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ mapCenter, setMapCenter] = useState([-121.955238,37.354107])

  const mapElement = useRef()
  const mapRef = useRef()
  mapRef.current = map

  //inital load
  useEffect( () => {
    //style takes a function not an object
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
      style: ( () => {
        const zoomFac = Math.floor(mapRef.current.getView().getZoom())
        return genStyle(zoomFac)
      })
    })

    var initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSMSource.OSM()
        }),
        initalFeaturesLayer
      ],
      view: new View({
        center: fromLonLat(mapCenter),
        zoom: 16
      }),
      controls: []
    })
    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)
  },[])

  //updateCenter
  useEffect( () => {
    if(!map) return
    if(props.center.length === 0) return

    setMapCenter(props.center)
    mapRef.current.getView().setCenter(fromLonLat(props.center))
    mapRef.current.getView().setZoom(18)

    featuresLayer.getSource().clear()
    featuresLayer.getSource().addFeature(
      new ol.Feature({
        geometry: new Point(fromLonLat(props.center)),
        name: "You Are Here",
      })
    )
  },[props.center])
  
  return (      
    <div><div ref={mapElement} className="map-container" onClick={()=>{
      if(props.setResetGui != null){
        props.setResetGui(props.resetGui ^ 1);
      }
    }}></div></div>
  ) 
}
function genStyle(zoomFac){
  var newRadius = 5
  //seems like bad code, but this is to avoid pointless exponent
  if(zoomFac === 16) newRadius = 15
  else if(zoomFac === 17) newRadius = 30 
  else if(zoomFac === 18) newRadius = 60
  else if(zoomFac === 19) newRadius = 100
  else if(zoomFac === 20) newRadius = 200
  else if(zoomFac === 21) newRadius = 400
  else if(zoomFac === 22) newRadius = 800

  const fill = new Fill({
    color: "rgba(48, 61, 255, 0.25)"
  })
  const stroke = new Stroke({
    color:"rgba(0, 0, 0, 0.85)",
    width: 1.25
  })
  return [new Style({
    image: new CircleStyle({
      fill:fill,
      stroke:stroke,
      radius: newRadius > 5 ? newRadius : 5
    }),
    fill: fill,
    stroke: stroke,
  }),]
}
export default MapWrapper