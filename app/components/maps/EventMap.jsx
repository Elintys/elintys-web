// Displays a map centered on event coordinates using MapLibre GL JS and OSM tiles.
"use client";

import { useEffect, useMemo, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DEFAULT_ZOOM = 14;
const OSM_STYLE = {
  version: 8,
  sources: {
    "osm-tiles": {
      type: "raster",
      tiles: ["https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-layer",
      type: "raster",
      source: "osm-tiles",
    },
  ],
};

export default function EventMap({ latitude, longitude, height = 320, zoom = DEFAULT_ZOOM }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const parsedLatitude = useMemo(() => Number(latitude), [latitude]);
  const parsedLongitude = useMemo(() => Number(longitude), [longitude]);
  const hasCoordinates = Number.isFinite(parsedLatitude) && Number.isFinite(parsedLongitude);

  const initialZoomRef = useRef(zoom);
  const initialCenterRef = useRef(null);
  const initialCenter = useMemo(() => {
    if (!initialCenterRef.current && hasCoordinates) {
      initialCenterRef.current = [parsedLongitude, parsedLatitude];
    }
    return initialCenterRef.current;
  }, [hasCoordinates, parsedLatitude, parsedLongitude]);

  useEffect(() => {
    if (!initialCenter || !mapContainerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: OSM_STYLE,
      center: initialCenter,
      zoom: initialZoomRef.current,
      attributionControl: true,
    });

    mapRef.current = map;
    markerRef.current = new maplibregl.Marker().setLngLat(initialCenter).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
      initialCenterRef.current = null;
    };
  }, [initialCenter]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !hasCoordinates) {
      return;
    }
    map.jumpTo({ center: [parsedLongitude, parsedLatitude], zoom });
    if (!markerRef.current) {
      markerRef.current = new maplibregl.Marker().setLngLat([parsedLongitude, parsedLatitude]).addTo(map);
    } else {
      markerRef.current.setLngLat([parsedLongitude, parsedLatitude]);
    }
  }, [hasCoordinates, parsedLatitude, parsedLongitude, zoom]);

  if (!hasCoordinates) {
    return null;
  }

  const containerStyle = useMemo(() => ({
    height: typeof height === "number" ? `${height}px` : height,
    width: "100%",
  }), [height]);

  return <div ref={mapContainerRef} style={containerStyle} className="w-full" />;
}
