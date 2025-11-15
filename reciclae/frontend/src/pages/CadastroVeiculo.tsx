import PageTitle from '../components/layout/PageTitle'
import Section from '../components/layout/Section'
import DetailView from '../components/data-display/DetailView'
import Skeleton from '../components/loading/Skeleton'
import EmptyState from '../components/empty/EmptyState'
import "../styles/CadastroVeiculo.css"

export default function CadastroVeiculo() {
  return (
    <div>
      <h1 className="titulo">Cadastrar Veículo</h1>

      <div>
        <form className="formulario">
          <div className="campo">
            <label>Placa:</label>
            <input type="text" />
          </div>

          <div className="campo">
            <label>Modelo do Veículo:</label>
            <input type="text" />
          </div>

          <div className="campo">
            <label>Marca:</label>
            <input type="text" />
          </div>

          <div className="campo">
            <label>Categoria:</label>
            <input type="text" />
          </div>

          <div className="campo">
            <label>Ano de Fabricação:</label>
            <input type="number" />
          </div>

          <div className="campo">
            <label>Odômetro:</label>
            <input type="number" />
          </div>

          <button className="btn-cadastrar">CADASTRAR</button>
        </form>
      </div>
    </div>
  );
}
