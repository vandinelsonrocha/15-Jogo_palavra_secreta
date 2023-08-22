import './FimJogo.css';

const FimJogo = ({reiniciar, pontuacao}) => {
  return (
    <div>
        <h1>Fim do jogo</h1>
        <h2>A sua pontuação final foi: <span>{pontuacao}</span></h2>
        <button onClick={reiniciar}>Reiniciar jogo</button>
    </div>
  )
}
export default FimJogo;