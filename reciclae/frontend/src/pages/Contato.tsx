//import React from 'react'
import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'
import Skeleton from '../components/loading/Skeleton'
import EmptyState from '../components/empty/EmptyState'

export default function Contato() {
  return (
    <>
      <PageTitle subtitle="Componentes básicos com CSS puro.">Contato</PageTitle>
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
