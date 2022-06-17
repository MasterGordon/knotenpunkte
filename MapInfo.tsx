import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapInfo: React.FC<{ zoom: number }> = ({ zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setZoom(zoom);
  }, [map, zoom]);
  return null;
};

export default MapInfo;
