import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'

// estilo externo
import '../styles/ponto_coleta.css'

// importa o estilo e os componentes do Leaflet
import 'leaflet/dist/leaflet.css'
import { MapContainer,TileLayer, Popup, CircleMarker } from 'react-leaflet'

// 🔹 PONTOS COM ENDEREÇO E REGIÃO
const pontos = [
  // =======================
  // REGIÃO NORTE
  // =======================
  { 
    nome: 'Ponto Inicial - Faculdade São Judas Santana',
    endereco: 'Av. Braz Leme, 3021 - Santana, São Paulo - SP',
    lat: -23.496526128407535, 
    lng: -46.62564323580356,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 1 - Eco Santa Maria',
    endereco: 'R. Santa Maria, 178 - Santana, São Paulo - SP',
    lat: -23.49133534676037, 
    lng: -46.67278783612072,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 2 - Tucuruvi',
    endereco: 'Av. Tucuruvi, São Paulo - SP',
    lat: -23.475, 
    lng: -46.601,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 4 - Jardim São Paulo',
    endereco: 'Av. Leôncio de Magalhães - Jardim São Paulo, São Paulo - SP',
    lat: -23.4922, 
    lng: -46.6245,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 5 - Parada Inglesa',
    endereco: 'Av. Luís Dumont Villares - Parada Inglesa, São Paulo - SP',
    lat: -23.4829, 
    lng: -46.6133,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 6 - Mandaqui',
    endereco: 'Av. Santa Inês - Mandaqui, São Paulo - SP',
    lat: -23.4675, 
    lng: -46.6418,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 7 - Casa Verde',
    endereco: 'Av. Casa Verde - Casa Verde, São Paulo - SP',
    lat: -23.5036, 
    lng: -46.6530,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 8 - Limão',
    endereco: 'Av. Dep. Emílio Carlos - Limão, São Paulo - SP',
    lat: -23.5089, 
    lng: -46.6681,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 10 - Vila Guilherme',
    endereco: 'Av. Guilherme Cotching - Vila Guilherme, São Paulo - SP',
    lat: -23.5189, 
    lng: -46.6237,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 12 - Vila Medeiros',
    endereco: 'Av. Júlio Buono - Vila Medeiros, São Paulo - SP',
    lat: -23.4901, 
    lng: -46.5718,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 13 - Horto Florestal',
    endereco: 'R. do Horto, 931 - Horto Florestal, São Paulo - SP',
    lat: -23.4551, 
    lng: -46.6332,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 14 - Tremembé',
    endereco: 'Av. Nova Cantareira - Tremembé, São Paulo - SP',
    lat: -23.4568, 
    lng: -46.5981,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 15 - Jaçanã',
    endereco: 'Av. Guapira - Jaçanã, São Paulo - SP',
    lat: -23.4732, 
    lng: -46.5749,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 16 - Carandiru',
    endereco: 'R. Dr. Zuquim - Carandiru, São Paulo - SP',
    lat: -23.5085, 
    lng: -46.6235,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 17 - Shopping Tucuruvi',
    endereco: 'Av. Dr. Antônio Maria Laet, 566 - Tucuruvi, São Paulo - SP',
    lat: -23.4758, 
    lng: -46.6008,
    regiao: 'Norte'
  },
  { 
    nome: 'Coleta 18 - Shopping Center Norte',
    endereco: 'Travessa Casalbuono, 120 - Vila Guilherme, São Paulo - SP',
    lat: -23.5180, 
    lng: -46.6146,
    regiao: 'Norte'
  },


  // REGIÃO SUL
 
  {
    nome: 'Coleta 19 - Parque Ibirapuera',
    endereco: 'Av. Pedro Álvares Cabral, Vila Mariana - São Paulo - SP',
    lat: -23.587416,
    lng: -46.657634,
    regiao: 'Sul'
  },
  {
    nome: 'Coleta 20 - Shopping Interlagos',
    endereco: 'Av. Interlagos, 2255 - Interlagos, São Paulo - SP',
    lat: -23.675358,
    lng: -46.677414,
    regiao: 'Sul'
  },
  {
    nome: 'Coleta 21 - Santo Amaro',
    endereco: 'Rua Dr. Antônio Bento, 785 - Santo Amaro, São Paulo - SP',
    lat: -23.652231,
    lng: -46.715945,
    regiao: 'Sul'
  },
  {
    nome: 'Coleta 22 - Capão Redondo',
    endereco: 'Estr. de Itapecerica, 5859 - Capão Redondo, São Paulo - SP',
    lat: -23.650369,
    lng: -46.775955,
    regiao: 'Sul'
  },
  {
    nome: 'Coleta 23 - Jabaquara',
    endereco: 'Av. Eng. Armando de Arruda Pereira - Jabaquara, São Paulo - SP',
    lat: -23.648723,
    lng: -46.641895,
    regiao: 'Sul'
  },
  {
    nome: 'Coleta 24 - Brooklin',
    endereco: 'Av. Eng. Luís Carlos Berrini, 1500 - Brooklin, São Paulo - SP',
    lat: -23.609935,
    lng: -46.697755,
    regiao: 'Sul'
  },
  {
    nome: 'Coleta 25 - Campo Limpo',
    endereco: 'Av. Carlos Lacerda, 8000 - Campo Limpo, São Paulo - SP',
    lat: -23.633322,
    lng: -46.762919,
    regiao: 'Sul'
  },

  // REGIÃO LESTE
  
  {
    nome: 'Coleta 26 - Shopping Aricanduva',
    endereco: 'Av. Aricanduva, 5555 - São Paulo - SP',
    lat: -23.565930,
    lng: -46.508970,
    regiao: 'Leste'
  },
  {
    nome: 'Coleta 27 - Tatuapé',
    endereco: 'Praça Sílvio Romero - Tatuapé, São Paulo - SP',
    lat: -23.540310,
    lng: -46.571112,
    regiao: 'Leste'
  },
  {
    nome: 'Coleta 28 - Penha',
    endereco: 'Av. Amador Bueno da Veiga, 1500 - Penha, São Paulo - SP',
    lat: -23.521021,
    lng: -46.524511,
    regiao: 'Leste'
  },
  {
    nome: 'Coleta 29 - Itaquera',
    endereco: 'Av. José Pinheiro Borges - Itaquera, São Paulo - SP',
    lat: -23.542220,
    lng: -46.473450,
    regiao: 'Leste'
  },
  {
    nome: 'Coleta 30 - Mooca',
    endereco: 'Av. Paes de Barros, 1500 - Mooca, São Paulo - SP',
    lat: -23.555421,
    lng: -46.602122,
    regiao: 'Centro'
  },
  {
    nome: 'Coleta 31 - Vila Prudente',
    endereco: 'Av. do Estado, 9000 - Vila Prudente, São Paulo - SP',
    lat: -23.584880,
    lng: -46.589111,
    regiao: 'Leste'
  },
  {
    nome: 'Coleta 32 - São Mateus',
    endereco: 'Av. Mateo Bei, 2000 - São Mateus, São Paulo - SP',
    lat: -23.585755,
    lng: -46.462331,
    regiao: 'Leste'
  },

  // =======================
  // REGIÃO OESTE
  // =======================
  { 
    nome: 'Coleta 9 - Anhanguera',
    endereco: 'Av. Raimundo Pereira de Magalhães - Anhanguera, São Paulo - SP',
    lat: -23.4851, 
    lng: -46.7004,
    regiao: 'Oeste'
  },
  { 
    nome: 'Coleta 11 - Eco Ponto Barra Funda',
    endereco: 'Av. Marquês de São Vicente, 121 - Barra Funda, São Paulo - SP',
    lat: -23.522031428524354, 
    lng: -46.64446371137092,
    regiao: 'Centro'
  },
  {
    nome: 'Coleta 33 - Lapa',
    endereco: 'Rua Doze de Outubro, 361 - Lapa, São Paulo - SP',
    lat: -23.525665,
    lng: -46.703922,
    regiao: 'Oeste'
  },
  {
    nome: 'Coleta 34 - Vila Leopoldina',
    endereco: 'Av. Imperatriz Leopoldina, 1500 - São Paulo - SP',
    lat: -23.531411,
    lng: -46.729322,
    regiao: 'Oeste'
  },
  {
    nome: 'Coleta 35 - Pinheiros',
    endereco: 'R. dos Pinheiros, 500 - São Paulo - SP',
    lat: -23.565955,
    lng: -46.685721,
    regiao: 'Oeste'
  },
  {
    nome: 'Coleta 36 - Butantã',
    endereco: 'Av. Vital Brasil, 1500 - Butantã, São Paulo - SP',
    lat: -23.575432,
    lng: -46.711533,
    regiao: 'Oeste'
  },
  {
    nome: 'Coleta 37 - Parque Villa-Lobos',
    endereco: 'Av. Prof. Fonseca Rodrigues, 1025 - Alto de Pinheiros, São Paulo - SP',
    lat: -23.548650,
    lng: -46.718205,
    regiao: 'Oeste'
  },
  {
    nome: 'Coleta 38 - Osasco (limite Oeste)',
    endereco: 'Av. dos Autonomistas, 1500 - Osasco, São Paulo - SP',
    lat: -23.532100,
    lng: -46.781230,
    regiao: 'Oeste'
  },
  {
    nome: 'Coleta 39 - Jaguaré',
    endereco: 'Av. Jaguaré, 1600 - Jaguaré, São Paulo - SP',
    lat: -23.550312,
    lng: -46.752851,
    regiao: 'Oeste'
  },

  // REGIÃO CENTRO

  { 
    nome: 'Coleta 3 - Centro',
    endereco: 'Praça da Sé, São Paulo - SP',
    lat: -23.545, 
    lng: -46.633,
    regiao: 'Centro'
  },
  {
  nome: "Coleta 42 - Liberdade",
  endereco: "Praça da Liberdade - Liberdade, São Paulo - SP",
  lat: -23.558110,
  lng: -46.635590,
  regiao: "Centro"
},
{
  nome: "Coleta 40 - Estação da Luz",
  endereco: "Praça da Luz, 1 - Luz, São Paulo - SP",
  lat: -23.536320,
  lng: -46.633970,
  regiao: "Centro"
},
{
  nome: "Coleta 41 - Praça da República",
  endereco: "Praça da República - República, São Paulo - SP",
  lat: -23.545370,
  lng: -46.643180,
  regiao: "Centro"
}

]

// 🔹 COR POR REGIÃO
function getCorPorRegiao(regiao: string) {
  switch (regiao) {
    case 'Norte':
      return 'green'     // zona norte → Verde
    case 'Sul':
      return 'Blue'       // zona sul - Azul
    case 'Leste':
      return 'orange'      // zona leste → Laranja
    case 'Oeste':
      return 'Yellow'    // oeste → Amarelo
    case 'Centro':
      return 'purple'    // centro → Roxo
    default:
      return 'gray'      // fallback
  }
}

export default function PontosDeColeta() {
  return (
    <>
      <PageTitle>
        Pontos de Coleta
      </PageTitle>

      <Section title="Mapa de Pontos de Coleta">
        <div className="mapa-container">
          <MapContainer
            center={[-23.496526128407535, -46.62564323580356]} // Faculdade São Judas
            zoom={12}
            className="mapa"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {pontos.map((p, i) => (
              <CircleMarker
                key={i}
                center={[p.lat, p.lng]}
                radius={10}
                pathOptions={{
                  color: getCorPorRegiao(p.regiao),
                  fillColor: getCorPorRegiao(p.regiao),
                  fillOpacity: 0.8
                }}
              >
                <Popup>
                  <div>
                    <strong>{p.nome}</strong><br />
                    <span>{p.endereco}</span><br />
                    <small>Região: {p.regiao}</small><br />
                    <a
                      href={`https://www.google.com/maps?q=${p.lat},${p.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </Section>
    </>
  )
}
