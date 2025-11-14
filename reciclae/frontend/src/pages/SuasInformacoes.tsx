import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'
import '../styles/SuasInformacoes.css'

export default function SuasInformacoes() {
  return (
    <>
      <PageTitle subtitle="Gerencie seus dados pessoais.">
        Suas Informações
      </PageTitle>

      <Section title="Atualize seus dados">
        <DetailView title="Informações Pessoais">
          <div className="info-container">
            <form className="info-form">
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" />
              </div>

              <div className="form-group">
                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <input type="text" id="telefone" name="telefone" />
              </div>

              <button type="submit" className="btn-alterar">
                ALTERAR INFORMAÇÕES
              </button>
            </form>
          </div>
        </DetailView>
      </Section>
    </>
  )
}
