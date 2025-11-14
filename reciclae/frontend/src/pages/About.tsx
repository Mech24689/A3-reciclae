//import React from 'react'
import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'
import Skeleton from '../components/loading/Skeleton'
import EmptyState from '../components/empty/EmptyState'
import sobreimage from '../assets/Reciclae_Sobrenos.png'
import "../styles/About.css";

export default function About() {
  return (

<div className="min-h-screen bg-[#d2edc9] flex justify-center items-start py-10">
  <div className="max-w-6xl w-full px-6"> 



<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-start">
{/* Texto */}
<div className="space-y-6 text-justify leading-relaxed text-[1.05rem]">
,<div className= "divH1">
<h1>Sobre Nós</h1>
</div>

<p>
Somos uma startup tecnológica e inovadora dedicada à sustentabilidade e à gestão eficiente de resíduos recicláveis.
Conectamos cidadãos, empresas e prefeituras por meio de mapas interativos, alertas personalizados e logística otimizada
para o descarte correto.
</p>
<br/>
<p>
Inspirados pelo movimento Zero Waste, transformamos consciência ambiental em ação com soluções como desafios sustentáveis,
relatórios de impacto e validação de coletas via QR code, incentivando hábitos responsáveis e engajamento coletivo.
</p>
<br/>

<p>
Com foco em inovação, inclusão e transparência, oferecemos uma plataforma intuitiva e segura. Entre nossos diferenciais estão
a integração entre tecnologia e meio ambiente, rotas otimizadas, monitoramento em tempo real e recompensas.
Junte-se à Reciclaê e ajude a tornar as cidades mais limpas e sustentáveis.
</p>

</div>


{/* Imagem - Placeholder */}
<div className="w-full h-[350px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-700 text-lg font-medium">
  <img src={sobreimage} alt="Sobre Nós" className="w-full h-full object-cover" />
</div>
</div>
</div>
</div>
)
}

