import { MapOlMarker, MapOlPosition } from './types';

import { FeatureLike } from 'ol/Feature';
import { fromLonLat, toLonLat } from 'ol/proj';
import * as style from 'ol/style';

export const closedPositionTh = 1000;

export const havanaPosition: MapOlPosition = {
  lon: -82.417885,
  lat: 23.097712
};

export const positionToCoordinate = (position: MapOlPosition) => {
  return fromLonLat([position.lon, position.lat]);
};

export const coordinateToPosition = (coordinate: Array<number>): MapOlPosition => {
  const [lon, lat] = toLonLat(coordinate);

  return {
    lat,
    lon
  };
};

export const getClosedMarker = ({
  position,
  markers,
  zoom
}: {
  position: MapOlPosition;
  markers: Array<MapOlMarker> | undefined;
  zoom: number;
}): MapOlMarker | undefined => {
  if (!markers?.length) return undefined;

  const out = markers.find((marker) => {
    const latDiff = marker.lat - position.lat;
    const lonDiff = marker.lon - position.lon;
    const sqrt = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lonDiff, 2));
    /**
     * The work of the Gods ;)
     */
    const calc = (sqrt * Math.pow(zoom, 7.5)) / 100;
    /**
     *
     */
    return calc < 5000;
  });

  return out;
};

const mapStyles: Record<string, style.Style> = {
  route: new style.Style({
    stroke: new style.Stroke({
      width: 6,
      color: [237, 50, 0, 0.8]
    })
  }),
  icon: new style.Style({
    image: new style.Icon({
      anchor: [0.5, 1],
      src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png'
    })
  }),
  marker: new style.Style({
    image: new style.Icon({
      src: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    })
  })
  // geoMarker: new style.Style({
  //   image: new style.Circle({
  //     radius: 7,
  //     snapToPixel: false,
  //     fill: new style.Fill({
  //       color: 'black'
  //     }),
  //     stroke: new style.Stroke({
  //       color: 'white',
  //       width: 2
  //     })
  //   })
  // })
};

export const getFeatureStyle = (feature: FeatureLike) => {
  return mapStyles[feature.get('type')];
};
