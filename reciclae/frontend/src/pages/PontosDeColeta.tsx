import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'
import Skeleton from '../components/loading/Skeleton'
import EmptyState from '../components/empty/EmptyState'

// importa o estilo e os componentes do Leaflet
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
      <PageTitle subtitle="Componentes básicos com CSS puro.">PontosDeColeta</PageTitle>

      <Section title="Mapa de Pontos de Coleta">
        <div style={{ height: '500px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
          <MapContainer center={[-23.5505, -46.6333]} zoom={12} style={{ height: '100%', width: '100%' }}>
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
      </Section>

      <Section title="Detail View">
        <DetailView title="Item demonstrativo">
          <p className="muted">Campos e textos de exemplo para o detalhe.</p>
        </DetailView>
      </Section>

      <Section title="Skeleton / Empty State">
        <Skeleton>
          <EmptyState>Carregue dados para visualizar conteúdo.</EmptyState>
        </Skeleton>
      </Section>
    </>
  )
}