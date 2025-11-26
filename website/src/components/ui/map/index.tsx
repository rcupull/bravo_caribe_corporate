import { useEffect, useRef, useState } from "react";

import { MapOlMarker, MapOlPolyline, MapOlPosition } from "./types";
import {
  coordinateToPosition,
  getClosedMarker,
  getFeatureStyle,
  havanaPosition,
  positionToCoordinate,
} from "./utils";

import { Feature, Map, MapBrowserEvent, View } from "ol";
import * as geom from "ol/geom";
import { Tile, Vector as VectorLayer } from "ol/layer";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat, transform } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import OSM from "ol/source/OSM";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { Nullable, StyleProps } from "@/types/general";
import { cn, compact, isNumber } from "@/utils/general";

/**
 * https://gis.stackexchange.com/questions/460908/adding-removing-and-modifying-markers-in-openlayers
 * https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.useGeographic
 *
 * Examples
 * https://jsfiddle.net/hhdvwpd0/4/
 */
export interface MapOlProps extends StyleProps {
  onClick?: (args: { position: MapOlPosition }) => void;
  onMarkerClick?: (marker: MapOlMarker) => void;
  center?: MapOlPosition;
  markers?: Array<Nullable<MapOlMarker>>;
  polylines?: Array<Nullable<MapOlPolyline>>;
  zoom?: number;
  onChangeZoom?: (zoom: number) => void;
  onChangeCenter?: (position: MapOlPosition) => void;
  notInteractive?: boolean;
}

export const MapOl = ({
  onClick,
  onMarkerClick,
  center = havanaPosition,
  markers: markersProp,
  polylines: polylinesProp,
  className,
  zoom,
  onChangeZoom,
  onChangeCenter,
  notInteractive,
}: MapOlProps) => {
  const polylines = compact(polylinesProp || []);
  const markers = compact(markersProp || []);

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();
  const refVector = useRef<VectorLayer<any>>();

  const [zoomState, setZoomState] = useState<number>(8);

  ////////////////////////////////////////////////////////////////////////

  /**
   *  ON CLICK EVENT
   */
  const refMeta = useRef<{
    onClick: MapOlProps["onClick"];
    onMarkerClick: MapOlProps["onMarkerClick"];
    markers: Array<MapOlMarker>;
    polylines: Array<MapOlPolyline>;
    zoomState: number;
  }>({
    zoomState,
    onMarkerClick: () => {},
    onClick: () => {},
    markers: [],
    polylines: [],
  });
  refMeta.current = {
    onClick,
    onMarkerClick,
    markers,
    polylines,
    zoomState,
  };

  const handleClick = (e: MapBrowserEvent<any>) => {
    const { onClick, onMarkerClick, zoomState, markers } =
      refMeta.current || {};

    const clickedPosition = coordinateToPosition(e.coordinate);

    const closedMarker = getClosedMarker({
      position: clickedPosition,
      markers,
      zoom: zoomState,
    });

    if (closedMarker) {
      return onMarkerClick?.(closedMarker);
    }

    onClick?.({
      position: clickedPosition,
    });
  };

  ////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (ref.current) {
      const vectorLayer = new VectorLayer({
        source: new VectorSource({ wrapX: false }),
        style: getFeatureStyle,
      });

      refVector.current = vectorLayer;

      const map = new Map({
        target: ref.current,
        layers: [
          new Tile({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: positionToCoordinate(center),
        }),
        controls: defaultControls({
          attribution: false,
          zoom: false,
          rotate: false,
        }),
      });

      setMap(map);

      //@ts-expect-error ignore error type
      map.addEventListener("click", handleClick);

      map.on("moveend", () => {
        const centerCoord = map.getView().getCenter();

        if (centerCoord) {
          const [lon, lat] = transform(centerCoord, "EPSG:3857", "EPSG:4326");

          onChangeCenter?.({ lon, lat });
        }

        const newZoom = map.getView()?.getZoom();

        if (isNumber(newZoom)) {
          setZoomState(newZoom);
          onChangeZoom?.(newZoom);
        }
      });
    }
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Setting center
   * https://gis.stackexchange.com/questions/112892/change-openlayers-3-view-center
   */
  useEffect(() => {
    if (center && map) {
      map
        .getView()
        .setCenter(
          transform([center.lon, center.lat], "EPSG:4326", "EPSG:3857")
        );
    }
  }, [JSON.stringify(center)]);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Setting interaction
   */
  useEffect(() => {
    map?.getInteractions().forEach((interaction) => {
      interaction.setActive(!notInteractive);
    });
  }, [notInteractive, map]);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Setting center
   * https://gis.stackexchange.com/questions/112892/change-openlayers-3-view-center
   */
  useEffect(() => {
    if (isNumber(zoom)) {
      setZoomState(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    if (zoomState && map) {
      map.getView().setZoom(zoomState);
    }
  }, [zoomState, map]);

  useEffect(() => {
    if (refVector.current) {
      refVector.current.getSource()?.clear();

      if (markers?.length) {
        refVector.current.getSource()?.addFeatures(
          markers.map(({ lat, lon }) => {
            const feature = new Feature({
              type: "marker",
              geometry: new geom.Point(fromLonLat([lon, lat])),
            });

            feature.setStyle([
              new Style({
                image: new CircleStyle({
                  radius: 8, // circle size
                  fill: new Fill({ color: "#cf1843" }), // background color
                  stroke: new Stroke({ color: "#fff", width: 2 }), // border
                }),
              }),
              new Style({
                image: new CircleStyle({
                  radius: 12,
                  fill: new Fill({ color: "rgba(0,0,0,0)" }), // transparente
                  stroke: new Stroke({
                    color: "#cf1843",
                    width: 3,
                  }),
                }),
              }),
            ]);

            return feature;
          })
        );
      }

      if (polylines?.length) {
        refVector.current.getSource()?.addFeatures(
          polylines.map((polyline) => {
            // const feature = new Feature({
            //   type: 'polyline',
            //   geometry: new geom.LineString(polyline.map(({ lat, lon }) => fromLonLat([lon, lat])))
            // });

            const route = new geom.LineString(
              polyline.map(({ lat, lon }) => [lon, lat])
            ).transform("EPSG:4326", "EPSG:3857");

            const feature = new Feature({
              type: "route",
              geometry: route,
            });

            // const feature = new Feature({
            //   type: 'polyline',
            //   geometry: new geom.LineString(polyline.map(({ lat, lon }) => fromLonLat([lon, lat])))
            // });

            return feature;
          })
        );
      }
    }
  }, [JSON.stringify({ markers, polylines })]);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  return <div ref={ref} className={cn("w-full h-[30rem]", className)} />;
};
