import Section from '../components/layout/Section'
import "../styles/ponto_coleta.css"
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// corrige ícones do Leaflet no Vite/Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function PontosDeColeta() {
  // pontos de coleta simulados
  const pontos = [
    { nome: 'Coleta 1 - Santana', lat: -23.486, lng: -46.640 },
    { nome: 'Coleta 2 - Tucuruvi', lat: -23.475, lng: -46.601 },
    { nome: 'Coleta 3 - Centro', lat: -23.545, lng: -46.633 },
  ];

  return (
    <>
    <h1 className="titulo">Mapa de pontos de coleta</h1>
      
        <div className='mapa'>
          <MapContainer center={[-23.486, -46.640 ]} zoom={12} style={{ height: '90%', width: '100%' }}>
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pontos.map((p, i) => (
              <Marker key={i} position={[p.lat, p.lng]}>
                <Popup><b>{p.nome}</b></Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      
    </>
  )
}