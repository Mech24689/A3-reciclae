import React from 'react';
import '../../styles/QuadroColetas.css';

interface ColetaData {
  dia: number;
  zona: 'Centro' | 'Zona Sul' | 'Zona Leste' | 'Zona Oeste' | 'Zona Norte' | 'Ausentes';
}

const CORES_ZONAS = {
  'Centro': '#800080',      // Roxo
  'Zona Sul': '#00BFFF',    // Ciano
  'Zona Leste': '#FF4500',  // Laranja
  'Zona Oeste': '#FFFF00',  // Amarelo
  'Zona Norte': '#6B8E23',  // Verde Oliva
  'Ausentes': '#A9A9A9',    // Cinza
};

const COLETAS_DO_MES: ColetaData[] = [
  { dia: 1, zona: 'Zona Sul' }, { dia: 2, zona: 'Zona Leste' }, 
  { dia: 3, zona: 'Zona Oeste' }, { dia: 4, zona: 'Zona Norte' }, 
  { dia: 5, zona: 'Ausentes' }, { dia: 6, zona: 'Ausentes' },
  
  { dia: 7, zona: 'Centro' }, { dia: 8, zona: 'Zona Sul' }, 
  { dia: 9, zona: 'Zona Leste' }, { dia: 10, zona: 'Zona Oeste' }, 
  { dia: 11, zona: 'Zona Norte' }, { dia: 12, zona: 'Ausentes' }, 
  { dia: 13, zona: 'Ausentes' },
  
  { dia: 14, zona: 'Centro' }, { dia: 15, zona: 'Zona Sul' }, 
  { dia: 16, zona: 'Zona Leste' }, { dia: 17, zona: 'Zona Oeste' }, 
  { dia: 18, zona: 'Zona Norte' }, { dia: 19, zona: 'Ausentes' }, 
  { dia: 20, zona: 'Ausentes' },
  
  { dia: 21, zona: 'Centro' }, { dia: 22, zona: 'Zona Sul' }, 
  { dia: 23, zona: 'Zona Leste' }, { dia: 24, zona: 'Zona Oeste' }, 
  { dia: 25, zona: 'Zona Norte' }, { dia: 26, zona: 'Ausentes' }, 
  { dia: 27, zona: 'Ausentes' },
  
  { dia: 28, zona: 'Centro' }, { dia: 29, zona: 'Zona Sul' }, 
  { dia: 30, zona: 'Zona Leste' }, 
];

const QuadroColetas: React.FC = () => {
  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  // Função para buscar a cor do dia nos dados simulados
  const getCorDoDia = (diaDoMes: number) => {
    const coleta = COLETAS_DO_MES.find(c => c.dia === diaDoMes);
    return coleta ? CORES_ZONAS[coleta.zona as keyof typeof CORES_ZONAS] : '#E0E0E0';
  };

  const renderizarDias = () => {
    const dias = [];
    const totalDias = 30;
    
    dias.push(<div key="vazio-1" className="celula-calendario celula-vazia"></div>);
    
    for (let i = 1; i <= totalDias; i++) {
      const corDeFundo = getCorDoDia(i);

      //renderiza dias
      dias.push(
        <div 
          key={i} 
          className="celula-calendario"
          style={{ backgroundColor: corDeFundo, borderColor: '#333' }}
        >
          {i}
        </div>
      );
    }
    
    while (dias.length < 35) {
      dias.push(<div key={`vazio-${dias.length + 1}`} className="celula-calendario celula-vazia"></div>);
    }
    
    return dias;
  };

  return (
   <> <h1 className="titulo">Quadro de coletas</h1>
    <div className="container-coletas">
      <div className="quadro-principal">
        <div className="titulo-coletas"></div>
        
        <div className="quadro-calendario">
          {diasDaSemana.map(dia => (
            <div key={dia} className="celula-cabecalho">
              {dia}
            </div>
          ))}
          {renderizarDias()}
        </div>
      </div>
      
      <div className="legenda">
        {Object.entries(CORES_ZONAS).map(([zona, cor]) => (
          <div key={zona} className="item-legenda">
            <span 
              className="cor-box" 
              style={{ backgroundColor: cor }}
            ></span>
            {zona}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default QuadroColetas;