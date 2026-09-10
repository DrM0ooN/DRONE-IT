import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ stations, markerColor }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([50.0755, 14.4378], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.current);

    markerLayerRef.current = L.layerGroup().addTo(mapInstance.current);

    const syncMapSize = () => {
      if (mapInstance.current) {
        window.requestAnimationFrame(() => {
          mapInstance.current?.invalidateSize({ animate: false });
        });
      }
    };

    const resizeObserver = new ResizeObserver(syncMapSize);
    resizeObserver.observe(mapRef.current);

    const initialTimer = window.setTimeout(syncMapSize, 0);

    return () => {
      window.clearTimeout(initialTimer);
      resizeObserver.disconnect();

      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !markerLayerRef.current) return;

    markerLayerRef.current.clearLayers();

    if (!stations || stations.length === 0) return;

    const bounds = [];

    stations.forEach((station) => {
      const lat = Number(station.latitude);
      const lng = Number(station.longitude);
      if (Number.isNaN(lat) || Number.isNaN(lng)) return;

      const stationIcon = L.icon({
        iconUrl: station.icon_url || '/images/drone_hub_icon.png',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
        popupAnchor: [0, -52],
      });

      const marker = L.marker([lat, lng], { icon: stationIcon });
      marker.bindPopup(`
        <div class="station-popup">
          <strong>${station.name}</strong><br/>
          Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}
        </div>
      `);
      marker.addTo(markerLayerRef.current);
      bounds.push([lat, lng]);
    });

    if (bounds.length > 0) {
      mapInstance.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      window.setTimeout(() => mapInstance.current?.invalidateSize({ animate: false }), 0);
    } else {
      mapInstance.current.setView([50.0755, 14.4378], 12);
      window.setTimeout(() => mapInstance.current?.invalidateSize({ animate: false }), 0);
    }
  }, [stations]);

  return <div ref={mapRef} className="map"></div>;
}
