import "./TelaInicial.css";

const TelaInicial = ({iniciarJogo}) =>  {
    return (
        <div className="inicio">
            <h1>Palavra secreta</h1>
            <p>Clique no botão abaixo para iniciar o jogo!</p>
            <button onClick={iniciarJogo}>Começar</button>
        </div>
    )
}
export default TelaInicial;