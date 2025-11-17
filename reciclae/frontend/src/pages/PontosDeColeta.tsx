import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'

// estilo externo
import '../styles/PontosDeColeta.css'

// importa o estilo e os componentes do Leaflet
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// corrige ícones do Leaflet no Vite/Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

// 🔹 PONTOS COM ENDEREÇO
const pontos = [
  { 
    nome: 'Ponto Inicial - Faculdade São Judas Santana',
    endereco: 'Av. Braz Leme, 3021 - Santana, São Paulo - SP',
    lat: -23.496526128407535, 
    lng: -46.62564323580356 
  },

  { 
    nome: 'Coleta 1 - Eco Santa Maria',
    endereco: 'R. Santa Maria, 178 - Santana, São Paulo - SP',
    lat: -23.49133534676037, 
    lng: -46.67278783612072
  },

  { 
    nome: 'Coleta 2 - Tucuruvi',
    endereco: 'Av. Tucuruvi, São Paulo - SP',
    lat: -23.475, 
    lng: -46.601 
  },

  { 
    nome: 'Coleta 3 - Centro',
    endereco: 'Praça da Sé, São Paulo - SP',
    lat: -23.545, 
    lng: -46.633 
  },

  { 
    nome: 'Coleta 4 - Jardim São Paulo',
    endereco: 'Av. Leôncio de Magalhães - Jardim São Paulo, São Paulo - SP',
    lat: -23.4922, 
    lng: -46.6245 
  },

  { 
    nome: 'Coleta 5 - Parada Inglesa',
    endereco: 'Av. Luís Dumont Villares - Parada Inglesa, São Paulo - SP',
    lat: -23.4829, 
    lng: -46.6133 
  },

  { 
    nome: 'Coleta 6 - Mandaqui',
    endereco: 'Av. Santa Inês - Mandaqui, São Paulo - SP',
    lat: -23.4675, 
    lng: -46.6418 
  },

  { 
    nome: 'Coleta 7 - Casa Verde',
    endereco: 'Av. Casa Verde - Casa Verde, São Paulo - SP',
    lat: -23.5036, 
    lng: -46.6530 
  },

  { 
    nome: 'Coleta 8 - Limão',
    endereco: 'Av. Dep. Emílio Carlos - Limão, São Paulo - SP',
    lat: -23.5089, 
    lng: -46.6681 
  },

  { 
    nome: 'Coleta 9 - Anhanguera',
    endereco: 'Av. Raimundo Pereira de Magalhães - Anhanguera, São Paulo - SP',
    lat: -23.4851, 
    lng: -46.7004 
  },

  { 
    nome: 'Coleta 10 - Vila Guilherme',
    endereco: 'Av. Guilherme Cotching - Vila Guilherme, São Paulo - SP',
    lat: -23.5189, 
    lng: -46.6237 
  },

  { 
    nome: 'Coleta 11 - Eco Ponto Barra Funda',
    endereco: 'Av. Marquês de São Vicente, 121 - Barra Funda, São Paulo - SP',
    lat: -23.522031428524354, 
    lng: -46.64446371137092
  },

  { 
    nome: 'Coleta 12 - Vila Medeiros',
    endereco: 'Av. Júlio Buono - Vila Medeiros, São Paulo - SP',
    lat: -23.4901, 
    lng: -46.5718 
  },

  { 
    nome: 'Coleta 13 - Horto Florestal',
    endereco: 'R. do Horto, 931 - Horto Florestal, São Paulo - SP',
    lat: -23.4551, 
    lng: -46.6332 
  },

  { 
    nome: 'Coleta 14 - Tremembé',
    endereco: 'Av. Nova Cantareira - Tremembé, São Paulo - SP',
    lat: -23.4568, 
    lng: -46.5981 
  },

  { 
    nome: 'Coleta 15 - Jaçanã',
    endereco: 'Av. Guapira - Jaçanã, São Paulo - SP',
    lat: -23.4732, 
    lng: -46.5749 
  },

  { 
    nome: 'Coleta 16 - Carandiru',
    endereco: 'R. Dr. Zuquim - Carandiru, São Paulo - SP',
    lat: -23.5085, 
    lng: -46.6235 
  },

  { 
    nome: 'Coleta 17 - Shopping Tucuruvi',
    endereco: 'Av. Dr. Antônio Maria Laet, 566 - Tucuruvi, São Paulo - SP',
    lat: -23.4758, 
    lng: -46.6008 
  },

  { 
    nome: 'Coleta 18 - Shopping Center Norte',
    endereco: 'Travessa Casalbuono, 120 - Vila Guilherme, São Paulo - SP',
    lat: -23.5180, 
    lng: -46.6146 
  }
]

export default function PontosDeColeta() {
  return (
    <>
      <PageTitle>
        PontosDeColeta
      </PageTitle>

      <Section title="Mapa de Pontos de Coleta">
        <div className="mapa-container">
          <MapContainer
            center={[-23.496526128407535, -46.62564323580356]} // Faculdade São Judas
            zoom={15}
            className="mapa"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {pontos.map((p, i) => (
              <Marker key={i} position={[p.lat, p.lng]}>
                <Popup>
                  <div>
                    <strong>{p.nome}</strong><br />
                    <span>{p.endereco}</span><br />
                    <a
                      href={`https://www.google.com/maps?q=${p.lat},${p.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                </Popup>
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
    </>
  )
}

