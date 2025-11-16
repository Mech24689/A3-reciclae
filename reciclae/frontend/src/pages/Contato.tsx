import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'
import { FaWhatsapp } from 'react-icons/fa'
import '../styles/Contato.css'


export default function Contato() {
  return (
    <>
      <h1 className="titulo">Contato</h1>
      <div className="contato-wrapper">

        <h2 className="Fale conosco e contribua com um futuro sustentável">Contato</h2>
        
      </div>

      <div className="contato-section">
        <Section title="Entre em Contato com a Reciclaê">
          <DetailView title="Informações de Contato">
            <div className="contato-info">
              <p>
                Para esclarecimentos, sugestões ou informações adicionais sobre nossos serviços,
                nos contate!
              </p>

              <p><strong>E-mail:</strong> reciclae@gmail.com</p>
              <p><strong>WhatsApp:</strong> (11) 95494-9932</p>
              <p><strong>Ouvidoria/SAC:</strong> (11) 2526-4512</p>

              <p>
                Nossa equipe está pronta para atendê-lo com excelência e dedicação.
              </p>

              <p>
                <strong>Contribuindo juntos para um futuro sustentável!</strong>
              </p>
            </div>
          </DetailView>
        </Section>
      </div>

      <a
        href="https://wa.me/5511954949932"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <FaWhatsapp size={32} />
      </a>
    </>
  )
}
