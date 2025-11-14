import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import QuadroColetas from '../components/data-display/QuadroColetas' 

export default function DiasDeColeta() {
  return (
    <>
      <PageTitle subtitle="Quadro de Coletas da Reciclagem Urbana">Dias de Coleta</PageTitle>
      <Section title="Calendário de Coletas">
        <QuadroColetas /> 
      </Section>
    </>
  )
}