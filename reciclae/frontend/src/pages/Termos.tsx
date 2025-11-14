import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'
import Skeleton from '../components/loading/Skeleton'
import   EmptyState from '../components/empty/EmptyState' 
import logoimage from '../assets/logo.png';
import Button from '../components/actions/Button';  
import "../styles/Termos.css";

export default function TermosUso() {
  return (
<div className="min-h-screen bg-[#d2edc9] flex items-center justify-center p-6">
<div className="bg-[#d2edc9] max-w-3xl w-full grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 items-start">
{/* Ícone */}
<div className="flex justify-center md:justify-start">
<img src={logoimage} alt="" aria-hidden="true" />
</div>


{/* Texto */}
<div>
<h1 className="text-2xl font-bold mb-4">Termos e Condições de Uso do Reciclaê</h1>


<div className='divp1Termos'>
<p>Boas-vindas!</p>
</div>


<p className="mb-4">
Os presentes Termos e Condições de Uso ("Termos") regulamentam o acesso e a
utilização do sistema Reciclaê, abrangendo todo o seu conteúdo, funcionalidades e
serviços disponibilizados pela Reciclaê, seja na condição de visitante ou usuário
registrado.
</p>


<p className="mb-6">
Ao acessar ou utilizar o sistema, você manifesta sua aceitação e concordância em estar
vinculado a estes Termos. Caso não concorde com qualquer disposição aqui contida,
recomendamos que se abstenha de acessar ou utilizar o sistema.
</p>


{/* Botão */}
<div className="divBotao">
<Button className="termos_botao">
DE ACORDO
</Button>
</div>
</div>
</div>
</div>
);
}