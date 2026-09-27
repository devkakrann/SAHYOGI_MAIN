import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup, Marker, useMap } from "react-leaflet";
import type { HelpRequest, User } from "@/lib/store";

export interface MapProps {
  requests: HelpRequest[];
  ngos?: User[];
  heat?: boolean;
  center?: [number, number];
  zoom?: number;
  height?: number | string;
  focusId?: string | null | undefined;
  pick?: { lat: number; lng: number } | null;
  onPick?: (p: { lat: number; lng: number }) => void;
}

const COLOR: Record<string, string> = { critical: "#d9382c", high: "#e8792b", medium: "#e3b43a", low: "#3c9d78" };

const ngoIcon = L.divIcon({
  className: "",
  html: '<div style="width:26px;height:26px;border-radius:8px;background:#1d6f78;color:#fff;display:grid;place-items:center;font-weight:800;font-size:12px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)">N</div>',
  iconSize: [26, 26], iconAnchor: [13, 13],
});
const pinIcon = L.divIcon({
  className: "",
  html: '<div style="width:18px;height:18px;border-radius:50%;background:#e8792b;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>',
  iconSize: [18, 18], iconAnchor: [9, 9],
});

function Heat({ requests, on }: { requests: HelpRequest[]; on: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!on) return;
    let layer: L.Layer | null = null;
    let cancelled = false;
    (window as unknown as { L: typeof L }).L = L;
    import("leaflet.heat").then(() => {
      if (cancelled) return;
      const w = { critical: 1, high: 0.75, medium: 0.5, low: 0.3 } as const;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      layer = (L as any).heatLayer(requests.filter((r) => r.status !== "fulfilled").map((r) => [r.lat, r.lng, w[r.urgencyLevel]]), { radius: 35, blur: 25 });
      layer!.addTo(map);
    });
    return () => { cancelled = true; if (layer) map.removeLayer(layer); };
  }, [on, requests, map]);
  return null;
}

function Focus({ requests, focusId }: { requests: HelpRequest[]; focusId?: string | null | undefined }) {
  const map = useMap();
  useEffect(() => {
    const r = requests.find((x) => x.id === focusId);
    if (r) map.flyTo([r.lat, r.lng], 14);
  }, [focusId, requests, map]);
  return null;
}

function Picker({ onPick }: { onPick?: MapProps["onPick"] }) {
  const map = useMap();
  useEffect(() => {
    if (!onPick) return;
    const h = (e: L.LeafletMouseEvent) => onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    map.on("click", h);
    return () => { map.off("click", h); };
  }, [map, onPick]);
  return null;
}

export default function LiveMap({ requests, ngos = [], heat = false, center = [28.6139, 77.209], zoom = 11, height = 480, focusId, pick, onPick }: MapProps) {
  return (
    <MapContainer center={pick ? [pick.lat, pick.lng] : center} zoom={zoom} style={{ height, width: "100%", borderRadius: 16 }} scrollWheelZoom>
      <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Heat requests={requests} on={heat} />
      <Focus requests={requests} focusId={focusId} />
      <Picker onPick={onPick} />
      {pick && <Marker position={[pick.lat, pick.lng]} icon={pinIcon} />}
      {ngos.map((n) => (
        <Marker key={n.id} position={[n.lat, n.lng]} icon={ngoIcon}>
          <Popup><b>{n.orgName}</b><br />{n.area}<br />Serves: {(n.domains ?? []).join(", ")}</Popup>
        </Marker>
      ))}
      {requests.map((r) => (
        <CircleMarker key={r.id} center={[r.lat, r.lng]} radius={r.urgencyLevel === "critical" ? 11 : 8}
          pathOptions={{ color: "#fff", weight: 2, fillColor: r.status === "fulfilled" ? "#8a8f99" : COLOR[r.urgencyLevel], fillOpacity: 0.9 }}>
          <Popup>
            <b style={{ textTransform: "capitalize" }}>{r.needType}</b> · {r.urgencyLevel.toUpperCase()}<br />
            {r.area} ({r.pincode})<br />Status: {r.status.replace("_", " ")}<br />
            {r.assignedNgoName && <>NGO: {r.assignedNgoName}<br /></>}
            {r.assignedVolunteerName && <>Volunteer: {r.assignedVolunteerName}</>}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
